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

**Dans un monde où les applications deviennent de plus en plus complexes et distribuées, structurer proprement son code n’est plus une option, mais une nécessité. L’architecture CQRS (Command Query Responsibility Segregation), associée au pattern Mediator via la bibliothèque MediatR en .NET, s’impose comme une solution efficace pour séparer les responsabilités, améliorer la testabilité et renforcer la maintenabilité du code. Dans cet article, nous vous proposons une analyse concrète et détaillée de cette approche, appuyée par des bonnes pratiques et un retour d’expérience terrain.**

![Meritis - Architecture système CQRS](/assets/images/blog/cqrs-mediator-net/inline-1.webp)

Dans les applications complexes, la gestion des commandes (écriture) et des requêtes (lecture) peut vite devenir difficile à maintenir. C’est là qu’intervient le **CQRS** (Command Query Responsibility Segregation), un pattern d’architecture qui sépare les responsabilités entre les opérations de lecture (Query) et d’écriture (Command) des données.

En complément, le package **MediatR**, une implémentation du pattern comportemental **Mediator**, permet de centraliser la gestion des requêtes et des commandes dans une application .NET. Mais concrètement, comment ça marche ? Suivez le guide pas à pas. **Au sommaire :**

-   Pourquoi et comment utiliser **CQRS** avec **MediatR** en .NET.
-   Un exemple **d’implémentation complète et testée**, incluant **Entity Framework, une API REST, et une structure modulaire en plusieurs projets.**
-   Mon avis personnel sur l’adoption de ce pattern.
-   Comment tester cette architecture efficacement.

### Quels prérequis avant d’utiliser CQRS avec Mediator en .NET ?

Avant de commencer, assurez-vous d’avoir les outils suivants :

-   **NET 8** (ou a minima .NET 6) ;
-   **Visual Studio 2022.**

Et installez les packages Nuget suivants :

-   **Entity Framework Core** pour l’accès aux données ;
-   **MediatR** pour faciliter la gestion des commandes et requêtes au travers du pattern Mediator ;
-   **XUnit, Moq, Shouldly** pour les tests unitaires.

### Pourquoi utiliser CQRS et Mediator ?

#### Les avantages de CQRS

1.  **Séparation des responsabilités :** évite d’avoir des services qui mélangent trop de logique métier.
2.  **Meilleure scalabilité :** permet d’optimiser séparément les performances des lectures et des écritures.
3.  **Facilité de test** : les commandes et requêtes sont isolées, ce qui simplifie les tests unitaires.
4.  **Clarté du code** : facilite la compréhension et l’évolution du projet.

#### Avantages de Mediator et usage avec MediatR

1.  **Découplage du code** : évite les dépendances directes entre les services et les couches de l’application.
2.  **Facilité d’extension** : ajout de nouvelles fonctionnalités sans impact majeur sur le code existant.
3.  **Centralisation des flux** : un point d’entrée unique pour gérer les requêtes et commandes.

Pour en savoir plus sur le pattern Mediator, vous pouvez consulter [le site Refactoring Guru](https://refactoring.guru/design-patterns/mediator).  

**Au delà de la technique, une bonne méthodologie vous permet d’optimiser votre production logicielle.**

👉 Découvrez notre article [« DevOps, Lean, chaîne de valeur : optimiser la production logicielle »](https://meritis.fr/blog/devops-lean-chaine-de-valeur-optimiser-la-production-logicielle/)

[![Meritis - DevOps et lean](/assets/images/blog/cqrs-mediator-net/inline-2.webp)](https://meritis.fr/blog/devops-lean-chaine-de-valeur-optimiser-la-production-logicielle/)

### Architecture du projet

Nous utilisons une architecture **hexagonale**, avec une **couche API** et une **couche** **Core** contenant :

-   L’Application (Interfaces, la logique métier sous forme de **Commandes (Command)** et **Requêtes (Query)**) ;
-   Le Domain (les entités du métier) ;
-   Et une **couche** **Infrastructure** intégrant l’implémentation et la connexion à la base de données.

![Meritis - Utiliser CQRS avec Mediator en .NET - Architecture](/assets/images/blog/cqrs-mediator-net/inline-3.webp)

### Explication des projets

1\. **CQRSProject.Api** **:** notre **API** contient les **Controllers** qui exposent les endpoints et utilisent **MediatR** pour dispatcher les commandes et requêtes.

![Meritis - CQRSProject.Api](/assets/images/blog/cqrs-mediator-net/inline-4.webp)

2\. **CQRSProject.Application** **:** contient toute la logique métier : **Interfaces, Commands, Queries** et **Handlers.**

![Meritis - CQRSProject.Application](/assets/images/blog/cqrs-mediator-net/inline-5.webp)

![Meritis - CQRSProject.Application](/assets/images/blog/cqrs-mediator-net/inline-6.webp)

L’implémentation de **CQRS** est organisée dans le répertoire **Features**, avec une séparation par entité. Ce découpage améliore la lisibilité et facilite l’évolution en fonction des fonctionnalités à développer.

Cependant, certains développeurs pourraient décider de regrouper les **Commands, Queries** et **Handlers** ensemble pour toutes les entités. Tout dépend donc du choix de l’architecture.

3\. **CQRSProject.Domain :** contient nos **entités** et modèles de données.

4\. **CQRSProject.Persistence** : gère l’accès aux données via **Entity Framework Core, la configuration de nos entités** et **Repositories** qui contient les implémentations de nos contrats de persistance définis dans le **CQRSProject.Application**.

5\. **CQRSProject.Application.UnitTests :** projet dédié aux tests unitaires, utilisant **XUnit, Moq et Shouldly.**

**Envie de découvrir le framework .Net Core, plus récent et plus flexible ?**

👉 Découvrez notre article « [Premiers pas avec .Net Core »](https://meritis.fr/blog/premiers-net-core/)

### Implémentation de CQRS avec MediatR en .NET

#### 1\. Installation des MediatR et EntityFrameworkCore

Ajout du **package MediatR** dans le projet **CQRSProject.Application** **:**

Ajout du **package EntityFrameworkCore** et la référence du projet CQRSProject.Application dans le projet **CQRSProject.Persistence :**

Ajout du **package EntityFrameworkCore.Tools** dans le projet **CQRSProject.Api** permettant d’effectuer certaines opérations de base de données pour générer ou mettre à jour la base de données via la migration :

#### 2\. Configuration de MediatR dans la classe d’extension ApplicationServiceRegistration.cs

C’est dans cette classe d’extension **ApplicationServiceRegistration.cs** que seront enregistrés les services du projet **CQRSProject.Application** qui contient **l’implémentation du** **CQRS.** La méthode d’extension **AddApplicationServices()** sera ajoutée dans les services du projet **CQRSProject.Api** dans **Program.cs** :

#### 3\. Configuration du DbContext et ajout des services de persistances

Configurez le **DbContext** et ajoutez les **services de persistances** dans la classe d’extension **PersistenceServiceRegistration.cs** du projet **CQRSProject.Persistence**. Ainsi, la méthode d’extension **AddPersistenceServices()** sera ajoutée dans les services du projet **CQRSProject.Api** dans **Program.cs :**

#### 4\. Implémentation du CQRS dans le projet CQRSProject.Application :

**Envie de vous challenger avec des énigmes de développement ?**

👉 [Découvrez notre nouvelle plateforme CodeOnTime.fr et les résolutions de notre concours CleanSea !](https://meritis.fr/blog/code-on-time-2025-nettoyage-des-mers-decryptage-des-solutions/)

[](https://meritis.fr/blog/code-on-time-2025-nettoyage-des-mers-decryptage-des-solutions/)

1.  **Création d’une Command (écriture) et du gestionnaire de cette Command sur l’entité Product.**

Par exemple :

-   **Command** pour la **création d’un Product** : Ici notre Command aura pour paramètres le nom et le numéro tels que les champs définis (Name et Number) dans la classe **CreateProductCommand.cs**, pour la création d’un produit. Et l’implémentation de l’interface **IRequest** dans notre command, permet de le référencer pour **MediatR.**

-   **Gestionnaire de la Command** de **création d’un Product** **:** le handler de command est référencé dans **MediatR** via l’interface **IRequestHandler**.

-   **Command** pour la **mise à jour d’un Product :**

-   **Gestionnaire de la Command de** **mise à jour d’un Product :**

-   **Command** pour la **suppression d’un Product :**

-   **Gestionnaire de la Command** de **suppression d’un Product :**

               **2. Création d’une Query (lecture) et du gestionnaire de cette Query sur l’entité Product.**

Par exemple :

-   **Query** pour obtenir une **liste de Product :**

-   **Gestionnaire de la Query** qui retourne une **liste de Product :**

-   **Query** pour retourner **un Product** qui prend en paramètre un **Id :**

-   **Gestionnaire de la Query** qui retourne **un Product par Id.**

#### 5\. Configuration de MediatR dans l’API : CQRSProject.Api

Comme mentionné plus haut, nous enregistrons dans notre API la configuration de **MediatR** via la méthode d’extension A**ddApplicationServices()** (définie dans _ApplicationServiceRegistration.cs_), ainsi que celle de la base de données et des services de **persistance** via **AddPersistenceServices()** (définie dans _PersistenceServiceRegistration.cs_).

Cependant, ces configurations peuvent être ajoutées directement ici dans **Program.cs**. D’où tout est une question de choix, de la conception à mettre en place pour notre solution.

#### 6\. Exemple de Controller utilisant CQRS et MediatR

Ainsi, dans nos ApiControllers, nous ne ferons appel qu’aux **Command** et **Query** à passer au **Mediator**, ce qui permet d’avoir un Controller léger au niveau du code. Cela est réalisé via l’injection d’un **IMediator** et de la méthode **Send(IRequest commandClass).**

**L’architecture serverless, la meilleure option pour réduire votre time to market !**

👉 Découvrez notre article [« L’architecture sans serveur, c’est vraiment sans serveur ? »](https://meritis.fr/blog/larchitecture-sans-serveur-cest-vraiment-sans-serveur/)

[](https://meritis.fr/blog/larchitecture-sans-serveur-cest-vraiment-sans-serveur/)

### Tests unitaires

Grâce à **XUnit, Moq** (pour simuler les dépendances) et **Shouldly** (qui rend les assertions plus expressives et faciles à lire que celles d’Assert d’Xunit), nous pouvons tester nos **Handlers** efficacement. Ainsi, les tests unitaires permettent de vérifier le bon fonctionnement des handlers de commandes et de requêtes, sans dépendre de la base de données réelle.

-   Ajout des packages **Moq** et **Shouldly** et de la référence du projet **CQRSProject.Application** dans le projet **CQRSProject.Application.UnitTests :**

-   Exemple de test du **GetProductsQueryHandler** qui retourne une liste de Product :

### Mon avis personnel

L’utilisation de **CQRS** avec **MediatR** apporte une réelle clarté et modularité au code. J’apprécie particulièrement :

-   La séparation nette des responsabilités qui évite le mélange des préoccupations ;
-   Le couplage faible qui améliore la maintenabilité ;
-   La facilité de test grâce à l’isolation des handlers.

#### Quels inconvénients ?

Cependant, il faut aussi être conscient de certains inconvénients. Pour un projet simple, l’ajout de cette architecture peut sembler excessif et alourdir inutilement la structure du code. De plus, la surcouche de **MediatR**, bien que pratique, peut affecter les performances sur des applications très sollicitées. Enfin, le débogage peut être plus complexe, car les requêtes sont fragmentées en plusieurs **handlers** et événements, ce qui complique le suivi des flux d’exécution.

Vous pouvez avoir un avis plus tranché sur le sujet dans [cet article sur Medium](https://medium.com/@MilanJovanovicTech/stop-conflating-cqrs-and-mediatr-3de8043c764f). 

### Conclusion

L’architecture **CQRS**, combinée à **MediatR**, offre une approche efficace et bien structurée pour les projets .NET complexes. Elle favorise la modularité, la scalabilité et la testabilité, tout en réduisant le couplage. Cependant, son adoption doit être réfléchie. 

Pour des projets complexes nécessitant une séparation claire des commandes et des requêtes, c’est un excellent choix. En revanche, pour des applications plus simples, la surcharge introduite peut ne pas être justifiée. Et vous, avez-vous déjà utilisé **CQRS** **avec** **MediatR** dans vos projets ? Quels ont été vos retours d’expérience ? Partagez-les en commentaire !

[](https://infos.meritis.fr/livre_blanc_software_craftmanship)

**Vous avez aimé cet article ?**

Abonnez-vous à notre newsletter pour ne rien rater de l’actualité Tech et Finance.

#### Pas encore de commentaires

#### Publier un commentaire
