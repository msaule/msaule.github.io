import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p, data) => { fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true }); fs.writeFileSync(path.join(root, p), data); };
const ctx = vm.createContext({ window: {} });
for (const file of ['data', 'case-studies', 'case-narratives']) vm.runInContext(read(`assets/${file}.js`), ctx);
const projects = ctx.window.PORTFOLIO_PROJECTS;
const studies = ctx.window.PORTFOLIO_CASE_STUDIES;
const narratives = ctx.window.PORTFOLIO_CASE_NARRATIVES;
const originalApp = read('design-reference/original-app.js');
const gallerySource = originalApp.match(/const projectGalleries = (\{[\s\S]*?\n  \});/)[1];
const galleries = vm.runInNewContext(`(${gallerySource})`);
const esc = s => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const jpegSofMarkers = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
  0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function imageDimensions(src) {
  const file = path.join(root, src);
  try {
    const buffer = fs.readFileSync(file);
    const ext = path.extname(file).toLowerCase();

    if (ext === '.png' && buffer.length >= 24 && buffer.readUInt32BE(0) === 0x89504e47) {
      return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
    }

    if (ext === '.svg') {
      const tag = buffer.toString('utf8').match(/<svg[^>]*>/i)?.[0] || '';
      const viewBox = tag.match(/viewBox="([^"]+)"/i)?.[1]
        ?.trim()
        .split(/[ ,]+/)
        .map(Number);
      if (viewBox?.length === 4 && viewBox[2] > 0 && viewBox[3] > 0) {
        return [viewBox[2], viewBox[3]];
      }
      const width = Number.parseFloat(tag.match(/width="([\d.]+)/i)?.[1]);
      const height = Number.parseFloat(tag.match(/height="([\d.]+)/i)?.[1]);
      return width > 0 && height > 0 ? [width, height] : null;
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      let offset = 2;
      while (offset + 9 < buffer.length) {
        if (buffer[offset] !== 0xff) {
          offset += 1;
          continue;
        }
        const marker = buffer[offset + 1];
        if (marker === 0xd8 || marker === 0xd9) {
          offset += 2;
          continue;
        }
        const segmentLength = buffer.readUInt16BE(offset + 2);
        if (jpegSofMarkers.has(marker)) {
          return [buffer.readUInt16BE(offset + 7), buffer.readUInt16BE(offset + 5)];
        }
        if (segmentLength < 2) break;
        offset += 2 + segmentLength;
      }
    }
  } catch {
    // Missing or unsupported media should not prevent the site from building.
  }
  return null;
}

function evidenceClasses(src) {
  const dimensions = imageDimensions(src);
  if (!dimensions) return { figure: 'evidence-item', media: 'evidence-media evidence-media--standard' };

  const ratio = dimensions[0] / dimensions[1];
  if (ratio < 0.86) {
    return { figure: 'evidence-item', media: 'evidence-media evidence-media--document' };
  }
  if (ratio >= 2.05) {
    return { figure: 'evidence-item evidence-item--wide', media: 'evidence-media evidence-media--panorama' };
  }
  if (ratio >= 1.78) {
    return { figure: 'evidence-item evidence-item--wide', media: 'evidence-media evidence-media--landscape' };
  }
  return { figure: 'evidence-item', media: 'evidence-media evidence-media--standard' };
}
const para = text => `<p>${esc(text)}</p>`;
const order = ['ravel', 'constrained-ai-compiler', 'radiology-value-pipeline', 'roblox-brand-worlds', 'falsifyr', 'msra-ai-values', 'earnings-quality-autopsy', 'wayline', 'owl', 'mercury-market-sim', 'fulfillment', 'insurance-fraud', 'lung-cancer', 'readmission', 'hospital-prices', 'dying-on-the-margin'];
const ordered = order.map(slug => projects.find(p => p.slug === slug)).filter(Boolean);
const get = slug => projects.find(p => p.slug === slug);
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.6"/></svg>';
const logo = '<svg viewBox="0 0 76 48" fill="none" aria-hidden="true"><path d="M6 39V9l14 17L34 9v30M68 9H53a7.5 7.5 0 0 0 0 15h8a7.5 7.5 0 0 1 0 15H46" stroke="currentColor" stroke-width="3.4" stroke-linecap="square" stroke-linejoin="miter"/></svg>';
const prettyTitle = p => p.slug === 'msra-ai-values' ? 'Microsoft AI Values Research' : p.slug === 'roblox-brand-worlds' ? 'Worlds worth getting lost in.' : p.shortTitle;
const themes = { ravel:'ravel', 'constrained-ai-compiler':'compiler', falsifyr:'falsifyr', 'radiology-value-pipeline':'radiology', 'roblox-brand-worlds':'roblox', 'msra-ai-values':'values', 'earnings-quality-autopsy':'earnings', owl:'owl', 'mercury-market-sim':'mercury', wayline:'wayline' };
const covers = { 'radiology-value-pipeline': 'images/projects/radiology-value-pipeline/cover.png', ravel: 'images/projects/ravel/pkgdown-home.png', wayline: 'images/projects/wayline/vegas-greensboro-250-desktop.png', 'constrained-ai-compiler': 'images/projects/constrained-ai-compiler/cover.svg' };
function localUrl(href, base) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const legacy = href.match(/^(?:\.\.\/)?projects\/([^/?]+)\.html$/);
  if (legacy && get(legacy[1])) return `${base}projects/${legacy[1]}.html`;
  return base + href.replace(/^\.\.\//, '');
}
function art(p, base = '', hero = false) {
  const src = hero ? (covers[p.slug] || p.image) : (p.thumbnail || covers[p.slug] || p.image);
  if (!hero && p.slug === 'ravel') return `<div class="project-art art-ravel"><span class="art-word">ravel<span class="art-star">*</span></span><svg viewBox="0 0 700 220" class="ravel-lines" fill="none" aria-hidden="true">${Array.from({length: 9}, (_,i) => `<path d="M-40 ${30+i*18}C150 ${-120+i*24} 360 ${380-i*18} 740 ${40+i*18}" stroke="currentColor" stroke-width="${i%3===0?3:1}"/>`).join('')}</svg><div class="art-foot"><span>AI, inside your analysis.</span><span>RStudio / CRAN</span></div></div>`;
  if (!hero && p.slug === 'falsifyr') return `<div class="project-art art-falsifyr"><div class="art-foot"><span>Statistical stress testing</span><span>R / CRAN</span></div><div class="falsify-type">How sure<br>is <span>sure?</span></div><div class="fracture" aria-hidden="true">${Array.from({length:28},(_,i)=>`<i style="--i:${i};--h:${25+Math.abs(Math.sin(i*1.7))*70}%"></i>`).join('')}</div></div>`;
  if (!hero && p.slug === 'msra-ai-values') return `<div class="project-art art-values"><div class="art-foot"><span>Microsoft Research Asia</span><span>AI & human values</span></div><div class="values-ten">10<span>/10</span></div><p>Advanced Acceptance selections</p><svg class="values-grid" viewBox="0 0 350 80" aria-hidden="true">${Array.from({length:10},(_,i)=>`<circle cx="${15+i*35}" cy="40" r="12" fill="none" stroke="currentColor"/><path d="m${9+i*35} 40 4 4 8-9" fill="none" stroke="currentColor"/>`).join('')}</svg></div>`;
  return `<div class="project-art art-${themes[p.slug] || 'default'} ${hero ? 'art-detail' : ''}"><img src="${base}${esc(src)}" alt="${esc(p.alt)}" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">${!hero ? `<span class="art-category">${esc(p.category)}</span>` : ''}</div>`;
}
function nav(active, base) {
  return `<header class="site-header"><a class="identity" href="${base}index.html" aria-label="Markuss Saule, home">${logo}<span>Markuss Saule</span></a><nav id="navigation" aria-label="Main navigation">${[['index.html','Home'],['work.html','Work'],['about.html','About'],['resume.html','Resume']].map(([url,label])=>`<a href="${base}${url}" ${active===label?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="header-contact" href="mailto:markusstomas@gmail.com">Let's talk ${arrow}</a><button class="menu-toggle" aria-controls="navigation" aria-expanded="false">Menu <span>+</span></button></header>`;
}
function footer(base) {
  return `<footer class="site-footer"><div class="footer-top"><p>Good work starts<br>with a conversation.</p><a class="footer-action" href="mailto:markusstomas@gmail.com">Let's talk.${arrow}</a></div><div class="footer-meta"><a href="${base}index.html" class="footer-signature">Markuss Saule</a><span>Idaho, United States<br>Graduating April 2027</span><div><a href="https://github.com/msaule" target="_blank" rel="noopener">GitHub ${arrow}</a><a href="https://www.linkedin.com/in/markuss-saule/" target="_blank" rel="noopener">LinkedIn ${arrow}</a><a href="${base}files/resume.pdf" target="_blank" rel="noopener">Resume ${arrow}</a></div><a href="#top" class="back-top">Back to top &uarr;</a></div></footer>`;
}
function page(title, content, active='Work', base='', cls='') {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(title)}. Markuss Saule: data, AI, statistics, and the things I build."><meta name="robots" content="index, follow"><meta name="theme-color" content="#ecebe5"><title>${esc(title)} | Markuss Saule</title><link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml"><link rel="sitemap" type="application/xml" href="${base}sitemap.xml"><link rel="preload" href="${base}assets/fonts/SpaceGrotesk.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="${base}assets/atelier.css"><link rel="stylesheet" href="${base}assets/layout.css"><script defer src="${base}assets/atelier.js"></script></head><body class="${cls}" id="top"><a href="#main" class="skip-link">Skip to content</a>${nav(active,base)}<main id="main">${content}</main>${footer(base)}<dialog class="image-dialog" aria-label="Expanded project image"><button class="close-dialog" aria-label="Close image">Close &times;</button><img alt=""><p></p></dialog></body></html>`;
}
function card(p, i, base='') {
  return `<article class="work-card" data-category="${esc(p.category)}" data-search="${esc([p.shortTitle,p.category,p.summary,...p.tools].join(' ').toLowerCase())}"><a href="${base}projects/${p.slug}.html" class="work-card-link" aria-label="Read ${esc(prettyTitle(p))}">${art(p,base)}<div class="card-meta"><span>${String(i+1).padStart(2,'0')} / ${esc(p.category)}</span><span>${esc(p.year)}</span></div><div class="card-heading"><h3>${esc(prettyTitle(p))}</h3><span class="card-arrow">${arrow}</span></div><p>${esc(p.summary)}</p></a></article>`;
}

const home = `<section class="home-hero"><div class="hero-kicker"><span>Data & AI / Independent portfolio</span><span>2026</span></div><div class="hero-composition"><div class="hero-heading"><h1>Curiosity,<br><span>engineered.</span></h1><p>I build AI tools, statistical software, and analytics systems. Currently at Volvo; publishing open-source tools used by thousands.</p><div class="hero-actions"><a class="text-link" href="#selected">Explore the work <span>&darr;</span></a><a class="text-link" href="files/resume.pdf">Read my resume ${arrow}</a></div></div><figure class="sculpture"><canvas id="sculpture" aria-label="A slowly rotating geometric sculpture made of folded triangular panels"></canvas><figcaption><span>A little order in the complexity.</span><button id="pause-art" type="button" aria-pressed="false">Pause motion</button></figcaption></figure></div><div class="hero-bottom"><a href="about.html" class="mini-profile"><img src="images/markuss-headshot.jpg" alt="Markuss Saule" width="90" height="110"><span><strong>Markuss Saule</strong><span>Business Analytics<br>Statistics & Data Science</span></span>${arrow}</a><p>Python, R, SQL &amp; Power BI.<br>Statistics, software, and product analytics.</p><a class="hero-note" href="resume.html">Full-time from<br><strong>April 2027 ${arrow}</strong></a></div></section>
<section class="proof-band" aria-label="A few things I have built"><div><strong>2K+</strong><span>Ravel users<br>AI copilot on CRAN</span></div><div><strong>1.5M+</strong><span>monthly web users<br>Volvo CJA migration</span></div><div><strong>10</strong><span>Advanced Acceptance selections<br>Microsoft AI Values Challenge</span></div><div><strong>7.5B+</strong><span>plays across shipped<br>Roblox experiences</span></div></section>
<section class="selected-section section-space" id="selected"><div class="section-heading"><span class="section-number">01 / Selected work</span><h2>Selected <span>work.</span></h2><a class="text-link" href="work.html">All ${ordered.length} projects ${arrow}</a></div><div class="selected-grid">${['ravel','constrained-ai-compiler','radiology-value-pipeline','falsifyr'].map((s,i)=>card(get(s),i)).join('')}</div></section>
<section class="world-feature"><div class="world-image"><img src="images/projects/roblox-brand-worlds/cover.jpg" alt="Justice Hall environment for the Black Adam Roblox event" loading="lazy"></div><div class="world-content"><span class="section-number">02 / A different kind of system</span><h2>Before the models,<br>there were <em>worlds.</em></h2><div class="world-bottom"><strong>7.5B<span>+ plays</span></strong><div><p>Ten years of world design, player flow, and live experiences. Warner Music, DC, Bakugan, L'Oreal, and Sony. Personally commended by Roblox CEO David Baszucki.</p><a href="projects/roblox-brand-worlds.html" class="text-link">Step inside ${arrow}</a></div></div></div></section>
<section class="section-space research-section"><div class="section-heading"><span class="section-number">03 / Beyond the build</span><h2>Research &amp; <span>contributions.</span></h2></div><div class="research-grid"><a href="projects/msra-ai-values.html" class="research-main">${art(get('msra-ai-values'))}<div class="card-heading"><h3>Microsoft AI Values Research</h3>${arrow}</div><p>Ten Advanced Acceptance selections exploring difficult questions in bioethics, consent, and human judgment.</p></a><div class="upstream"><p class="section-number">Open-source engineering</p><h3>A contribution<br>at the source.</h3><p>Correctness, testing, and developer experience in the tools that other people build on.</p>${['scikit-learn','TransformerLens','MONAI Label','Posit Air'].map((s,i)=>`<a href="contributions.html#contribution-${i+1}"><span>${s}</span>${arrow}</a>`).join('')}</div></div></section>
<section class="about-teaser section-space"><div class="about-teaser-photo"><img src="images/markuss-headshot.jpg" alt="Portrait of Markuss Saule" loading="lazy"></div><div><span class="section-number">04 / The person behind it</span><h2>I care where<br>the work goes.</h2><p>Health challenges in my family made healthcare personal. Building on Roblox taught me how people move through a system. At Volvo, I work with the scale and constraints of a global business.</p><p>Those experiences shape what I choose to build, and how carefully I build it.</p><a class="text-link" href="about.html">A little more about me ${arrow}</a></div></section>`;
write('index.html',page('Curiosity, engineered',home,'Home','','home'));

const filters=['All',...new Set(ordered.map(p=>p.category))];
const work=`<header class="page-intro"><div class="intro-top"><span>Projects / ${ordered.length} studies</span><span>2025 &mdash; 2026</span></div><h1>A body of <span>work.</span></h1><div class="intro-bottom"><p>Tools people use. Systems I wanted to understand.<br>A few questions that wouldn't leave me alone.</p><a class="text-link" href="contributions.html">Open-source contributions ${arrow}</a></div></header><section class="work-collection"><div class="work-toolbar"><label class="mobile-category" for="category-select">Category<select id="category-select">${filters.map(f=>`<option value="${esc(f)}">${esc(f)}</option>`).join('')}</select></label><div class="filters" role="group" aria-label="Filter projects">${filters.map(f=>`<button type="button" data-filter="${esc(f)}" aria-pressed="${f==='All'}">${esc(f)}</button>`).join('')}</div><div class="search-row"><label for="project-search">Find a project</label><input id="project-search" type="search" placeholder="Search projects or tools" autocomplete="off"><span id="work-count" role="status" aria-live="polite">${ordered.length} projects</span></div></div><div class="work-grid">${ordered.map((p,i)=>card(p,i)).join('')}</div><p class="empty-state" hidden>No projects match that search. <button type="button" id="reset-filters">Show all projects</button></p></section>`;
write('work.html',page('Work',work,'Work','','work-page'));
write('projects.html',page('Projects',work,'Work','','work-page'));

const jobs=[
 ['May 2026 - present','Volvo Group','Business Intelligence & Analytics Intern','Leading Adobe CJA migration for 1.5M+ monthly web users. Building statistical demand monitoring and the executive case for a $100K annual martech run-rate reduction. Extended through December 2026.'],
 ['Oct 2024 - May 2026','BYU-Idaho','Data & Campaign Analytics Coordinator','A $4K recruiting campaign produced 2,250 qualified applicants. Built engagement dashboards and an AI-assisted screening workflow for 1,000+ global applicants.'],
 ['Jun - Sep 2025','Fresno State Hockey','Digital Data & Insights Coordinator','Ranked 350+ sponsor prospects, surfaced $370K in sponsorship value, and cut weekly reporting time by 70%.'],
 ['Aug 2023 - Jul 2024','American Councils','City Lead & Project Manager','Tracked participation and outreach for 550+ prospective exchange applicants. Led six workshops and reporting for three cross-border programs.'],
 ['2020 - 2024','Roblox brand worlds','World, level & game design','Built worlds, vehicles, progression spaces, and branded live experiences across shipped games with 7.5B+ plays.'],
 ['Jun - Oct 2021','Ministry of Health of Latvia','Marketing & Analytics Intern','Analyzed vaccination trends and coordinated insights across three departments for public-health outreach reaching 175,000 people.']
];
const timeline=()=>jobs.map(([date,name,role,desc])=>`<article class="experience-row"><span>${date}</span><div><h3>${name}</h3><p class="role">${esc(role)}</p></div><p>${desc}</p></article>`).join('');
const about=`<header class="page-intro"><div class="intro-top"><span>About Markuss</span><span>Latvian roots. A wider view.</span></div><h1>A mind for the <span>complex.</span></h1></header><section class="biography"><figure><img src="images/markuss-headshot.jpg" alt="Markuss Saule" fetchpriority="high"><figcaption>Markuss Saule / Idaho, United States</figcaption></figure><div class="bio-copy"><h2>I like figuring out<br>how things work.</h2><p>I've spent ten years building on Roblox, worked on public-health campaigns in Latvia, published statistical tools on CRAN, and built analytics systems at Volvo. Different settings, but I keep asking the same questions: what's happening, why, and what can we do about it?</p><p>I'm studying Business Analytics at BYU-Idaho, with minors in Statistics and Data Science and a 4.0 GPA. I graduate in April 2027.</p><h3>Why healthcare keeps showing up.</h3><p>Health challenges in my family changed what useful work means to me. Healthcare is a place where delays, bad handoffs, and incomplete information can become personal very quickly.</p><p>That's why I keep returning to radiology, patient access, and hospital operations. I want to build tools that help people see problems earlier and make decisions with better information.</p><p>I bring the same care to manufacturing, markets, and digital products. I want to understand the whole system, including the person using it.</p><a href="mailto:markusstomas@gmail.com" class="text-link">Get in touch ${arrow}</a></div></section><section class="experience-section section-space"><div class="section-heading"><span class="section-number">Experience</span><h2>Where I've<br><span>put it to work.</span></h2><a class="text-link" href="files/resume.pdf">Download resume ${arrow}</a></div>${timeline()}</section><section class="capabilities section-space"><div class="section-heading"><span class="section-number">Tools & practice</span><h2>What I work with.</h2></div><div class="capability-grid">${[['Applied ML','Python, scikit-learn, XGBoost, SHAP, feature engineering, model evaluation.'],['Statistics','R, regression, hypothesis testing, robust estimation, package development.'],['Data systems','SQL, PostgreSQL, ETL, normalized schemas, APIs, reproducible pipelines.'],['Product & AI','FastAPI, Node.js, RStudio, MCP, instrumentation, human review, agent workflows.'],['Operations','Simulation, SimPy, capacity planning, forecasting, scenario analysis.'],['Measurement','Power BI, DAX, Power Query, Adobe CJA, Excel modeling, executive reporting.']].map(([title,copy],i)=>`<article><span>0${i+1}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></section>`;
write('about.html',page('About',about,'About','','about-page'));
const resume=`<header class="page-intro"><div class="intro-top"><span>Experience & education</span><span>Available from April 2027</span></div><h1>The <span>resume.</span></h1><div class="intro-bottom"><p>Business intelligence engineering.<br>Product analytics. Applied data science.</p><a class="solid-link" href="files/resume.pdf" download="Markuss-Saule-Resume.pdf">Download PDF ${arrow}</a></div></header><section class="resume-viewer"><div class="resume-viewer-bar"><span>Markuss Saule / Resume</span><a href="files/resume.pdf" target="_blank" rel="noopener">Open in a new tab ${arrow}</a></div><object data="files/resume.pdf#view=FitH" type="application/pdf" aria-label="Markuss Saule resume"><p>Your browser cannot show the PDF here. <a href="files/resume.pdf">Open the resume.</a></p></object><a class="mobile-pdf solid-link" href="files/resume.pdf" target="_blank" rel="noopener">Read the resume ${arrow}</a></section><section class="experience-section section-space"><div class="section-heading"><span class="section-number">At a glance</span><h2>Experience.</h2></div>${timeline()}</section>`;
write('resume.html',page('Resume',resume,'Resume','','resume-page'));

for(const [idx,p] of ordered.entries()) {
 const base='../'; const s=studies[p.slug]||{}; const n=narratives[p.slug]||[];
 const resources=(s.links||[]).filter(([label,href])=>href);
 const gallery=(galleries[p.slug]||[[p.image,p.alt]]).filter(([src])=>fs.existsSync(path.join(root,src)));
 const next=ordered[(idx+1)%ordered.length];
 const evidence=gallery.map(([src,caption],i)=>{
  const media=evidenceClasses(src);
  return `<figure class="${media.figure}"><button class="image-open" data-image="${base}${esc(src)}" data-caption="${esc(caption)}" aria-label="Expand ${esc(caption)}"><div class="${media.media}"><img src="${base}${esc(src)}" alt="${esc(caption)}" loading="lazy"></div><span class="image-expand">View image ${arrow}</span></button><figcaption><span>${String(i+1).padStart(2,'0')}</span>${esc(caption)}</figcaption></figure>`;
 }).join('');
 const content=`<header class="case-intro"><a class="case-back" href="../work.html">&larr; All work</a><div class="intro-top"><span>${esc(p.category)}</span><span>${esc(p.year)} / ${String(idx+1).padStart(2,'0')}</span></div><h1>${esc(prettyTitle(p))}</h1><div class="case-deck"><p>${esc(p.summary)}</p><div class="case-tools">${p.tools.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>${resources.length?`<a class="text-link" href="#resources">Source & deliverables ${arrow}</a>`:''}</header><figure class="case-cover"><button class="image-open" data-image="${base}${esc(covers[p.slug]||p.image)}" data-caption="${esc(p.alt)}" aria-label="Expand project cover">${art(p,base,true)}<span class="image-expand">View image ${arrow}</span></button></figure><section class="case-numbers" aria-label="Project figures">${p.stats.map(([v,l])=>`<div><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('')}</section><div class="reading-layout"><aside class="reading-nav"><span>Inside this project</span><a href="#overview">Overview</a><a href="#build">What I built</a>${n.length?'<a href="#story">The details</a>':''}<a href="#decisions">Design decisions</a><a href="#evidence">Working outputs</a>${resources.length?'<a href="#resources">Source & deliverables</a>':''}</aside><div class="reading-body"><section id="overview"><span class="section-number">01 / Context</span><h2>The question<br>behind the work.</h2>${para(s.problem||p.summary)}<h3>My role</h3>${para(s.role||p.detail)}</section><section id="build"><span class="section-number">02 / Implementation</span><h2>What I built.</h2>${para(p.detail)}<ul>${(s.build||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul></section>${n.length?`<section id="story"><span class="section-number">03 / In detail</span>${n.map((part,i)=>`<article class="narrative"><h2>${esc(part.title)}</h2>${(part.paragraphs||[]).map(para).join('')}</article>`).join('')}</section>`:''}<section id="decisions"><span class="section-number">04 / Engineering judgment</span><h2>The decisions<br>that shaped it.</h2><ol>${(s.decisions||[]).map(d=>`<li>${esc(d)}</li>`).join('')}</ol>${s.validation?`<h3>Evaluation & results</h3>${para(s.validation)}`:''}</section></div></div><section id="evidence" class="case-evidence section-space"><div class="section-heading"><span class="section-number">05 / Working outputs</span><h2>See it for yourself.</h2><p>Select an image to view it at full size.</p></div><div class="evidence-gallery">${evidence}</div></section>${resources.length?`<section id="resources" class="resources section-space"><div class="section-heading"><span class="section-number">06 / Artifacts</span><h2>Take a closer look.</h2></div>${resources.map(([label,href],i)=>`<a href="${esc(localUrl(href,base))}" target="_blank" rel="noopener"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(label)}</strong>${arrow}</a>`).join('')}</section>`:''}<a class="next-project" href="${next.slug}.html"><span>Next project</span><strong>${esc(prettyTitle(next))}</strong>${arrow}</a>`;
 write(`projects/${p.slug}.html`,page(prettyTitle(p),content,'Work',base,`case-page theme-${themes[p.slug]||'default'}`));
}

const contribSource=read('design-reference/original-contributions.html');
const contributionRows=contribSource.match(/<article class="contribution-row[\s\S]*?<\/article>/g)||[];
const contrib=`<header class="page-intro"><div class="intro-top"><span>Open-source engineering</span><span>Four ecosystems</span></div><h1>Better,<br><span>together.</span></h1><div class="intro-bottom"><p>Contributing to the tools other people depend on.<br>Small, specific changes with a longer reach.</p><a class="text-link" href="https://github.com/msaule" target="_blank" rel="noopener">My GitHub ${arrow}</a></div></header><section class="contributions-intro"><p>My upstream work covers scorer compatibility in scikit-learn, migration warnings in TransformerLens, model-label conformance in MONAI Label, and formatter behavior in Posit Air. Here are the problems, changes, and tests.</p><div class="contribution-overview"><div><strong>4</strong><span>ecosystems</span></div><div><strong>3</strong><span>code contributions</span></div><div><strong>1</strong><span>conformance design</span></div></div></section><section class="contribution-ledger">${contributionRows.map((row,i)=>row.replace('<article ',`<article id="contribution-${i+1}" `)).join('')}</section>`;
write('contributions.html',page('Open-source contributions',contrib,'Work','','contributions-page'));
write('project.html',page('Project',`<section class="page-intro"><h1>Find the <span>work.</span></h1><p id="legacy-status">Opening your project...</p><a class="text-link" href="work.html">Browse all projects ${arrow}</a></section><script>const slug=new URLSearchParams(location.search).get('slug');const known=${JSON.stringify(order)};if(known.includes(slug))location.replace('projects/'+slug+'.html');else document.getElementById('legacy-status').textContent='That project could not be found. Browse the collection below.';</script>`,'Work'));
write('404.html',page('Page not found','<section class="page-intro"><h1>A wrong<br><span>turn.</span></h1><p>That page is missing. The work is still here.</p><a class="solid-link" href="work.html">Find a project &rarr;</a></section>'));
console.log(`Built ${ordered.length} complete project pages and 8 site pages in ${root}`);
