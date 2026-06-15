---
title: "Qu'est-ce que le backtesting en trading et pourquoi est-il essentiel ?"
slug: "backtesting-trading"
date: "2025-11-20"
author: "Marc Vasseur"
category: "Finance & risques"
tags: ["Finance de marché", "Quant", "Risque"]
excerpt: "Tester une stratégie sur des données passées avant de risquer le moindre euro : c'est tout l'enjeu du backtesting."
image: "/assets/images/blog/backtesting-trading.webp"
imageAlt: "Illustration Meritis sur les mathématiques des marchés financiers"
description: "Le backtesting en trading : principe, bénéfices et limites méthodologiques."
---

Et si toutes les données passées ne se valaient pas ? Dans l’univers impitoyable des marchés financiers, les décisions d’investissement s’appuient souvent sur des modèles qui répliquent le passé pour anticiper l’avenir. C’est le principe du backtesting. Mais dans un environnement aussi instable que celui de la Bourse, faut-il vraiment accorder la même importance à une donnée vieille de dix ans qu’à une observation de la semaine dernière ? À travers une plongée dans les mathématiques financières, cet article explore l’intérêt de pondérer les données historiques en fonction de leur ancienneté, pour mieux capter les dynamiques récentes du marché et affiner ses stratégies de trading.
![](/assets/images/blog/backtesting-trading/inline-1.webp)

Avant d’investir en Bourse, il est essentiel de vérifier que la stratégie de trading envisagée a donné de bons résultats par le passé. Cette étape indispensable ! , c’est le fameux « backtesting ». Elle consiste à récupérer un historique de cours de Bourse (par exemple, les cours de l’action LVMH des cinq dernières années) et d’y appliquer la stratégie souhaitée afin de constater sa performance dans le passé. Un backtest consiste, ni plus ni moins, à ‘‘rejouer’’ le passé pour confirmer une stratégie. Appliqué à la Bourse, on parle de backtesting en trading.  

Car quelle que soit leur sensibilité ou leurs méthodes d’investissement (gestion passive, active, quantitative, etc.), les gérants du monde entier s’accordent, au moins, sur un point  : ils utilisent des stratégies de trading parce qu’elles ont fait leurs preuves dans le passé ! Obtenir de bons résultats dans le passé est donc une condition préalable avant d’envisager l’utilisation à venir d’une stratégie. _A contrario_, une « mauvaise » méthode dans le passé se révèlera rarement excellente dans le futur.  

Partant de ce constat, l’analyse de données passées va même permettre d’élaborer des stratégies d’investissement intégralement fondées sur des modèles statistiques. Mais une question cruciale se pose lors de l’évaluation de ces stratégies de trading : faut-il accorder le même poids à toutes les données, ou bien faut-il privilégier les observations les plus récentes ? Cet article explore cette question et démontre pourquoi la pondération des observations en fonction de leur ancienneté est cruciale. 

### Qu’est-ce que le backtesting en trading ?

Les marchés financiers évoluent dans un environnement complexe, dynamique et incertain. Les prix des actifs, telles que les actions, les obligations ou les matières premières, sont très souvent représentés sous forme de « séries temporelles », c’est-à-dire comme une suite d’observations classées par ordre chronologique. Cela permet d’observer comment un phénomène change au fil des jours, des mois ou des années. L’un des enjeux consiste à déceler des tendances durables. 

Contrairement à des données classiques que l’on pourrait mélanger sans ordre particulier, dans une série temporelle, l’ordre compte. De plus, les séries temporelles financières se caractérisent par plusieurs propriétés distinctives : 

1.   **Non-stationnarité :** les paramètres statistiques (moyenne, variance, etc.) évoluent dans le temps car les marchés financiers sont par nature instables et en perpétuelle évolution. 
2.  **Autocorrélation variable :** l’étude des performances passées peut permettre de prédire les performances futures, mais cette relation est instable et rend les prévisions difficiles. 
3.  **Effets de régime :** le marché peut basculer entre différents régimes (haussier, baissier, latéral). 

Dans ce contexte, une observation datant de plusieurs années peut ne plus refléter la dynamique actuelle du marché. Or, de nombreux modèles de backtesting supposent que toutes les observations historiques ont la même valeur informative. Cela pose un problème de réalisme. 

### Les limites d’un backtest non pondéré

Le backtesting consiste à simuler l’application d’une stratégie de trading (ou d’investissement) sur des données historiques afin d’en évaluer la performance. Si l’on ne pondère pas les observations, chaque donnée, qu’elle date d’hier ou d’il y a dix ans, contribue de manière égale à l’estimation des paramètres du modèle qui sera ensuite utilisé dans le futur. 

L’approche ‘‘non pondérée’’ comporte plusieurs risques : 

1.  **Biais d’obsolescence :** les conditions de marché peuvent avoir complètement changé entre la date du début de l’échantillon (il y a 10 ans, par exemple) et aujourd’hui. On va donc tenir compte de données anciennes (beaucoup moins pertinentes) avec la même importance que des données récentes. 
2.  **Sous-estimation des risques récents :** comme toutes les observations ont le même poids, plus l’échantillon sera grand, plus il va diluer l’importance d’un « choc » récent dans un ensemble majoritairement calme. 
3.  **Faible réactivité :** le modèle s’adapte lentement aux nouvelles dynamiques du marché.  

Ainsi, un backtest non pondéré risque de conduire à des décisions d’investissement sous-optimales. 

### La pondération exponentielle : une solution pragmatique de backtesting

Pour pallier les limitations d’une série temporelle où toutes les observations auraient la même importance, il est possible de pondérer les observations selon leur ancienneté en accordant plus d’importance aux données les plus récentes et en donnant moins d’importance aux données les plus anciennes. L’une des méthodes les plus courantes pour réaliser ce « lissage » d’une série temporelle est la pondération exponentielle où le poids décroit lorsqu’on s’éloigne dans le temps. 

L’évolution des pondérations suit une décroissance exponentielle selon la formule : 

 W\_t = e^{-\\lambda (T - t)}

où : 

-   _Wt_ est la pondération (W pour Weight, le « poids » en anglais) à appliquer pour le jour _t_ ;  
-   _λ_ est le paramètre de décroissance (plus il est grand, plus l’oubli est rapide) ;
-   _T_ est le nombre total d’observations ;
-   _t_ est l’observation courante. 

Lorsque _t_ = 1, on fait référence au tout premier jour de l’échantillon (i.e., le jour le plus ancien). 

Lorsque _t_ = T, on fait référence au dernier jour de l’échantillon (i.e., le jour le plus récent). 

Finalement, dans la formule ci-dessus, le seul paramètre pour lequel il va falloir déterminer une valeur (la plus pertinente possible…), c’est λ le coefficient de décroissance. 

### Comment choisir λ dans le cadre du backtesting en trading ?

-   Si on souhaite accorder une très forte importance aux journées les plus récentes, alors on choisira un λ avec une valeur élevée : 

![](/assets/images/blog/backtesting-trading/inline-2.webp)

-   Si, au contraire, on souhaite que l’influence des jours anciens soit encore significative, alors on prendra un λ plus faible : 

![](/assets/images/blog/backtesting-trading/inline-3.webp)

Dans le cas extrême où l’on choisirait que λ = 0, alors on obtiendrait Wt = 1 quel que soit _t_. Cela signifierait que toutes les observations recevraient le même poids, ce qui correspondrait à une pondération uniforme. Cela annule l’effet de la pondération exponentielle et fait disparaître tout son intérêt. Il est donc essentiel de choisir un λ > 0 pour que la pondération varie en fonction du temps et accorde plus de poids aux données récentes. 

### Cas pratique de backtesting en trading

Exemple avec un échantillon de 5 rendements (pour λ = 0,1) : 

<table class="has-fixed-layout"><tbody><tr><td class="has-text-align-center" data-align="center"><strong>Jour&nbsp;</strong><br><strong><em>t</em>&nbsp;</strong></td><td class="has-text-align-center" data-align="center"><strong>Rendement observé&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><br><strong><em>R<sub>t</sub>&nbsp;</em></strong></td><td class="has-text-align-center" data-align="center"><strong>Pondération exponentielle&nbsp;&nbsp; <em>W<sub>t</sub></em>&nbsp;</strong></td><td class="has-text-align-center" data-align="center"><strong>Rendement pondéré&nbsp;</strong><br><strong><em>R<sub>t</sub></em> x <em>W<sub>t</sub></em>&nbsp;</strong></td></tr><tr><td class="has-text-align-center" data-align="center">5&nbsp;</td><td class="has-text-align-center" data-align="center">0,40%&nbsp;</td><td class="has-text-align-center" data-align="center">1,0000&nbsp;</td><td class="has-text-align-center" data-align="center">0,400%&nbsp;</td></tr><tr><td class="has-text-align-center" data-align="center">4&nbsp;</td><td class="has-text-align-center" data-align="center">0,10%&nbsp;</td><td class="has-text-align-center" data-align="center">0,9048&nbsp;</td><td class="has-text-align-center" data-align="center">0,090%&nbsp;</td></tr><tr><td class="has-text-align-center" data-align="center">3&nbsp;</td><td class="has-text-align-center" data-align="center">0,20%&nbsp;</td><td class="has-text-align-center" data-align="center">0,8187&nbsp;</td><td class="has-text-align-center" data-align="center">0,164%&nbsp;</td></tr><tr><td class="has-text-align-center" data-align="center">2&nbsp;</td><td class="has-text-align-center" data-align="center">-0,30%&nbsp;</td><td class="has-text-align-center" data-align="center">0,7408&nbsp;</td><td class="has-text-align-center" data-align="center">-0,222%&nbsp;</td></tr><tr><td class="has-text-align-center" data-align="center">1&nbsp;</td><td class="has-text-align-center" data-align="center">0,50%&nbsp;</td><td class="has-text-align-center" data-align="center">0,6703&nbsp;</td><td class="has-text-align-center" data-align="center">0,335%&nbsp;</td></tr></tbody></table>

Dans l’exemple ci-dessus, on observe que seul le jour le plus récent (_t_ = 5) conserve l’intégralité de son rendement originel (0,40%) puisque la pondération appliquée est égale à 1. En revanche, pour toutes les autres journées, il y a bien une diminution très rapide des nouveaux rendements (par rapport à leur valeur initiale). Par exemple, le jour 1 était initialement le rendement le plus élevé de l’échantillon (avec 0,50%). Après application de la pondération, il devient finalement moins fort que le jour le plus récent de l’échantillon (0,335% < 0,400%). C’est l’effet de l’oubli. 

C’est bien à partir de ces nouveaux rendements pondérés qu’il faudra réaliser un backtest pour établir les futurs plans de trading. Cette méthode de pondération des données passées permet de : 

1.  Capturer les dynamiques récentes du marché. 
2.  Réduire l’impact des chocs anciens devenus peu représentatifs. 
3.  Réagir plus rapidement aux changements de régime. 

### Conclusion : le rôle clé de la pondération dans une stratégie de trading

Les séries temporelles financières sont le reflet d’un monde en perpétuelle évolution. Dans ce contexte, toutes les observations historiques ne se valent pas. L’utilisation de pondérations, notamment exponentielles ou composites, permet de donner plus de poids aux données récentes ou critiques. Cela améliore la robustesse des backtests et la pertinence des stratégies de trading associées. En définitive, intégrer la notion d’ancienneté et de pertinence dans l’analyse des séries temporelles est une nécessité stratégique dans le cadre du backtesting en trading.
