---
title: "Quantization: making an LLM faster, smaller and cheaper"
slug: "llm-quantization"
date: "2026-03-10"
author: "Thomas Réaux"
category: "Data & AI"
tags: ["LLM", "Optimisation", "AI"]
excerpt: "Quantization shrinks language models without sacrificing most of their quality. How does it work?"
image: "/assets/images/blog/quantification-llm.webp"
imageAlt: "Meritis illustration on LLM quantization"
description: "Understanding LLM quantization: principles, gains and trade-offs."
---

Running a large language model is expensive. Quantization is one of the most effective levers to reduce the bill.

## The principle

Quantizing means representing the model weights on fewer bits (for example 8 or 4 instead of 16). The model becomes **lighter** and **faster** at inference.

## The gains

Less memory, lower latency and a fraction of the hosting cost: quantization makes models runnable on more modest hardware.

## The trade-offs

Quantizing too aggressively degrades quality. The challenge is to find the right balance, measured on real use cases.
