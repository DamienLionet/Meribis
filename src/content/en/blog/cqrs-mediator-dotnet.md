---
title: "CQRS and Mediator in .NET: why and how to use them"
slug: "cqrs-mediator-dotnet"
translationKey: "cqrs-mediator"
date: "2025-12-12"
author: "Julien Faure"
category: "Application development"
tags: [".NET", "SI architecture", "Programming"]
excerpt: "Separating reads and writes clarifies code and makes it more testable. The Mediator pattern orchestrates it cleanly."
image: "/assets/images/blog/cqrs-mediator-net.webp"
imageAlt: "Meritis illustration on CQRS and Mediator in .NET"
description: "CQRS and the Mediator pattern in .NET: principles, benefits and pitfalls."
---

On complex applications, mixing reads and writes eventually bloats the code. CQRS proposes to separate them.

## The CQRS principle

CQRS separates **commands** (which change state) from **queries** (which read it). Each side evolves independently, with its own models.

## The role of the Mediator

The Mediator pattern decouples the caller from the handler: one handler per command or query, orchestrated without direct dependencies.

## The pitfalls

CQRS is not free: it adds structure. On a simple CRUD, it can be overkill. Reserve it for genuinely complex domains.
