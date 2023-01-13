+++ 
draft = false
date = 2023-01-13T10:13:55+01:00
title = "git-activity-exporter"
slug = "git-activity-exporter" 
+++

git-activity-exporter is a simple bash script I made to export the commit
activity (and nothing else) from a source git repository to some empty target
repository.

By "git activity", I mean the commits containing only author and date
information. The commit messages are stripped and the commits are applied as
blank commits to the new repository.

The main use case is populating your GitHub contributions graph with commits
from repositories in other hosting services that may contain sensitive
information, inappropriate for mirroring on GitHub.

You can install and try out git-activity-exporter as shown on its
[GitHub page](https://github.com/thesofakillers/git-activity-exporter)
