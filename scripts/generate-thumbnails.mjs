import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(root, "assets", "data.js");
const outputDir = path.join(root, "images", "project-thumbnails");
const source = fs.readFileSync(dataPath, "utf8");
const context = { window: {} };

vm.runInNewContext(source, context);
const projects = context.window.PORTFOLIO_PROJECTS;

const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

function wrapTitle(title, maxLength = 18) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  if (lines.length <= 3) return lines;
  return [lines[0], lines[1], `${lines.slice(2).join(" ")}`];
}

function mimeFor(file) {
  const extension = path.extname(file).toLowerCase();
  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  return "image/png";
}

function imageDataUri(relativePath) {
  const absolutePath = path.join(root, relativePath);
  const encoded = fs.readFileSync(absolutePath).toString("base64");
  return `data:${mimeFor(absolutePath)};base64,${encoded}`;
}

function createThumbnail(project, index) {
  const originalSource = project.thumbnailSource
    || (project.thumbnail?.includes("project-thumbnails/") ? project.image : project.thumbnail)
    || project.image;
  const image = imageDataUri(originalSource);
  const title = project.shortTitle || project.title;
  const lines = wrapTitle(title);
  const titleSize = lines.length === 1 ? 74 : lines.length === 2 ? 64 : 54;
  const titleStart = lines.length === 1 ? 300 : lines.length === 2 ? 260 : 220;
  const lineHeight = titleSize * 1.02;
  const titleMarkup = lines.map((line, lineIndex) =>
    `<text x="78" y="${titleStart + (lineIndex * lineHeight)}" class="title">${escapeXml(line)}</text>`
  ).join("\n    ");
  const [metric, metricLabel] = project.stats[0];
  const number = String(index + 1).padStart(2, "0");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(title)} portfolio thumbnail</title>
  <desc id="description">${escapeXml(project.alt)}</desc>
  <style>
    .mono { font-family: "Fragment Mono", "IBM Plex Mono", monospace; font-size: 22px; letter-spacing: 1px; }
    .title { font-family: "Spline Sans", "Helvetica Neue", sans-serif; font-size: ${titleSize}px; font-weight: 600; letter-spacing: -2px; fill: #ecebe4; }
    .metric { font-family: "Fragment Mono", "IBM Plex Mono", monospace; font-size: 58px; fill: #d9ff43; }
    .label { font-family: "Spline Sans", "Helvetica Neue", sans-serif; font-size: 24px; fill: #96998f; }
  </style>
  <rect width="1600" height="900" fill="#0c0d0c"/>
  <rect x="0" y="0" width="12" height="900" fill="#d9ff43"/>
  <line x1="560" y1="60" x2="560" y2="840" stroke="#33362f" stroke-width="2"/>
  <text x="78" y="96" class="mono" fill="#d9ff43">${number} / ${String(projects.length).padStart(2, "0")}</text>
  <text x="78" y="142" class="mono" fill="#96998f">${escapeXml(project.category.toUpperCase())}</text>
  ${titleMarkup}
  <text x="78" y="716" class="metric">${escapeXml(metric)}</text>
  <text x="78" y="760" class="label">${escapeXml(metricLabel)}</text>
  <text x="78" y="830" class="mono" fill="#6f7269">MS / SELECTED WORK</text>
  <rect x="610" y="60" width="930" height="780" fill="#151715" stroke="#33362f" stroke-width="2"/>
  <rect x="632" y="82" width="886" height="736" fill="#10110f"/>
  <image href="${image}" x="652" y="102" width="846" height="696" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
}

fs.mkdirSync(outputDir, { recursive: true });

projects.forEach((project, index) => {
  const sourceImage = project.thumbnailSource
    || (project.thumbnail?.includes("project-thumbnails/") ? project.image : project.thumbnail)
    || project.image;
  project.thumbnailSource = sourceImage;
  project.thumbnail = `images/project-thumbnails/${project.slug}.svg`;
  fs.writeFileSync(
    path.join(outputDir, `${project.slug}.svg`),
    createThumbnail(project, index),
    "utf8"
  );
});

fs.writeFileSync(dataPath, `window.PORTFOLIO_PROJECTS = ${JSON.stringify(projects, null, 2)};\n`, "utf8");
console.log(`Generated ${projects.length} project thumbnails in ${outputDir}`);
