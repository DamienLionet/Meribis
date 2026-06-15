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

**In a world where applications are becoming increasingly complex and distributed, structuring your code cleanly is no longer an option but a necessity. The CQRS architecture (Command Query Responsibility Segregation), combined with the Mediator pattern via the MediatR library in .NET, stands out as an effective solution to separate responsibilities, improve testability and strengthen code maintainability. In this article, we offer a concrete, detailed analysis of this approach, backed by best practices and field experience.**

![Meritis - CQRS system architecture](/assets/images/blog/cqrs-mediator-net/inline-1.webp)

In complex applications, managing commands (writes) and queries (reads) can quickly become hard to maintain. This is where **CQRS** (Command Query Responsibility Segregation) comes in — an architecture pattern that separates the responsibilities between read operations (Query) and write operations (Command) on data.

In addition, the **MediatR** package, an implementation of the behavioural **Mediator** pattern, makes it possible to centralise the handling of queries and commands in a .NET application. But how does it work in practice? Follow the step-by-step guide. **In this article:**

-   Why and how to use **CQRS** with **MediatR** in .NET.
-   A **complete, tested implementation** example, including **Entity Framework, a REST API, and a modular multi-project structure.**
-   My personal opinion on adopting this pattern.
-   How to test this architecture effectively.

### What prerequisites before using CQRS with Mediator in .NET?

Before starting, make sure you have the following tools:

-   **.NET 8** (or at least .NET 6);
-   **Visual Studio 2022.**

And install the following NuGet packages:

-   **Entity Framework Core** for data access;
-   **MediatR** to facilitate the handling of commands and queries through the Mediator pattern;
-   **XUnit, Moq, Shouldly** for unit testing.

### Why use CQRS and Mediator?

#### The benefits of CQRS

1.  **Separation of responsibilities:** avoids services that mix too much business logic.
2.  **Better scalability:** allows read and write performance to be optimised separately.
3.  **Ease of testing:** commands and queries are isolated, which simplifies unit testing.
4.  **Code clarity:** makes the project easier to understand and evolve.

#### Benefits of Mediator and use with MediatR

1.  **Code decoupling:** avoids direct dependencies between the application's services and layers.
2.  **Ease of extension:** add new features without major impact on existing code.
3.  **Centralised flows:** a single entry point to handle queries and commands.

To learn more about the Mediator pattern, you can check out [the Refactoring Guru site](https://refactoring.guru/design-patterns/mediator).

**Beyond the technique, a good methodology helps you optimise your software production.**

👉 Read our article [« DevOps, Lean, value chain: optimising software production »](https://meritis.fr/blog/devops-lean-chaine-de-valeur-optimiser-la-production-logicielle/)

[![Meritis - DevOps and lean](/assets/images/blog/cqrs-mediator-net/inline-2.webp)](https://meritis.fr/blog/devops-lean-chaine-de-valeur-optimiser-la-production-logicielle/)

### Project architecture

We use a **hexagonal** architecture, with an **API layer** and a **Core layer** containing:

-   The Application (Interfaces, business logic in the form of **Commands** and **Queries**);
-   The Domain (the business entities);
-   And an **Infrastructure layer** integrating the implementation and the database connection.

![Meritis - Using CQRS with Mediator in .NET - Architecture](/assets/images/blog/cqrs-mediator-net/inline-3.webp)

### Explaining the projects

1. **CQRSProject.Api:** our **API** contains the **Controllers** that expose the endpoints and use **MediatR** to dispatch commands and queries.

![Meritis - CQRSProject.Api](/assets/images/blog/cqrs-mediator-net/inline-4.webp)

2. **CQRSProject.Application:** contains all the business logic: **Interfaces, Commands, Queries** and **Handlers.**

![Meritis - CQRSProject.Application](/assets/images/blog/cqrs-mediator-net/inline-5.webp)

![Meritis - CQRSProject.Application](/assets/images/blog/cqrs-mediator-net/inline-6.webp)

The **CQRS** implementation is organised in the **Features** directory, with separation by entity. This breakdown improves readability and makes it easier to evolve according to the features to be developed.

However, some developers might decide to group the **Commands, Queries** and **Handlers** together for all entities. It all depends on the chosen architecture.

3. **CQRSProject.Domain:** contains our **entities** and data models.

4. **CQRSProject.Persistence:** manages data access via **Entity Framework Core, the configuration of our entities** and **Repositories** that contain the implementations of our persistence contracts defined in **CQRSProject.Application**.

5. **CQRSProject.Application.UnitTests:** a project dedicated to unit tests, using **XUnit, Moq and Shouldly.**

### Implementing CQRS with MediatR in .NET

#### 1. Installing MediatR and EntityFrameworkCore

Add the **MediatR package** in the **CQRSProject.Application** project.

Add the **EntityFrameworkCore package** and the reference to the CQRSProject.Application project in the **CQRSProject.Persistence** project.

Add the **EntityFrameworkCore.Tools package** in the **CQRSProject.Api** project, allowing certain database operations to be performed to generate or update the database via migration.

#### 2. Configuring MediatR in the ApplicationServiceRegistration.cs extension class

It is in this **ApplicationServiceRegistration.cs** extension class that the services of the **CQRSProject.Application** project (which contains the **CQRS implementation**) are registered. The **AddApplicationServices()** extension method will be added to the **CQRSProject.Api** project's services in **Program.cs**.

#### 3. Configuring the DbContext and adding persistence services

Configure the **DbContext** and add the **persistence services** in the **PersistenceServiceRegistration.cs** extension class of the **CQRSProject.Persistence** project. The **AddPersistenceServices()** extension method will then be added to the **CQRSProject.Api** project's services in **Program.cs**.

#### 4. Implementing CQRS in the CQRSProject.Application project

1.  **Creating a Command (write) and its handler on the Product entity.**

For example:

-   **Command** for **creating a Product**: here our Command takes the name and number as parameters, as defined (Name and Number) in the **CreateProductCommand.cs** class, to create a product. Implementing the **IRequest** interface in our command lets **MediatR** reference it.
-   **Handler** for the Product **creation Command**: the command handler is referenced in **MediatR** via the **IRequestHandler** interface.
-   **Command** for **updating a Product.**
-   **Handler** for the Product **update Command.**
-   **Command** for **deleting a Product.**
-   **Handler** for the Product **deletion Command.**

2.  **Creating a Query (read) and its handler on the Product entity.**

For example:

-   **Query** to obtain a **list of Products.**
-   **Handler** for the Query returning a **list of Products.**
-   **Query** to return **a Product**, taking an **Id** as a parameter.
-   **Handler** for the Query returning **a Product by Id.**

#### 5. Configuring MediatR in the API: CQRSProject.Api

As mentioned above, we register in our API the **MediatR** configuration via the **AddApplicationServices()** extension method (defined in _ApplicationServiceRegistration.cs_), as well as the database and **persistence** services via **AddPersistenceServices()** (defined in _PersistenceServiceRegistration.cs_).

However, these configurations can be added directly here in **Program.cs**. It is all a matter of the design choices you make for your solution.

#### 6. Example of a Controller using CQRS and MediatR

In our API Controllers, we only call the **Command** and **Query** to pass to the **Mediator**, which keeps the Controller lightweight. This is achieved through the injection of an **IMediator** and the **Send(IRequest commandClass)** method.

### Unit tests

Thanks to **XUnit, Moq** (to mock dependencies) and **Shouldly** (which makes assertions more expressive and easier to read than XUnit's Assert), we can test our **Handlers** effectively. Unit tests verify the correct behaviour of command and query handlers without depending on the real database.

-   Add the **Moq** and **Shouldly** packages and the reference to the **CQRSProject.Application** project in the **CQRSProject.Application.UnitTests** project.
-   Example test of the **GetProductsQueryHandler** that returns a list of Products.

### My personal opinion

Using **CQRS** with **MediatR** brings real clarity and modularity to the code. I particularly appreciate:

-   The clear separation of responsibilities that avoids mixing concerns;
-   The loose coupling that improves maintainability;
-   The ease of testing thanks to handler isolation.

#### What are the drawbacks?

However, you also need to be aware of certain drawbacks. For a simple project, adding this architecture may seem excessive and needlessly heavy on the code structure. Moreover, the **MediatR** layer, while convenient, can affect performance on heavily loaded applications. Finally, debugging can be more complex, because requests are split across several **handlers** and events, which complicates following execution flows.

You can find a more clear-cut opinion on the subject in [this article on Medium](https://medium.com/@MilanJovanovicTech/stop-conflating-cqrs-and-mediatr-3de8043c764f).

### Conclusion

The **CQRS** architecture, combined with **MediatR**, offers an effective and well-structured approach for complex .NET projects. It promotes modularity, scalability and testability while reducing coupling. However, its adoption should be considered carefully.

For complex projects requiring a clear separation of commands and queries, it is an excellent choice. For simpler applications, on the other hand, the overhead introduced may not be justified. And you — have you ever used **CQRS with MediatR** in your projects? What was your experience? Share it in the comments!
