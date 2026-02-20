# Markuss Saule Portfolio (Quarto)

This repository hosts the portfolio at https://msaule.github.io using Quarto and GitHub Pages.

## Pages setup

In GitHub repo settings:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

## Update workflow

1. Edit `.qmd` source files and assets.
2. Render site:
   ```bash
   quarto render
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Build Quarto portfolio"
   git push
   ```