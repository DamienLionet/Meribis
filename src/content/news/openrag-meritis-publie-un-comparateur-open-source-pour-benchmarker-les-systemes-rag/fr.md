---
title: "OpenRAG : Meritis publie un comparateur open source pour benchmarker les systèmes RAG"
slug: "openrag-meritis-publie-un-comparateur-open-source-pour-benchmarker-les-systemes-rag"
date: "2025-07-15"
author: "Meriteam"
category: "Actualités"
tags: ["Actualités"]
excerpt: "Meritis lance OpenRAG, un outil open source permettant de comparer les performances de plus de 20 architectures RAG (Retrieval-Augmented Generation). Objectif : aider les équipes techniques à faire des choix …"
image: "/assets/images/news/openrag-meritis-publie-un-comparateur-open-source-pour-benchmarker-les-systemes-rag/cover.jpg"
imageAlt: "OPENRAG MERITIS Le benchmark open source pour les RAG"
---

<p><strong>Meritis lance OpenRAG</strong>, un outil open source permettant de comparer les performances de plus de 20 architectures RAG (Retrieval-Augmented Generation). Objectif : aider les équipes techniques à faire des choix éclairés pour leurs projets IA générative, à partir de <strong>données concrètes, mesurables et reproductibles</strong>.</p>

<div class="wp-block-image">
<figure class="aligncenter size-large is-resized"><img width="1024" height="576" src="/assets/images/news/openrag-meritis-publie-un-comparateur-open-source-pour-benchmarker-les-systemes-rag/inline-01.jpg" alt="OPENRAG MERITIS Le benchmark open source pour les RAG" class="wp-image-55565" style="width:719px;height:auto" /></figure>
</div>

<h2 class="wp-block-heading" id="h-benchmarker-les-rag-sur-vos-donnees-en-toute-transparence">Benchmarker les RAG sur vos données, en toute transparence</h2>

<p>Les systèmes RAG sont devenus des briques clés de l’IA générative moderne. Ils permettent aux LLM d’interroger une base documentaire externe pour produire des réponses plus précises, actualisées et contextuelles.</p>

<p>Mais face à la diversité des implémentations (LangChain, Haystack, LlamaIndex…), il reste difficile de choisir le bon pipeline. Jusqu’ici, aucune solution ne permettait de <strong>comparer objectivement plusieurs systèmes RAG</strong> sur des critères concrets tels que la <strong>pertinence des réponses</strong>, la <strong>consommation de tokens</strong>, le <strong>temps de traitement</strong> ou encore l’<strong>impact énergétique</strong>.</p>

<p>👉 C’est précisément ce que propose <strong>OpenRAG</strong>, le premier <strong>outil open source de benchmark RAG</strong>, développé par la cellule Innovation de Meritis.</p>

<h2 class="wp-block-heading">Ce que permet OpenRAG</h2>

<ul class="wp-block-list">
<li><strong>Comparer plus de 20 pipelines RAG</strong> en conditions réelles</li>

<li><strong>Tester ses propres données métier</strong> dans deux modes complémentaires :
<ul class="wp-block-list">
<li><em>Mode Chat</em> : interagir avec un RAG sélectionné</li>

<li><em>Mode Benchmark</em> : tester plusieurs systèmes de façon structurée</li>
</ul>
</li>

<li><strong>Mesurer les performances</strong> sur des critères clés :
<ul class="wp-block-list">
<li>qualité des réponses (scoring LLM-as-a-judge)</li>

<li>tokens consommés</li>

<li>temps de réponse</li>

<li>estimation de l’impact carbone</li>
</ul>
</li>

<li><strong>Visualiser les résultats</strong> via un dashboard interactif</li>

<li><strong>Générer des rapports exploitables</strong> pour arbitrer vos choix technologiques</li>
</ul>

<p>L’outil est livré avec une configuration Docker/Conda, compatible avec des modèles open source (Mistral, Ollama, VLLM…) ou propriétaires (OpenAI, Anthropic). Il peut être déployé en local, sur serveur ou dans un environnement sécurisé.</p>

<h2 class="wp-block-heading">Une plateforme conçue pour les équipes techniques</h2>

<p>OpenRAG s’adresse aux professionnels directement impliqués dans la conception, l’évaluation ou l’industrialisation de pipelines RAG :</p>

<ul class="wp-block-list">
<li><strong>CDO, Head of Data</strong> : arbitrer des choix technologiques à partir d’indicateurs fiables</li>

<li><strong>CTO, architectes IA</strong> : valider une architecture RAG compatible avec les exigences du SI</li>

<li><strong>Data scientists, ingénieurs IA</strong> : tester, modifier et personnaliser les approches</li>

<li><strong>Product Managers IA, Labs innovation</strong> : cadrer un POC ou enrichir un MVP avec les bons composants</li>
</ul>

<h2 class="wp-block-heading">OpenRAG : open source, sobre et orienté impact</h2>

<p>Lancé sous licence MIT, <strong>OpenRAG est accessible librement sur GitHub</strong>. Il s’agit de la première contribution open source de Meritis, société de conseil en IT et Data certifiée B Corp™.</p>

<blockquote class="wp-block-quote is-layout-flow wp-block-quote-is-layout-flow">
<p>« Notre ambition avec OpenRAG est simple : fournir un socle objectif, transparent et réutilisable pour choisir un système RAG adapté à son contexte métier. C’est une brique d’utilité publique pour toutes les équipes IA générative qui veulent aller au-delà de la hype. »<br>— <em>Théodore Boullier, Directeur Innovation, Meritis</em></p>
</blockquote>

<p>L’initiative s’inscrit dans une volonté plus large : encourager une <strong>adoption responsable des technologies génératives</strong>, en fournissant des outils sobres, auditables et intégrables dans des environnements exigeants.</p>

<div class="wp-block-media-text alignwide is-stacked-on-mobile"><figure class="wp-block-media-text__media"><img width="1024" height="536" src="/assets/images/news/openrag-meritis-publie-un-comparateur-open-source-pour-benchmarker-les-systemes-rag/inline-02.png" alt="OpenRAG by Meritis interface" class="wp-image-55516 size-full" /></figure><div class="wp-block-media-text__content">
<h2 class="wp-block-heading" id="h-lancez-votre-benchmark">Lancez votre benchmark 🚀</h2>

<div class="wp-block-buttons is-content-justification-center is-layout-flex wp-container-core-buttons-is-layout-16018d1d wp-block-buttons-is-layout-flex">
<div class="wp-block-button"><a class="wp-block-button__link has-black-background-color has-background wp-element-button" href="https://github.com/meritisgroup/OpenRAG" target="_blank" rel="noreferrer noopener">Télécharger OpenRAG sur GitHub</a></div>
</div>

<p>Clonez le repo, installez-le localement ou en Docker, et testez votre stack RAG dès aujourd’hui.</p>
</div></div>

<p>📩 Vous souhaitez une démonstration, un accompagnement à l’intégration, ou un audit technique de votre pipeline IA ?<br>Contactez directement notre équipe Innovation ⤸.</p>

<hr class="wp-block-separator has-alpha-channel-opacity" />

<div class="wp-block-group has-light-pink-background-color has-background"><div class="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
<div class="wp-block-group has-light-pink-background-color has-background"><div class="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
<h2 class="wp-block-heading" id="h-vous-avez-un-projet-ia-en-cours-ou-a-venir-contactez-notre-equipe-innovation">Vous avez un projet IA en cours ou à venir ? <strong>Contactez notre équipe Innovation</strong></h2>

<p id="form_RAG_ressource">Nous accompagnons les équipes techniques dans :</p>

<ul class="wp-block-list">
<li>l’intégration d’OpenRAG dans des environnements complexes</li>

<li>l’adaptation des benchmarks à vos contraintes métier ou sécurité</li>

<li>l’analyse et l’optimisation de vos choix technologiques</li>
</ul>

<script src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    portalId: "20078036",
    formId: "a8736738-f272-4960-8210-fcf26446d052",
    region: "na1"
  });
</script>
</div></div>
</div></div>
