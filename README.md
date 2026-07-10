# Markuss Saule Portfolio (Quarto)

This repository hosts the portfolio at https://msaule.github.io using Quarto and GitHub Pages.

## Pages setup

In GitHub repo settings:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

## Update workflow

1. Edit `.qmd` source files and assets.
2. If the resume changed, compile `resume.tex` and replace `files/resume.pdf`:
   ```powershell
   pdflatex -interaction=nonstopmode -halt-on-error resume.tex
   Copy-Item resume.pdf files/resume.pdf -Force
   ```
3. Render site:
   ```bash
   quarto render
   ```
4. Commit and push:
   ```bash
   git add .
   git commit -m "Build Quarto portfolio"
   git push
   ```
