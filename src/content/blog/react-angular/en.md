---
title: "React or Angular: are the giants' frameworks really reliable?"
slug: "react-vs-angular"
date: "2025-09-15"
author: "Julien Faure"
category: "Application development"
tags: ["JavaScript", "Front-end", "Programming"]
excerpt: "Two front-end heavyweights, two philosophies. Which to choose for your context?"
image: "/assets/images/blog/react-vs-angular.webp"
imageAlt: "Meritis illustration comparing React and Angular"
description: "React vs Angular: philosophies, strengths and selection criteria for a front-end project."
---

**When choosing a technology for a web project, framework stability and long-term viability are essential criteria. With React and Angular, it is tempting to assume a certain reliability. But in a context of restructurings, layoffs and sometimes diverging interests between companies and developers, can we really consider frameworks backed by tech giants to be safe long-term choices?**

![Angular and React: should we trust frameworks backed by tech giants?](/assets/images/blog/react-vs-angular/inline-1.webp)

Imagine that at the start of 2025 you need to launch a web project. It may be for your client or a personal project, but in any case it is a project you want to invest in over time.

Very quickly, you will ask yourself which front-end library to choose. And with the explosion in the number of available libraries and frameworks, each with different approaches, the JavaScript ecosystem has never seemed so confusing and hard to read at first glance.

As a result, you will probably lean towards React or Angular, solutions already widely adopted by many companies and backed by major tech groups: Meta on one side, Google on the other. That support is surely a sign of seriousness and stability, leading to a safe and informed choice, right?

Well, things are not that simple. In recent years, major American tech companies have gone through their share of upheaval: redefined priorities in the post-Covid context, waves of layoffs, governance changes and more. Without overstating their importance, it would be wrong to say these events have had no impact on our ecosystem.

In this article, I suggest we examine the situation of two of the three most popular front-end libraries and, at the same time, broaden the discussion to factors that I believe we do not take sufficiently into account when choosing a technology for a project.

### Angular, Google's Preserve

Let us begin with the flagship framework developed by Google's teams. Like React, Angular is an open-source project, meaning any developer could potentially contribute to the project and propose new features. But the team responsible for maintaining the project, including most major new features and the validation of pull requests from third-party contributors, remains essentially internal to Google and its parent company, Alphabet.

Angular went through a somewhat delicate period in the early 2020s. The framework's apparent complexity seemed to be a disadvantage compared with competing libraries such as Vue and React. More importantly, Angular also seemed to lag behind the evolution of front-end development practices, especially on several important features that competitors already had:

-   SSR support (server-side rendering);
-   Reactivity management;
-   Not to mention the strong coupling with a module-based architecture, which could be seen as far too restrictive for some projects.

**Then, from 2023 onwards, confidence returned as this delay was gradually closed:**

-   Progressive arrival of standalone component support from Angular 15;
-   SSR support from Angular 17;
-   Progressive rollout of signals for reactivity management from Angular 16.

All these efforts paid off in regaining the community's trust, including mine, and that is good news. But questions can still be asked about the framework's development roadmap, which is first and foremost developed to meet Google's needs, since Google uses it across a very large majority of its tools.

Google has also experienced waves of layoffs in recent years: 12,000 people in January 2023 and more than a thousand over the course of 2024.

**Do you want to avoid depending on heavy frameworks for your backends?**

Watch the replay of our meetup "Meritis x Programmez: Frameworkless in Java"

![Replay recording of the Programmez Frameworkless in Java meetup](/assets/images/blog/react-vs-angular/inline-2.webp)

#### The Flutter Case

Although only one developer from the Angular team was affected by these layoffs in 2023, we can look at another open-source product maintained internally by Google: Flutter, a cross-platform application development framework, notably for mobile. While Flutter was becoming increasingly popular, the 2024 layoffs had a fairly heavy impact on the team, leading several key project contributors to leave, in a context where the community was fairly satisfied with the project as it stood but regretted the limited regularity of updates.

![Flutter layoffs](/assets/images/blog/react-vs-angular/inline-3.webp)

This led developer collectives to create a fork of the project, Flock, to compensate for the lack of continued investment from Google in Flutter.

So could the same thing happen to Angular?

At the start of 2025, the Mountain View firm also announced a voluntary departure plan offered to more than 25,000 employees. We should know during March the exact number who accepted these conditions, and whether additional layoffs are planned.

Angular's much greater criticality for Google compared with Flutter should be weighed in the balance. Still, in the end, the Angular team is not immune to sudden departures and/or restructurings, as other Google teams have been. We cannot doubt the good faith of the people working on the project, who are often very involved with developer communities, but the decision does not belong to them.

**Need a complete full-stack developer toolkit?**

Download the "Full Stack Developer Toolkit", created by full-stack developers themselves.

![Full-stack developer toolkit](/assets/images/blog/react-vs-angular/inline-4.webp)

### React: Questionable Governance?

React's recent history is slightly different. Let us acknowledge this merit from the outset: the team, or "Core Team", that maintains the project is much more transparent about its composition, and for several years it has no longer been made up solely of Meta engineers.

**Today, it consists of:**

-   14 Meta engineers;
-   5 Vercel engineers;
-   And 2 independent engineers.

#### Focus On Vercel

Let us return to Vercel's role, since you may not know the company. Founded in 2015, Vercel offers simplified hosting and deployment services for all types of applications, with a strong focus on serverless offerings, relying behind the scenes on AWS and Cloudflare infrastructure. It is therefore a competitor to services such as Heroku or Netlify.

Vercel has also maintained the Next.js framework since its creation. Next.js adds to React, on which it is entirely based, a highly appreciated SSR layer and all the features that come with it, notably SEO, which is still difficult to manage with modern front-end frameworks.

Next.js became very popular after being adopted by several major groups, including the Washington Post in the United States. And let us be clear: it is also an important communication vector for Vercel, which does not hesitate to claim parentage of the project on its site, even though it is open source.

That would not be a problem if Next.js met the use cases of most of the community. But there is a catch: deploying a Next.js application, especially serverless, is designed to be greatly simplified on Vercel and can require much more effort on other platforms.

Several Vercel engineers have been long-standing React contributors and have continuous exchanges with the Core Team. But things accelerated in early 2021 when Vercel hired Sebastian Markbage, a member of the React Core Team at Meta.

The issues raised by this proximity became apparent at the Next.js 2023 conference, where Vercel announced a new routing feature for its framework, the App Router. This feature relied on a new capability just integrated into React, to the community's surprise because it was not seen as a priority: React Server Components dedicated to server-side rendering.

Concerns quickly emerged about the risk that the React Core Team, now partly composed of Vercel developers, would favour Next.js over other React server-side rendering (SSR) frameworks and, more broadly, steer React towards that use case at the expense of its main use in Single Page Applications (SPAs). This is reflected, for example, in the many exchanges in discussion spaces dedicated to the library.

![Next.js and Vercel: conflict of interest?](/assets/images/blog/react-vs-angular/inline-5.webp)

#### Where Do Things Stand Today?

I thought I would stop there on the subject of Vercel, but while writing this article I came across other surprising information:

1.  The first received fairly little media coverage: in 2024, more than half of the commits (code changes) made to the React codebase came from the Vercel team.
2.  The second is the announcement on the team's blog, on 14 February 2025, that the basic React application creation module, create-react-app, was being abandoned. This removal was expected because another build tool had become increasingly popular in recent years: Vite.

Vite is a tool that has considerably improved development performance, especially locally. It is agnostic and can be used with most front-end libraries. Its adoption has exploded over the past two years. It was created by Evan You, an independent developer also behind Vue.js, a "competitor" to React. Yet in its article, the React team does not recommend migrating to Vite, which would cover 90% of needs and be quick to implement, but rather towards framework-type solutions, such as... Next.js.

Ultimately, React's direction seems increasingly oriented towards SSR, coupled with Vercel's efforts, and it revisits some of its original philosophical choices, notably the choice to remain agnostic regarding the libraries and frameworks used alongside it.

And even when Meta's team is involved, it does not always primarily focus on the community's interests. In June 2024, an update to Suspense, a React feature that manages asynchronous behaviours such as API calls, radically changed its behaviour, to the detriment of the performance of most applications using that feature.

This change was fairly incomprehensible to developers most familiar with the subject and, after investigation, turned out to have been introduced... for Instagram's needs. The topic was even covered by [specialised online media](https://javascript.developpez.com/actu/359323/React-19-une-modification-de-la-facon-dont-Suspense-gere-les-requetes-en-parallele-pourrait-potentiellement-degrader-de-maniere-significative-la-performance-de-nombreux-sites-web-qui-s-appuient-sur-React/). The team eventually reversed course, but not without losing the trust of part of the community.

**Want to discover how to use React Hooks?**

Read our article "Getting started with React hooks: an overview of the useState hook"

![React hooks - Meritis black and white](/assets/images/blog/react-vs-angular/inline-6.webp)

### Why Is All This A Problem?

If your project is expected to have a short lifespan and will not necessarily require significant maintenance work in the future, these points probably do not concern you. Personally, I am even rather pleased to see Angular brought back up to date and a little more attentive to its users.

My intention was above all to show that seeing a big name attached to a library is not necessarily a guarantee of trust and stability and that, on the contrary, the direction given to the evolution of that library may correspond to imperatives and needs that are not those of the broader community.

I think the conclusion of the developpez.com article cited earlier summarises the question well: how can we ensure that the evolution of these libraries remains compatible with the need for stability and maintainability in existing applications? And how can we ensure that the community is involved in discussions and decisions about their future?

Beyond these concerns, the Flutter case clearly shows that even when the team responsible for a tool is committed and takes feedback into account, belonging to a large group creates a real vulnerability to the broader decisions such a company may make.

Personally, I have heard many criticisms of Vue's status, a library that, in the view of some technical decision-makers I have spoken with, did not deserve the same consideration as Angular or React because of the support Google and Meta provide to them. Today, that independence seems to me more like a strength, and also closer to the original philosophy of open source. The rapid diffusion of innovations from the Vue environment into the rest of the JavaScript ecosystem, with real benefits for users, seems to prove that point.
