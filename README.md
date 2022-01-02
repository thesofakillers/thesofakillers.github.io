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
the web. These end up in the `public` folder. We actually treat this folder as a
git submodule, corresponding to my
[`<USERNAME>.github.io` repository](https://github.com/thesofakillers/thesofakillers.github.io).
This is to make use of [GitHub pages](https://pages.github.com/) for hosting the
static files. The same notion is used for hosting the CV and Knowledge Base
sections of the website.

To deploy, simply run

```
sh deploy.sh
```

In the terminal.
