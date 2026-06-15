---
title: "CQRS et Mediator en .NET : pourquoi et comment les utiliser"
slug: "cqrs-mediator-net"
translationKey: "cqrs-mediator"
date: "2025-12-12"
author: "Julien Faure"
category: "Développement applicatif"
tags: [".NET", "Architecture SI", "Programmation"]
excerpt: "Séparer lectures et écritures clarifie le code et le rend plus testable. Le pattern Mediator orchestre le tout proprement."
image: "/assets/images/blog/cqrs-mediator-net.webp"
imageAlt: "Illustration Meritis sur CQRS et Mediator en .NET"
description: "CQRS et le pattern Mediator en .NET : principes, bénéfices et pièges à éviter."
---

Sur les applications complexes, mélanger lectures et écritures finit par alourdir le code. CQRS propose de les séparer.

## Le principe de CQRS

CQRS sépare les **commandes** (qui modifient l'état) des **requêtes** (qui le lisent). Chaque côté évolue indépendamment, avec ses propres modèles.

## Le rôle du Mediator

Le pattern Mediator découple l'appelant du gestionnaire : un handler par commande ou requête, orchestré sans dépendances directes.

## Les pièges

CQRS n'est pas gratuit : il ajoute de la structure. Sur un CRUD simple, il peut être surdimensionné. À réserver aux domaines réellement complexes.
