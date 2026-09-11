# Markuss Saule portfolio

Live: https://msaule.github.io

GitHub Pages publishes from main, repository root. The current site is built
with Node.js, without dependencies. Quarto sources and docs remain as legacy material.

## Editing

- Content: assets/data.js, assets/case-studies.js, assets/case-narratives.js
- Page templates: scripts/build.mjs
- Style: assets/atelier.css and assets/layout.css
- Interactions: assets/atelier.js
- Resume: files/resume.pdf
- Preserved build inputs: design-reference (required for galleries/contributions)

## Render, review, publish

```powershell
node scripts/build.mjs
node scripts/preview.mjs
# Review http://127.0.0.1:4187/ then stop the preview.
git add .
git commit -m "Update portfolio"
git push origin main
```

The Quarto post-render hook rebuilds the custom homepage; it does not redirect to docs.
