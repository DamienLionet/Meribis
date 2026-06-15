---
title: "CI/CD performance: ship faster without sacrificing quality"
slug: "performance-ci-cd-productivity"
date: "2026-02-02"
author: "Corentin Prigent"
category: "Application development"
tags: ["DevOps", "CI/CD", "Quality"]
excerpt: "Optimising your CI/CD pipelines means shorter delivery cycles while keeping a high level of quality. A look at concrete levers."
featured: true
image: "/assets/images/blog/performance-ci-cd-productivite.webp"
imageAlt: "Meritis editorial illustration on CI/CD performance"
description: "How to optimise CI/CD pipelines to improve team productivity without technical debt."
---

CI/CD performance is now a key issue for organisations that want to accelerate delivery cycles while maintaining a high level of quality. CI/CD pipelines are the backbone of DevOps chains: they automate code integration, test execution and application deployment, reducing time to production and improving delivery reliability.
![DevOps CI/CD performance image](/assets/images/blog/performance-ci-cd-productivite/inline-1.webp)

In theory, a high-performing CI/CD pipeline allows development teams to work faster, with less friction and better visibility into the state of software production. In practice, many factors can degrade this performance: excessive wait times caused by runner saturation, long execution times, fragile pipelines, lack of standardisation or absence of indicators to manage the CI/CD chain effectively. These dysfunctions have a direct impact on team velocity, overall productivity and developer satisfaction.

Improving CI/CD performance is not just about optimising a few jobs or occasionally adding resources. It requires a structured management approach that combines listening to teams, objectively analysing data (lead time, queue time, execution time) and implementing appropriate technical and organisational levers. Through an anonymised client case from an audit, this article presents a concrete approach to analysing CI/CD pipeline performance, objectifying friction points and identifying measurable actions that can sustainably improve team velocity and alignment.

## CI/CD Performance: Managing Pipeline Velocity

CI/CD pipelines are now a fundamental pillar of software production chains. By automating code integration, testing and deployment, these tools accelerate continuous delivery while maintaining a high level of quality. However, in many organisations, these pipelines gradually become sources of friction: excessive execution times, large queues or recurring failures.

A structured approach to performance analysis and optimisation is therefore essential. Through an anonymised client case, this article presents a pragmatic method for measuring, analysing and improving pipeline velocity from both a technical and organisational standpoint.

### 1 Definition Of CI/CD And Difference Between CI And CD

CI/CD is an automated development process that forms the backbone of modern DevOps operations. This approach ensures continuous automation and monitoring throughout the application lifecycle, allowing teams to deliver more frequently with a higher level of quality.

#### What Is Continuous Integration? (CI)

Continuous integration (CI) refers to the practice of automating the integration of code changes into a shared repository on a regular basis. Each integration triggers a series of automated tests that verify code quality and quickly identify potential issues. This method makes it possible to detect and fix bugs earlier in the development process, reducing correction costs and delays.

#### What Is Continuous Deployment?

Continuous deployment (CD) represents the final phase of the CI/CD pipeline. There are two main variants:

-   **Continuous delivery**: automates the publication of validated code to a repository, while keeping manual validation before production deployment.

-   **Continuous deployment**: automates the entire process through to production release, without human intervention.

This approach allows teams to deploy new features quickly and confidently, accelerating the software development lifecycle.

#### CI Vs CD: Key Points

<table class="has-fixed-layout"><tbody><tr><td><strong>Aspect</strong>&nbsp;</td><td><strong>Continuous Integration (CI)</strong>&nbsp;</td><td><strong>Continuous Deployment (CD)</strong>&nbsp;</td></tr><tr><td><strong>Main objective</strong>&nbsp;</td><td>Check that code changes are compatible&nbsp;</td><td>Deliver validated code to users&nbsp;</td></tr><tr><td><strong>Process</strong>&nbsp;</td><td>Build, unit tests and integration tests&nbsp;</td><td>Automated deployment to various environments&nbsp;</td></tr><tr><td><strong>Frequency</strong>&nbsp;</td><td>Several times a day&nbsp;</td><td>After continuous integration validation&nbsp;</td></tr><tr><td><strong>Result</strong>&nbsp;</td><td>Tested and validated code&nbsp;</td><td>From several times a day to less than once a year, depending on the organisation</td></tr></tbody></table>

This CI/CD combination significantly improves team velocity while maintaining quality in the deployment process.

### 2 Client Context And Problem Statement

Our client, an organisation with three development teams, was facing velocity challenges in its software production chain. Each team works on distinct pipelines within an architecture showing signs of inefficiency. As part of its continuous improvement strategy, the company wanted to optimise its DevOps practices to increase productivity and reduce deployment instability.

A complete 360-degree audit was commissioned to establish a clear evolution path over the coming months, including analysis of current tools, architecture and processes. Our intervention focused specifically on analysing the velocity of the resources (runners) used by the DevOps chain, a critical factor for the organisation's competitiveness.

**The client request: "As CTO, I want to audit the CI/CD chain in order to gain velocity."**

### 3 Audit Approach And Methodology

How can the CI/CD chain be audited effectively? Our methodology is based on a two-dimensional analysis that makes it possible to objectify real pipeline performance and its impact on teams.

#### Continuous Integration Approach

Our approach is structured around two main investigation axes:

-   The voice of developers, to understand the factors affecting satisfaction and identify sources of friction.

-   Quantitative analysis of CI/CD workflows, precisely measuring pipeline execution times and their impact on wait times.

Pipeline automation and optimisation are essential levers for improving overall velocity, but they first require an objective measurement of current performance.

**Lead Time (total time perceived by the developer)** = queue time + execution time (cycle time)

For a job: sum of the job's queue time and execution time.

For a pipeline: sum of the Lead Times of its jobs = sum of average queue times + sum of average execution times.

We analyse these metrics after removing extreme values to obtain a representative view of the daily user experience. Some charts present 7-day averages to improve readability and identify significant trends.

### 4 Team Voice And Qualitative Findings

![](/assets/images/blog/performance-ci-cd-productivite/inline-2.webp)

_Representation of the client's team distribution_

To accelerate exchanges and synergy, development and operations teams should collaborate as closely as possible, ideally within the same squad. This collaboration model improves the fluidity of feedback loops. For this client, DevOps roles are integrated into Ops teams, but collaboration remains insufficient, affecting the overall improvement of the chain.

Development teams report slowness on most pipelines without being able to objectify it, due to a lack of consolidated data. Some stability issues are also reported, although they are generally under control.

#### Team 1 - BLUE Team

Recently integrated into the GitLab environment, this team reports significant slowness despite stable pipelines. It has a strong expectation that execution times should be reduced to improve productivity and satisfaction.

#### Team 2 - RED Team

Generally satisfied with execution times, this team nevertheless observes occasional slowness and wants better control over these variations to stabilise the experience for its [developers and the evolution of their role](https://meritis.fr/lia-et-les-developpeurs-revolution-ou-simple-evolution-du-metier/).

#### Team 3 - GREEN Team

This QA team uses pipelines for test automation. It faces recurring slowness during execution and has a strong expectation that this should be reduced to optimise its testing best practices.

#### Ops/DevOps Teams

The Ops and DevOps teams have high confidence in their runners and have already launched several improvement actions. However, they struggle to demonstrate these gains, as the initial perception remains anchored among developers.

#### Aside - Our Accelerator

In response to the difficulties encountered during our missions (data retrieval, processing, fragmented analysis), we developed a DevOps chain analysis tool. It collects data through APIs and consolidates it to objectify performance and recommendations.

_In this article, we focus on an example based on GitLab. We connect our accelerator to the client environment to measure current performance and progressive gains._

### 5 Quantitative Analysis And Performance Objectification

_In the charts below, the wait time can be read as Queue Time and the execution time as Cycle Time._

#### Performance Testing In Pipelines: Reading The Metrics

Objectifying performance through monitoring dashboards makes it possible to precisely identify bottlenecks in the CI/CD chain. Our analysis focuses on three essential metrics: Lead Time (total perceived time), execution time (Cycle Time) and queue time per runner.

<table class="has-fixed-layout"><tbody><tr><td><strong>Runner</strong>&nbsp;</td><td><strong>Pipelines</strong>&nbsp;</td><td><strong>Average Lead Time</strong>&nbsp;</td><td><strong>% Queue Time</strong>&nbsp;</td><td><strong>Success Rate</strong>&nbsp;</td></tr><tr><td>BLUE&nbsp;</td><td>1,622&nbsp;</td><td>2,422 s (40 min)&nbsp;</td><td>54%&nbsp;</td><td>90.8%&nbsp;</td></tr><tr><td>RED 1&nbsp;</td><td>~3,000&nbsp;</td><td>1,020 s (17 min)&nbsp;</td><td>7.7%&nbsp;</td><td>-&nbsp;</td></tr><tr><td>RED 2&nbsp;</td><td>~750&nbsp;</td><td>720 s (12 min)&nbsp;</td><td>0.6%&nbsp;</td><td>-&nbsp;</td></tr><tr><td>GREEN 1,2,8&nbsp;</td><td>~3,000 each&nbsp;</td><td>100 s (1 min 40)&nbsp;</td><td>~4%&nbsp;</td><td>-&nbsp;</td></tr><tr><td>GREEN 3&nbsp;</td><td>3,500&nbsp;</td><td>150 s (2 min 30)&nbsp;</td><td>10.7%&nbsp;</td><td>-&nbsp;</td></tr></tbody></table>

#### Pipeline Velocity By Runner

![](/assets/images/blog/performance-ci-cd-productivite/inline-3.webp)

_Lead time, processing time and average queue by runner for pipelines over 9 months_

#### Team BLUE - Runner BLUE

BLUE is the runner on which pipelines take the longest. A developer using this runner must wait an average of 40 minutes for a complete pipeline execution, of which 54% corresponds only to queue time before actual execution begins.

The distribution analysis shows that more than 37% of pipelines exceed 40 minutes of total execution, while fewer than 10% execute in under 15 minutes. This distribution confirms the systemic nature of the observed slowness.

![](/assets/images/blog/performance-ci-cd-productivite/inline-4.webp)

_Number of pipelines by duration bucket (300-second buckets)_

The 7-day rolling average shows a gradual degradation in Lead Time, from around 1,400 seconds at the end of 2024 to 2,400 seconds at the end of August 2025. This 71% increase breaks down into a 70% rise in execution time (from 1,000 to 1,700 seconds) and a 40% rise in queue time (from 500 to 700 seconds).

![](/assets/images/blog/performance-ci-cd-productivite/inline-5.webp)

_Evolution of the 7-day average pipeline Lead Time_

![](/assets/images/blog/performance-ci-cd-productivite/inline-6.webp)

#### Team RED - Runner RED 1 And Runner RED 2

RED 1 and RED 2 runners show average execution durations of 17 and 12 minutes respectively. For RED 1, only 7.7% of total time corresponds to waiting; most of the Lead Time comes from execution time.

A significant gap appears between these two runners: RED 1's average queue time is twenty times higher than RED 2's (79 seconds versus 4 seconds) for a pipeline volume four times larger.

#### Team GREEN - Runners GREEN 1, 2, 3 And 8

GREEN 1, 2 and 8 runners show an average execution time of 100 seconds, with around 3,000 pipelines each over the studied period.

GREEN 3 stands out with nearly 3,500 pipelines and an average time of 150 seconds, 50% more than the other runners in the same family. Its queue time is also 3 to 4 times higher (16 seconds versus around 4 seconds), suggesting an imbalance in workload distribution.

### 6 Improvement Levers And Gain Simulation

Optimising a CI/CD chain requires a structured approach combining organisational and technical levers. This approach delivers measurable gains in velocity and deployment process efficiency.

#### Organisational Improvement Levers

-   **Definition and monitoring of SLA/SLO**: stabilises performance, aligns teams and prioritises actions.

-   **Continuous improvement objectives**: energises optimisation, measures real gains and anticipates risks.

-   **Data sharing**: promotes transparency, ownership of improvements and reduces unobjectified perceptions.

#### Technical Levers And Optimisation Tools

Technical optimisation levers include runner containerisation (better control during load peaks), job parallelisation, adding extra runners (which reduces queue time), pipeline reallocation and optimisation of slow jobs.

To improve pipeline performance, several CI/CD tools can be deployed depending on your environment:

-   **GitLab Runners**: ideal for GitLab environments, with containerisation possibilities.

-   **Jenkins**: highly customisable solution for complex environments.

-   **GitHub Actions**: native integration for projects hosted on GitHub.

-   **CircleCI**: offers automatic resource scaling.

-   **Azure DevOps**: comprehensive solution for the Microsoft ecosystem.

-   **Spacelift**: specialised in infrastructure as code (IaC).

#### Focus On SLAs

For professional and managerial monitoring, a good practice is to define SLAs, track them and take action when they are exceeded.

Example SLA for a type of pipeline:

-   The pipeline success rate is above 98%.

-   Processing time is below 150 seconds in 98% of cases.

-   Queue time is below 10 seconds in 85% of cases.

In the present case, we define the following contracts:

-   **BLUE RUNNER** - very long queue time and processing time, not matching expectations. Objective: average Lead Time <= 30 minutes instead of 44 minutes currently.

-   **RED 1** - long queue time and processing time. Objective: average Lead Time <= 10 minutes instead of 17 minutes currently.

-   **RED 2** - very good queue time and long processing time. Objective: average Lead Time <= 10 minutes instead of 13 minutes currently.

-   **GREEN 3** - slower Lead Time than the others. Objective: average Lead Time <= 2 minutes instead of 2 minutes 30 currently.

#### Simulation Of Adding Runners For BLUE

By reusing historical data, we can estimate queue time gains for the BLUE runner through the addition of runners.

_Lead Time evolution based on the number of runners for BLUE_

<table class="has-fixed-layout"><tbody><tr><td>&nbsp;</td><td>1 runner(s)&nbsp;</td><td>2 runner(s)&nbsp;</td><td>3 runner(s)&nbsp;</td><td>4 runner(s)&nbsp;</td><td>5 runner(s)&nbsp;</td></tr><tr><td>Lead time of a job on BLUE&nbsp;</td><td>1034s - 17 min&nbsp;</td><td>732s - 12 min&nbsp;</td><td>566s - 9.5 min&nbsp;</td><td>507s - 8.5 min&nbsp;</td><td>478s - 8 min&nbsp;</td></tr><tr><td>Velocity improvement&nbsp;</td><td>0%&nbsp;</td><td>41%&nbsp;</td><td>83%&nbsp;</td><td>104%&nbsp;</td><td>117%&nbsp;</td></tr></tbody></table>

On the chart, the optimal inflection point is at 3 runners, providing an 83% improvement in Lead Time. BLUE can reduce its average wait time by 540 seconds (41%) with 3 runners, moving from an average pipeline Lead Time of 44 minutes to 36.5 minutes.

With 2 runners, the average Lead Time of a pipeline would fall to 39 minutes, a gain of 5 minutes. By increasing runner capacity, we can also hope to reduce the duration of long jobs.

#### Objectifying Achieved Gains

It is possible to identify a tangible gain from the actions taken by taking into account the eliminated wait time.

Example with BLUE, which has around 2,100 pipelines per year on average and an execution time gain of 8.5 minutes thanks to the addition of 2 runners. We assume a 7.5-hour working day equivalent to 1 person-day.

This creates a gain of around 40 person-days equivalent in wait time per year, in addition to eliminated frustration. This must of course be compared with the cost of adding runners.

#### Recommendations By Team

**BLUE**

-   Add 2 runners to reduce the average queue time by more than 5 minutes per job.

-   Increase virtual machine power to reduce execution times.

-   Work on the slowest specific jobs to reduce their impact.

GREEN - Tag reallocation

_Number of jobs by tag_list per runner_

**GREEN 3**

-   Smooth the load by reallocating tags to the other GREEN runners. This will minimally increase the execution and queue time of the other GREEN runners while significantly relieving the GREEN 3 runner.

-   Ensure developers understand the perceived slowness and the reasons behind these variations.

RED - Slow job optimisation and power increase

_Number of jobs by tag_list per runner_

**RED 1 & 2**

-   Execution time has the greatest impact. Runner 1 queue time can be reduced by reallocating more pipelines to runner 2.

-   Increase virtual machine power to reduce execution time (vertical scaling).

-   Optimise jobs, add cache for certain artifacts, and run pre-analysis phases locally by developers.

### 7 Key Lessons And Conclusion

In this article, we objectified the impact of CI/CD performance on DevOps team velocity. Our structured approach, qualitative interviews, quantitative measurements via our accelerator and gain simulations, made it possible to establish an optimisation strategy based on concrete data rather than perceptions.

Reducing wait times is a major lever for value creation, directly transforming developer frustration into measurable productivity. Our intervention goes beyond technical optimisation to establish a true management system for the CI/CD production chain, aligning teams around common objectives.

Exchanges between teams are now based on objectified data, providing cross-functional visibility into performance and making it possible to proactively identify slowdowns before they affect productivity. This approach not only improves operational velocity but also strengthens collaboration between development and operations teams.

Our added value is based on our **experience**, **pragmatism** and **accelerator**, which optimises the quality of our interventions, both remotely and on site. Want to know more? [Contact us.](https://meritis.fr/contact/?utm_source=meritis.fr&utm_medium=blog&utm_campaign=performance-ci-cd)

### 8 FAQ - CI/CD

#### What Is A Continuous Integration Pipeline (CI/CD)?

A CI/CD pipeline is an automated chain that orchestrates code integration, testing and application deployment. It is the backbone of modern DevOps practices, allowing teams to regularly merge changes into a central repository while ensuring quality through automated testing.

#### What Is The CI/CD Principle?

The CI/CD principle is based on continuous automation and monitoring throughout the application lifecycle. It bridges the gap between development and operations by creating a streamlined software delivery process that promotes frequent deployments, early issue detection and constant improvement in team velocity.

#### What Is The Difference Between CI And CD?

CI (Continuous Integration) automates the integration of code changes into a shared repository with test-based verification. CD has two meanings: Continuous Delivery, which prepares code for manual deployment, and Continuous Deployment, which automatically publishes validated changes directly to production without human intervention.

#### What Are The Best CI/CD Tools?

Currently, the highest-performing CI/CD tools include GitLab CI for its unified environment, GitHub Actions for its native integration with repositories, Jenkins for its flexibility, and Argo CD for Kubernetes deployments. Modern solutions favour AI-driven automation and GitOps workflows to optimise pipeline velocity.

#### How Does A CI/CD Pipeline Improve Productivity?

A CI/CD pipeline improves productivity by automating repetitive tasks and reducing wait times between development phases. It allows teams to focus on creating business value rather than manual operations, while promoting early bug detection and reducing deployment times.

#### How Can You Monitor CI/CD Pipeline Performance?

Effective CI/CD pipeline monitoring relies on tracking key metrics such as execution time, queue time, deployment frequency and failure rate. Establishing SLAs and using dashboards makes it possible to objectify performance, identify bottlenecks and continuously improve velocity.

**Is your CI/CD an accelerator... or a drag on your productivity?**

Navigacom, a consulting firm within the Meritis group, supports IT teams in optimising CI/CD performance for faster, more reliable and more secure deployments.

Audit, recommendations, operational support: our experts work across the entire chain to maximise the business impact of your software delivery.
