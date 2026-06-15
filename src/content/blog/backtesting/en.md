---
title: "What is backtesting in trading and why is it essential?"
slug: "backtesting-trading"
date: "2025-11-20"
author: "Marc Vasseur"
category: "Finance & risk"
tags: ["Capital markets", "Quant", "Risk"]
excerpt: "Testing a strategy on past data before risking a single euro: that is the whole point of backtesting."
image: "/assets/images/blog/backtesting-trading.webp"
imageAlt: "Meritis illustration on the mathematics of financial markets"
description: "Backtesting in trading: principle, benefits and methodological limits."
---

What if not all past data were equal? In the unforgiving world of financial markets, investment decisions often rely on models that replicate the past to anticipate the future. That is the principle of backtesting. But in an environment as unstable as the stock market, should we really give the same importance to a ten-year-old data point as to an observation from last week? Through a dive into financial mathematics, this article explores the value of weighting historical data according to its age, in order to better capture recent market dynamics and refine trading strategies.
![](/assets/images/blog/backtesting-trading/inline-1.webp)

Before investing on the stock market, it is essential to check that the trading strategy under consideration produced good results in the past. This indispensable step is the famous "backtesting". It consists of retrieving a history of stock prices (for example, LVMH share prices over the last five years) and applying the desired strategy to it in order to observe its past performance. A backtest is, quite simply, about "replaying" the past to confirm a strategy. Applied to the stock market, this is called backtesting in trading.

Whatever their sensibility or investment methods (passive, active, quantitative management, etc.), fund managers around the world agree on at least one point: they use trading strategies because these have proven themselves in the past! Obtaining good results in the past is therefore a prerequisite before considering the future use of a strategy. _Conversely_, a "bad" method in the past will rarely turn out to be excellent in the future.

Building on this observation, the analysis of past data even makes it possible to develop investment strategies based entirely on statistical models. But a crucial question arises when evaluating these trading strategies: should all data be given the same weight, or should the most recent observations be favoured? This article explores that question and shows why weighting observations according to their age is crucial.

### What is backtesting in trading?

Financial markets operate in a complex, dynamic and uncertain environment. Asset prices, such as stocks, bonds or commodities, are very often represented as "time series", that is, a sequence of observations ordered chronologically. This makes it possible to observe how a phenomenon changes over the days, months or years. One of the challenges is to detect lasting trends.

Unlike conventional data that could be shuffled without any particular order, in a time series the order matters. Moreover, financial time series have several distinctive properties:

1.  **Non-stationarity:** statistical parameters (mean, variance, etc.) change over time because financial markets are inherently unstable and constantly evolving.
2.  **Variable autocorrelation:** studying past performance may help predict future performance, but this relationship is unstable and makes forecasting difficult.
3.  **Regime effects:** the market can switch between different regimes (bullish, bearish, sideways).

In this context, an observation dating back several years may no longer reflect current market dynamics. Yet many backtesting models assume that all historical observations have the same informational value. This poses a problem of realism.

### The limits of an unweighted backtest

Backtesting consists of simulating the application of a trading (or investment) strategy on historical data in order to evaluate its performance. If observations are not weighted, every data point — whether from yesterday or ten years ago — contributes equally to estimating the model parameters that will then be used in the future.

The "unweighted" approach carries several risks:

1.  **Obsolescence bias:** market conditions may have completely changed between the start of the sample (10 years ago, for example) and today. We would therefore take old data (much less relevant) into account with the same importance as recent data.
2.  **Underestimation of recent risks:** since all observations carry the same weight, the larger the sample, the more it dilutes the importance of a recent "shock" within a mostly calm set.
3.  **Low responsiveness:** the model adapts slowly to new market dynamics.

Thus, an unweighted backtest risks leading to suboptimal investment decisions.

### Exponential weighting: a pragmatic backtesting solution

To overcome the limitations of a time series in which all observations would have the same importance, it is possible to weight observations according to their age by giving more importance to the most recent data and less importance to the oldest data. One of the most common methods to achieve this "smoothing" of a time series is exponential weighting, where the weight decreases as we move back in time.

The weights follow an exponential decay according to the formula:

W\_t = e^{-\\lambda (T - t)}

where:

-   _Wt_ is the weight (W for Weight) to apply for day _t_;
-   _λ_ is the decay parameter (the larger it is, the faster the forgetting);
-   _T_ is the total number of observations;
-   _t_ is the current observation.

When _t_ = 1, we refer to the very first day of the sample (i.e., the oldest day).

When _t_ = T, we refer to the last day of the sample (i.e., the most recent day).

Ultimately, in the formula above, the only parameter for which a value must be determined (as relevant as possible) is λ, the decay coefficient.

### How to choose λ for backtesting in trading?

-   If we want to give very high importance to the most recent days, then we will choose a λ with a high value:

![](/assets/images/blog/backtesting-trading/inline-2.webp)

-   If, on the contrary, we want the influence of older days to remain significant, then we will take a lower λ:

![](/assets/images/blog/backtesting-trading/inline-3.webp)

In the extreme case where we chose λ = 0, we would obtain Wt = 1 regardless of _t_. This would mean that all observations would receive the same weight, corresponding to uniform weighting. This cancels out the effect of exponential weighting and removes all its value. It is therefore essential to choose a λ > 0 so that the weighting varies over time and gives more weight to recent data.

### A practical backtesting case

Example with a sample of 5 returns (for λ = 0.1):

| Day _t_ | Observed return _Rt_ | Exponential weight _Wt_ | Weighted return _Rt_ × _Wt_ |
| --- | --- | --- | --- |
| 5 | 0.40% | 1.0000 | 0.400% |
| 4 | 0.10% | 0.9048 | 0.090% |
| 3 | 0.20% | 0.8187 | 0.164% |
| 2 | -0.30% | 0.7408 | -0.222% |
| 1 | 0.50% | 0.6703 | 0.335% |

In the example above, we observe that only the most recent day (_t_ = 5) keeps the entirety of its original return (0.40%), since the applied weight equals 1. For all the other days, however, there is a very rapid decrease in the new returns (compared to their initial value). For example, day 1 was initially the highest return in the sample (at 0.50%). After applying the weighting, it ends up lower than the most recent day of the sample (0.335% < 0.400%). This is the forgetting effect.

It is precisely from these new weighted returns that a backtest must be run to establish future trading plans. This method of weighting past data makes it possible to:

1.  Capture recent market dynamics.
2.  Reduce the impact of old shocks that have become unrepresentative.
3.  React more quickly to regime changes.

### Conclusion: the key role of weighting in a trading strategy

Financial time series reflect a world in constant change. In this context, not all historical observations are equal. Using weightings — particularly exponential or composite ones — makes it possible to give more weight to recent or critical data. This improves the robustness of backtests and the relevance of the associated trading strategies. Ultimately, integrating the notion of age and relevance into time-series analysis is a strategic necessity for backtesting in trading.
