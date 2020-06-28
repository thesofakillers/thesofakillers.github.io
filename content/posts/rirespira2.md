+++
title= "Rirespira DevBlog 2 | The Tech Stack"
date= 2019-07-23
draft= true 
slug="rirespira-2-tech-stack"
tags= ["project", "rirespira", "devblog"]
series = ["rirespira"]
+++

So I have somewhat introduced the [concept](https://www.giuliostarace.com/blog/rirespira-devblog-1--the-concept/) behind _Rirespira_, but how will it be implemented from a technological point of view?

_Rirespira_ will be a website. With the [mobile app market dying down](https://techcrunch.com/2017/08/25/majority-of-u-s-consumers-still-download-zero-apps-per-month-says-comscore/), frameworks becoming more and more suitable for mobile web development and internet connectivity becoming increasingly accessible, for me it only makes sense for most projects be web-based.

The nature of a browser-based Rirespira will require a front-end, a back-end and a database before being deployed, like most dynamic websites. In this devblog I will briefly go over the choices I made in preparing the project's tech stack before starting to build.

## The Front-End

I was torn between [ReactJS](https://reactjs.org/) and [VueJS](https://vuejs.org/) and ended up opting for the latter. React attracted me given that it is backed by very large tech companies (so surely it must be good right?) and is in great demand in the jobs market so would probably be worth learning. I ended up choosing VueJS instead though purely because of repeated recommendations by word-of-mouth. Furthermore, Vue is predicted to keep gaining popularity, even in the jobs market, so it's probably almost as worth learning as React. The fact that this particular technology is open-source also helps. Goodbye [JQuery](https://jquery.com/)!

For helping myself with styling, I will rely on [Bootstrap](https://getbootstrap.com/), which I have used before, experimenting with the [BootstrapVue](https://bootstrap-vue.js.org/) combo.

## The Back-End

This was a relatively straight-forward choice. Realistically, the two main contenders were [NodeJS](https://nodejs.org/en/) and [Python](https://www.python.org/). While other programming languages such as [PHP](https://php.net/) and [Java](https://www.java.com/en/download/) are far from obsolete given the large amount of legacy code that needs to be maintained, I do feel like they are losing relevance when it comes to the leading edge of web-development. [Go](https://golang.org/) also briefly fluctuated around the back of my head for a minute, but my relative unfamiliarity with the language ended up convincing me to abandon learning it for some other project.

Between Python and NodeJS I ended up picking the latter. The reasons aren't really that major. Very simply, I already have a decent amount of Python projects and having developed web-projects using [both](https://github.com/thesofakillers/esanta) [languages](https://github.com/thesofakillers/movie-reccomender), I overall felt more at ease using NodeJS.

I plan on using the [ExpressJS](https://expressjs.com/) framework to make things run smoother, having used this tech in the past before as well.

## The Database

I debated between [SQL](https://en.wikipedia.org/wiki/Relational_database) vs [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database options for quite a bit. On the one hand, as mentioned in my previous Rirespira devblog, the task the project is trying to achieve is somewhat complex, with a lot of potential subtleties in capturing the context necessary. I thought, this seems like the sort of unstructured mess that a non-relational database would be more suited for.

I read a bit about [MondoDB](https://www.mongodb.com/), a lot about [ElasticSearch](https://www.elastic.co/) (it was mentioned in a job I had applied to in the past and had caught my interest given its use in Data Science), I even read a bit about [graph databases](https://en.wikipedia.org/wiki/Graph_database) but I was not really getting anywhere.

Then I thought about it a bit more, and tried to draw out the relations...and actually...it seems to work, it seems like I can impose some relational structure to what I'm trying to do, which in my view is probably worth it in the long run, so to avoid disorderly headaches and what not.

As for which RDBMS to use, I settled on [PostegreSQL](https://www.postgresql.org/), very simply because I had used [MySQL](https://www.mysql.com/) in the past and had not enjoyed it, and also because it is open-source which I like to support.

## Deployment

I don't expect the site to have a lot of traffic if at all to start with (or ever, lol), so I was looking for cheap options that I could scale relatively easily, before perhaps moving on to a different service in the case that the project does catch on.

After considering a [variety](https://www.digitalocean.com/) of [options](https://www.bluehost.com/), deciding between cloud platforms, shared hosting, etc., I ended up settling on [Heroku](https://www.heroku.com/), whose [1000 free monthly dyno hours for verified members](https://devcenter.heroku.com/articles/free-dyno-hours) won me over.

As for registering the domain, I opted for [Namecheap](https://www.namecheap.com/) which I utilized for this website as well and have so far had a good experience with.

---

That's more or less it for the tech stack. Now that I have everything more or less planned out I can finally get to work. The next steps look like:

1. Wireframe
2. Back-end + DB
3. Branding
4. Front-end
5. Deployment

Here it goes!
