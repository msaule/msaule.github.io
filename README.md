# Markuss Saule Portfolio

This repository hosts the static portfolio at `https://msaule.github.io/` through GitHub Pages.

## Pages setup

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

## Site structure

- `index.html`, `work.html`, `about.html`, `resume.html`: page sources
- `project.html?slug=...`: reusable project case-study route
- `assets/data.js`: metadata for all projects
- `assets/case-studies.js`: long-form case-study content
- `assets/app.js`: project rendering, filters, navigation, and motion
- `assets/styles.css`: visual system and responsive layout
- `images/`: profile and project evidence
- `files/`: resume and downloadable project artifacts
- `docs/`: deployed GitHub Pages build
- `resume.tex`: source for the one-page resume

## Update workflow

1. Edit the root HTML, JavaScript, CSS, images, files, or `resume.tex`.
2. Preview locally:

   ```powershell
   python -m http.server 4173
   ```

3. Compile `resume.tex` when the resume changes and copy the PDF to `files/resume.pdf`.
4. Synchronize the root site files into `docs/`.
5. Verify desktop and mobile layouts plus local links.
6. Commit and push:

   ```powershell
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```
