+++ 
draft = true
date = 2019-10-26T23:00:32-03:00
title = "Exploring The 2019 Chilean Protests Numerically"
description = "A quantified look at one of the biggest happenings in Chile since the fall of the regime"
slug = "chile-protests-2019" 
tags = ["project", "data science", "chile protests"]
series = ["test"]
+++

The ongoing [2019 Chilean Protests](https://en.wikipedia.org/wiki/2019_Chilean_protests) will go down in the country's history as perhaps one of the biggest happenings since the fall of the Pinochet regime in 1990. Here, I try to take a more quantitative look at the events.

## Things I want to cover

- Participants (_who_ is saying what?)
- Origins/Spread (_where_ and _how_ did it start?)
  - Social Media
    - Twitter
    - Facebook
    - Instagram
- World relevance (_when_ did the world start catching on?)
- People movement
- Air quality
- Looking ahead, measuring impact

## Important Dates

- **general:** 14/10/19 - ongoing
- **period_1:** 17/10/19 - 26/10/19
- **period_2:** 28/10/19 - ongoing
- **climax**: 18/10/19 - 26/10/19

## Morphology of tweets graph

- [steps](https://noduslabs.com/cases/learn-read-interpret-network-graphs-data-visualization/)
  1. Define graph connectivity
  2. Cluster graphs
  3. Identify gaps
- Characterizing a graph
  - average path length
  - centrality
  - density
- Louvain algorithm

## Origin/Timeline

### Plan

1. Get sample of relevant tweets using twitter search
   - using filter for date range
   - using union of keywords
2. Determine top hashtags from these tweets
3. Perform Hashtag analysis
   - tweets over time
   - retweets over time
   - whether they are trending

### Relevant Hashtags (off the top of my head)

- #EvasionMasivaTodoElDia
- #ParoNacionalYa
- #Cacelorazo
- #EstadoEmergencia
- #toquedequeda
- #ChileDesperto
- #DespiertaChile
- #ChileSeCanso
- #EsoPasaEnChile
- #ChileSomosTodos
- #LaMarchaMasGrandeDeChile

Note, these may lean more to one side. Perhaps one side uses twitter more.

# References

- [1] - [Learning to Read and Interpret Network Graph Data Visualizations](https://noduslabs.com/cases/learn-read-interpret-network-graphs-data-visualization/)
- [2] - [Public Digital Sphere Analysis of Yellow Vests Movement](https://www.alto-analytics.com/en_US/public-digital-sphere-analysis-of-yellow-vest-debate/)
- [3] - [Louvain modularity](https://en.wikipedia.org/wiki/Louvain_modularity)
