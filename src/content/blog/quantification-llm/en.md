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

For several years now, LLMs have played a central role in our lives and in the way we work in companies. The performance of the models we use also seems to keep improving. But there is nothing magical about this improvement: it is linked to the continuous increase in model size. As a result, these models become more expensive, slower and require increasingly large infrastructures to run. This is where LLM quantization becomes useful: it is a technique that can significantly reduce model size without degrading performance too much.
![Quantification_des_LLM](/assets/images/blog/quantification-llm/inline-1.webp)

What are the main principles behind quantization? Why does this technique play a key role in AI model performance and deployment? How can it influence your organisation's strategic choices? These are the questions we explore in this article.

### Basic Principles Of An LLM

Before discussing quantization, it is worth recalling a few key principles about LLMs.

An LLM is a large model capable of understanding, manipulating and generating human language.

_Note: on this blog, you will find several articles about how ChatGPT works and about transformers, the technology behind current language models._

To understand this article, it is enough to know that a language model is a type of **neural network**.

![Diagram of a neural network](/assets/images/blog/quantification-llm/inline-2.webp)

_Diagram of a neural network [1]_

In this diagram, you can see that a neural network is a system that takes an input, passes it through several layers of neurons (four layers here) and produces an output.

Each neuron is associated with a parameter called a **weight**. When the input data passes through the different layers, operations are performed with these weights (multiplications, for example), which produces an output.

An LLM is therefore a very large neural network, which can contain hundreds of layers and billions of parameters. It takes text as input and produces an answer as output.

It is also essential to distinguish two phases in the life of a language model:

1.  The first is the **training** phase, during which the model is shown billions of pages of text and its weights are gradually updated so that it learns to formulate coherent answers.
2.  The second is the **usage** phase, also called the **inference** phase.

### Why Make Models Smaller?

As you will have understood, the remarkable performance of today's language models is made possible by their gigantic size.

But this scale creates several problems. First, a model's training phase becomes longer and more expensive as the model grows. The larger a model is, the more GPUs are needed to train it and the more time is required to update all its weights during training. A GPU is a computing chip that can parallelise many calculations. These chips are essential for training and using large neural networks such as language models.

The same applies to the usage phase. To run a model locally, meaning on your own machine, you need sufficient infrastructure. To give one example: the DeepSeek-R1 model contains 671 billion parameters and weighs around 720 GB. Running it at home would require nearly 300,000 euros of hardware, with an ecological cost that is just as high.

It is therefore easy to understand why making language models lighter is so important, both for those who build them and for those who use them. This is where **LLM quantization** comes in.

_Note: to chat with a model in your browser, you only need an internet connection. The model is then run remotely, which means you delegate the calculations to the provider._

### Principles Of Quantization

The size of a model (in GB) is proportional to its number of parameters and to the memory space allocated to each parameter. Reducing the number of parameters in a model almost always comes with a drop in performance. Another idea for reducing model size therefore follows naturally: if we cannot reduce the number of parameters, we need to **reduce the memory space allocated to each parameter**. This is the principle of quantization.

#### Different Ways To Store A Number And The Required Memory Space

In computing, a number is stored as bits, made up of 0s and 1s. The more bits you allocate to store a number, the more different and precise values you can represent, including values with many decimal places.

Because an LLM is a neural network, storing it means storing all its weights, meaning a set of numbers that determine its behaviour. You then need to decide how many bits to allocate to each of these numbers. For example, if you store them on 16 bits instead of 32 bits, they can take far fewer different values. These values are coarser, but **the model size is divided by two**.

### LLM Quantization

As you will have understood, quantizing an LLM means reducing the precision of its weights so that they take up less memory and the model becomes lighter.

In practice, you may want to quantize an LLM either to **reduce training costs** or to **speed up and simplify inference**. The methods used in each case are not the same.

#### Making Inference Easier

In this section, we will focus on techniques that aim to make a model lighter during its usage phase. The benefits are clear: reducing the model's memory footprint, accelerating inference, lowering energy consumption and reducing usage costs.

##### a) Post-Training Quantization (PTQ)

The first idea that comes to mind, and the most natural one, is this: train a model at maximum precision by storing its weights on 32 bits, then quantize it after training, just before deployment. This is the principle of **post-training quantization**.

To understand it more concretely, it is like training the model with very precise weights, with many decimal places, to make sure it learns to be truly "intelligent", then "rounding" all those weights when it is time to use it.

For example, if a model is trained in 32 bits and then quantized in 8 bits, its size is divided by four without too large a performance drop. To return to the DeepSeek-R1 example, there is a heavily quantized version that weighs around 130 GB. This version can run on hardware costing "only" around 50,000 euros.

This method nevertheless raises questions: if so much effort is spent training the model with high precision, why do its performances remain more or less the same after quantization? Should this loss of precision across billions of parameters not cause the model's capabilities to drop?

The answers to these questions are numerous and very complex, but two points are worth remembering:

-   First, precisely because the model contains so many weights, most individual values matter only a little. What matters is the model's overall structure. It is not really affected by small variations in weight values because these variations compensate for each other at a macroscopic level.
-   Second, the very nature of an LLM does not require absolute precision. As mentioned earlier, an LLM takes text as input, such as your prompt, and returns an answer.

In reality, its answer is generated word by word, iteratively: at each iteration, it chooses the word it considers most probable. The exact values of these probabilities matter little. Their relative values determine the word chosen at each step.

In addition, there is no single correct answer: when the LLM chooses the next word, the word it considers the fifth most likely is not necessarily much less relevant than the first. So even if the output probability values are slightly modified, for example because precision was lost during model quantization, the quality of the final answer will not necessarily be strongly affected.

##### b) Quantization-Aware Training (QAT)

We have just seen a first method that consists of training the model at maximum precision, then quantizing it just before use.

This method is convenient and widely used, but it is no longer enough if you want more aggressive quantization. Model performance remains more or less the same when quantizing to 8 bits, but it drops if you want to go further, for example to 4 bits.

To quantize the model as much as possible, you can no longer train it as if nothing were different and then quantize it at the last moment. The training phase needs to be adapted: this is the principle of **quantization-aware training**.

The purpose of this technique is to expose the model to heavily quantized values earlier than during the inference phase.

To understand this technique, you need a broad understanding of how an LLM is trained. The principle is simple: you provide it with text, make it generate an answer, then update its weights more or less depending on the gap between its answer and the expected answer. The phase in which it predicts an answer is the _forward pass_; the phase in which weights are updated is the _backward pass_. These two phases are repeated across billions of texts.

During quantization-aware training, the _forward pass_ is performed with quantized weights and the _backward pass_ is performed at maximum precision.

Concretely, the model's weights are stored at maximum precision, for example in 32 bits. Each time the model makes a prediction, a copy of its weights is made, quantized to the desired precision and used to perform the prediction. Then the weight update (_backward pass_) is performed on the original version of the model at maximum precision. The quantized copy of the model used for the _forward pass_ is recalculated at each iteration.

Once training is complete, the model is quantized before deployment.

The advantage of this method is that the model learns very early to make predictions with heavily quantized weights.

In practice, quantization-aware training often represents only a small part of the overall training process, for example 10%. The rest of the training is performed at maximum precision.

#### Reducing Training Costs

DeepSeek-V3 is said to have been trained for around 6 million dollars, compared with several tens of millions for the largest American models. How can such cost differences be explained for models with similar performance?

It is important to understand that the two methods presented so far reduce inference costs, not training costs. If you apply post-training quantization, the training phase remains unchanged.

As for quantization-aware training (QAT), most of the training is performed at maximum precision and an additional training phase is added, which can make the total training process even more expensive.

In this second section, we will therefore address another objective: how can quantization be used to reduce model training costs?

Just as the final model can be quantized to limit inference costs, it is possible to train a quantized model directly to limit training costs. This is known as fully quantized training (FQT).

##### What Is The Difference Between Quantization-Aware Training And Fully Quantized Training?

I would like to emphasise a distinction that can be confusing: the difference between QAT (quantization-aware training) and FQT.

-   First, these two methods do not have the same objective: one reduces inference costs, the other training costs.
-   Second, their principles differ. Remember: in QAT, only the _forward pass_ is carried out with quantized weights, and only for around 10% of training. In FQT, the _backward pass_ (the weight update) is also performed with reduced precision, throughout the whole training process.

We saw earlier that an LLM's prediction does not require absolute precision, which explains why performance can be preserved even after model quantization. In contrast, obtaining a performant model while its weights are updated in a coarse, quantized way during training is far from obvious.

Let us look at some of the factors that explain how companies manage to do this remarkably well.

First, the term fully quantized training is something of an overstatement. It would be more accurate to speak of mixed-precision training. Indeed, not all LLM weights have the same sensitivity to noise. Only the weights that are less affected are quantized, which means the vast majority of them. More sensitive weights are kept at maximum precision. The hardware used to train models, GPUs, is optimised to support this mixed-precision training.

In addition, the choices made about the format used to store weights are very important. It is important to understand that when four bits are allocated to store a number, that number can take only 16 different values. But depending on the chosen format, these 16 values can have more or fewer decimal places, be closer together or further apart, and so on. For example, during the _backward pass_, you need to cover a wide range of values in order to correctly adapt the modification of the model's weights according to the quality of its prediction. Clever formats, well suited to the task, therefore need to be chosen.

### Performance Of Quantized Models

As you will have understood, the strength of quantized models lies in their size. These models are easier to load, faster, consume fewer resources and can run on less expensive hardware. But by definition, quantization comes with a loss of precision. This loss can be almost imperceptible, or it can make the model unusable if quantization is pushed too far.

To choose the model to deploy in-house, it is essential to understand the trade-off between size and performance.

![Performance variations of Llama-3.2 1B depending on quantization](/assets/images/blog/quantification-llm/inline-3.webp)

_Performance variations of Llama-3.2 1B depending on quantization [2]_

In this chart, we can see how answer quality (vertical axis) and speed (horizontal axis) change for the Llama-3.2 1B model, a small open-source model with one billion parameters from Meta, depending on different quantization methods.

For example, we can see that PTQ (post-training quantization) produces a model that is 2.5 times faster, but whose answer quality is degraded by 20%. The other two quantization methods are more complex, but achieve the same speed gains without significantly affecting answer quality.

Ultimately, the whole challenge is to understand and control the trade-off between model size, execution speed and quantization level in order to find the best balance between performance and efficiency.

### Conclusion

In this article, I have tried to present a few key ideas behind the principle of LLM quantization.

In practice, some companies publish quantized versions of their models directly. Others publish the highest-precision versions, which are then quantized by the open-source community.

In all cases, quantization has become an essential technique at the heart of efforts to make LLMs more efficient and accessible.

#### Sources

_[1]: inside-machinelearning.com_

_[2]: medium.com_
