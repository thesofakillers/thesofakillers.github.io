# Giulio's Personal Website

This repository contains the source code for
[my personal website](https://www.giuliostarace.com).

## Details

The website is generated for the most part utilizing [Hugo](https://gohugo.io/).
Some website sections rely on their own repository, such as the
[CV](https://github.com/thesofakillers/CV) and the
[Knowledge Base](https://github.com/thesofakillers/kb), whose source code can be
found [here](https://github.com/thesofakillers/knowledge-base)

## Deployment

As a static website generator, Hugo generates files HTML/CSS/JS to be served on
the web. These end up in the `public` folder. Deployment is handled by
[GitHub Actions](https://github.com/features/actions), triggered on push to the
`master` branch or manually and configured in
[`.github/workflows/hugo.yml`](.github/workflows/hugo.yml).
