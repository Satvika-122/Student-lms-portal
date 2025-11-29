export const courses = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Learn HTML, CSS, JavaScript, and React from scratch.",
    longDescription: `
      This Frontend Development course teaches you how the modern web works. 
      You begin by understanding how websites are structured using HTML, styled with CSS, and made interactive with JavaScript. 
      As you progress, you learn to build advanced front-end applications using React — one of the most powerful libraries in the industry.

      Throughout this course, you will work on mini-projects, exercises, and hands-on tasks that gradually prepare you to build responsive, 
      real-world websites. By the end, you will have the skills required to create professional, production-ready web applications.
    `,
    image: "/courses/frontend.jpg",
    lessons: [
      {
        id: 1,
        title: "HTML Basics",
        //image: "/lessons/html_intro.jpg",
        content: `
          HTML (HyperText Markup Language) forms the basic structure of every webpage. In this lesson, you will understand 
          how elements, tags, and attributes define the layout and content of a website. You will explore headings, paragraphs, 
          lists, images, hyperlinks, and tables — all essential building blocks of any webpage.

          Additionally, you will dive into semantic HTML: elements that give meaning to content, such as <header>, <footer>, 
          <section>, and <article>. These not only improve readability but also boost accessibility and SEO. By mastering HTML, 
          you gain the foundation for all future web development.
        `,
      },
      {
        id: 2,
        title: "CSS Basics",
        //image: "/lessons/css_basics.jpg",
        content: `
          CSS (Cascading Style Sheets) allows you to design visually appealing websites. In this lesson, you will learn how to apply 
          styles such as colors, fonts, spacing, borders, shadows, and backgrounds. You will understand the core concepts of the 
          box model, display types, and positioning — all crucial for layout design.

          You will also learn responsive design using Flexbox and Grid, making your websites adaptable to all screen sizes. By the end, 
          you’ll be able to style complete web pages with modern, clean, and fully responsive layouts.
        `,
      },
      {
        id: 3,
        title: "JavaScript Basics",
        //image: "/lessons/js_intro.jpg",
        content: `
          JavaScript is the programming language of the web. This lesson covers variables, functions, loops, conditions, and operators — 
          the essentials of logical programming. You will also explore arrays, objects, and events, learning how to interact with users 
          and manipulate content dynamically.

          By the end of this lesson, you will be able to update webpage content, respond to button clicks, validate forms, and create 
          basic interactive features. These skills are necessary before moving on to advanced JavaScript topics and React.
        `,
      },
      {
        id: 24,
        title: "React Introduction",
        //image: "/lessons/react_basic.jpg",
        content: `
          React is a powerful JavaScript library used to build dynamic user interfaces. This lesson introduces JSX, components, and props — 
          the core building blocks of React applications. You will learn how React renders UI efficiently through its virtual DOM mechanism.

          You will also build your first simple components and understand how data flows inside a React application. By completing this lesson, 
          you will be prepared to move into hooks, state management, and advanced component architecture.
        `,
      },
    ],
  },
  {
  id: 2,
  title: "Python Programming",
  description: "Learn Python with easy examples.",
  longDescription: `
    Python is one of the most popular and beginner-friendly programming languages in the world. 
    It is known for its simple syntax, powerful features, and use in fields ranging from automation 
    and web development to artificial intelligence and machine learning. This course takes you from 
    absolute basics to writing meaningful programs with confidence.

    Through hands-on lessons and clear explanations, you will learn how Python handles data, 
    controls program flow, and interacts with users. By the end of this course, you will be ready 
    to build real-world Python projects and explore advanced domains like data science or AI.
  `,
  lessons: [
    {
      id: 4,
      title: "Python Intro",
      content: `
        Python is a high-level, interpreted programming language designed to be easy to read 
        and easy to write. In this lesson, you will learn about Python’s history, why it was created, 
        and what makes it one of the most widely used languages today. You will also understand what 
        “interpreted” means and why Python code runs line by line without the need for manual compilation.

        You will then learn how to install Python on your system and write your very first program 
        using the Python interpreter. By understanding how to run Python scripts, use print statements, 
        and work with basic input/output, you build a strong starting foundation. After completing this 
        lesson, you will be fully prepared to dive deeper into programming concepts with confidence.
      `,
    },
    {
      id: 5,
      title: "Variables",
      content: `
        Variables are used to store information that your program can use and manipulate later. In Python, 
        creating variables is extremely simple—no need for type declarations. This lesson explains how Python 
        dynamically assigns types and how variables can store numbers, text, lists, or even entire functions. 
        You will learn best practices for naming variables and understand the concept of dynamic typing.

        You will also explore the most common data types in Python: integers, floats, strings, booleans, lists, 
        tuples, dictionaries, and sets. With examples and hands-on tasks, you'll see how these data types behave 
        differently and how to use them effectively. By the end of this lesson, you will have a strong understanding 
        of how data is stored and manipulated within Python programs.
      `,
    }
  ],
},
  {
  id: 3,
  title: "Java Programming",
  description: "An introduction to Java programming language.",
  longDescription: `
    Java is a powerful, versatile, and widely-used programming language known for its 
    “write once, run anywhere” capability. It runs on the JVM (Java Virtual Machine), 
    which allows Java programs to execute on any system, making it ideal for web apps, 
    Android applications, enterprise systems, and backend development.

    In this course, you will learn the fundamental syntax, object-oriented principles, 
    and essential features of Java. Through hands-on examples and structured lessons, 
    you will gain confidence in writing clean, modular, and efficient Java code. 
    By the end, you’ll have a strong foundation for advanced Java, Android development, 
    or backend frameworks like Spring Boot.
  `,
  lessons: [
    {
      id: 6,
      title: "Java Basics",
      content: `
        This lesson introduces you to the foundations of Java, starting with how the Java Development Kit (JDK) 
        works and how Java programs are structured. You will learn how to write your first “Hello World” program, 
        understand how classes and the main method work, and see how Java source code is compiled into bytecode 
        that runs on the Java Virtual Machine (JVM).

        You will also explore essential programming concepts like variables, data types, input/output handling, 
        operators, and basic control statements. These fundamentals form the core of all Java programs and prepare 
        you to understand more complex concepts later. By the end of this lesson, you will comfortably write simple 
        Java programs and understand how Java executes code under the hood.
      `,
    },
    {
      id: 7,
      title: "OOP in Java",
      content: `
        Java is built entirely around Object-Oriented Programming (OOP), a method of designing software using objects 
        that represent real-world entities. In this lesson, you will learn the four pillars of OOP: Encapsulation, 
        Inheritance, Polymorphism, and Abstraction. These principles help organize code into reusable, scalable, 
        and maintainable structures.

        You will also learn how to create classes, define properties and methods, use constructors, and instantiate 
        objects. Additionally, you will explore concepts like method overloading, method overriding, and access 
        modifiers, all of which help structure large Java applications. By the end of this lesson, you will 
        understand how OOP makes Java powerful and how large software systems are built.
      `,
    },
    {
      id: 8,
      title: "Java Collections",
      content: `
        The Java Collections Framework provides powerful tools for storing and manipulating groups of data. 
        In this lesson, you will explore commonly used collections such as ArrayList, LinkedList, HashMap, HashSet, 
        and TreeMap. You will learn what makes each collection unique and how to choose the right data structure 
        depending on performance and requirements.

        You will also learn how to add, remove, search, and iterate through elements using loops and iterators. 
        Understanding collections is essential for real-world Java development, as they are used heavily in backend 
        systems, APIs, and modern frameworks. By the end of this lesson, you'll be able to work with data efficiently 
        and build more advanced applications.
      `,
    },
  ],
},
{
  id: 4,
  title: "C Programming",
  description: "Master the basics of C programming.",
  longDescription: `
    C is one of the most powerful and foundational programming languages ever created. It forms the 
    basis of many modern languages, including C++, Java, and Python. Known for its speed, efficiency, 
    and low-level memory control, C is widely used in operating systems, embedded systems, compilers, 
    and performance-critical applications.

    This course introduces you to the core concepts of C, starting from basic syntax to working with 
    memory and pointers. You will learn how C programs are structured, how data flows through variables, 
    and how memory is managed manually. By the end of this course, you will have a strong understanding 
    of how systems and low-level software work.
  `,
  lessons: [
    {
      id: 9,
      title: "C Syntax",
      content: `
        This lesson introduces you to the fundamental building blocks of the C programming language. 
        You will learn how to set up your environment, write your first C program, and understand how 
        the compiler converts your code into machine-executable output. The lesson covers essential 
        syntax elements like header files, the main function, semicolons, braces, and comments.

        You will also explore variables, data types, operators, and basic input/output using functions 
        like printf() and scanf(). These are the core components that define how C programs work. 
        By the end of this lesson, you will be able to write simple C programs and understand how 
        statements are executed step by step.
      `,
    },
    {
      id: 10,
      title: "Pointers",
      content: `
        Pointers are one of the most powerful yet challenging concepts in C. This lesson explains what 
        pointers are, how they store memory addresses, and why they are essential for writing efficient 
        programs. You will learn how to declare pointers, dereference them, and understand the difference 
        between a variable’s value and its memory address.

        You will also explore pointer arithmetic, dynamic memory allocation using malloc() and free(), 
        and how pointers are used with arrays, functions, and structures. Mastering pointers gives you 
        full control over how memory is accessed and managed. By the end of this lesson, you will be able 
        to work confidently with pointers and understand how they make C a powerful low-level language.
      `,
    }
  ],
},
  {
  id: 5,
  title: "Data Science Basics",
  description: "Start your journey in data science.",
  longDescription: `
    Data Science is a multidisciplinary field that combines statistics, programming, data analysis, 
    and machine learning to extract meaningful insights from data. It is used across industries to 
    make smarter decisions, predict trends, and understand patterns hidden inside large datasets.

    This course introduces you to the core foundations of data science, including data cleaning, 
    exploration, visualization, and the basics of machine learning. By the end of this course, you 
    will understand how data-driven decision-making works and how modern companies extract value 
    from raw data.
  `,
  lessons: [
    {
      id: 11,
      title: "Data Analysis",
      content: `
        Data analysis involves inspecting, cleaning, transforming, and modeling data to discover 
        useful information. In this lesson, you will learn the different types of data — structured, 
        unstructured, and semi-structured — and understand how analysts prepare data for further 
        exploration. You will explore common data issues such as missing values, duplicates, and 
        inconsistencies, along with methods to handle them.

        You will also learn how statistical techniques like mean, median, variance, correlation, 
        and distribution analysis help uncover trends and patterns in datasets. By the end of this 
        lesson, you will be comfortable performing basic data exploration and understanding how 
        analysts extract meaningful insights from raw data.
      `,
    },
    {
      id: 12,
      title: "Visualization",
      content: `
        Data visualization helps you communicate findings in a clear and intuitive way. In this 
        lesson, you will learn how charts, graphs, and dashboards simplify complex datasets and 
        make patterns more understandable. You will explore common visualizations like bar charts, 
        line graphs, histograms, pie charts, scatter plots, and heatmaps.

        You’ll also learn best practices such as choosing the right chart type, avoiding misleading 
        visualizations, and designing visuals that are easy to interpret. Visualization is one of the 
        most important skills in data science because it helps organizations make informed decisions 
        quickly. By the end of this lesson, you will know how to present data in a visually compelling 
        and meaningful manner.
      `,
    },
    {
      id: 13,
      title: "Machine Learning Intro",
      content: `
        Machine learning is a branch of artificial intelligence that enables computers to learn from 
        data and make predictions without being explicitly programmed. In this lesson, you will learn 
        the difference between supervised, unsupervised, and reinforcement learning. You will also get 
        an introduction to algorithms such as linear regression, decision trees, and clustering models.

        You will also learn how machine learning models are trained, tested, and evaluated using metrics 
        such as accuracy, precision, recall, and F1-score. By the end of this lesson, you will have a 
        strong understanding of how models learn from data and how machine learning plays a crucial role 
        in modern applications like recommendation systems, fraud detection, and sentiment analysis.
      `,
    }
  ],
},
  {
  id: 6,
  title: "AI Fundamentals",
  description: "Explore core concepts of Artificial Intelligence.",
  longDescription: `
    Artificial Intelligence (AI) focuses on building systems capable of performing tasks that normally 
    require human intelligence. This includes pattern recognition, decision-making, language processing, 
    and even problem-solving. AI powers applications we use daily, such as search engines, chatbots, 
    recommendation systems, and smart assistants.

    This course provides a strong foundation in AI concepts, types of AI systems, and ethical considerations. 
    By the end, you will understand how AI models are designed, how they learn from data, and how AI impacts 
    different industries.
  `,
  lessons: [
    {
      id: 14,
      title: "What is AI?",
      content: `
        This lesson introduces the core idea of Artificial Intelligence — enabling machines to think and 
        act like humans. You will learn the difference between narrow AI (designed for specific tasks) and 
        general AI (a theoretical system capable of human-level intelligence). You will also explore fields 
        within AI, such as machine learning, deep learning, and natural language processing.

        The lesson further explains how AI uses mathematical models, algorithms, and large datasets to solve 
        real-world problems. By the end, you will have a clear understanding of what AI can and cannot do, 
        along with how it continues to evolve.
      `,
    },
    {
      id: 15,
      title: "AI Applications",
      content: `
        AI is used today in almost every industry. In this lesson, you will explore real-life applications 
        such as recommendation systems (Netflix, YouTube), voice assistants (Alexa, Siri), self-driving cars, 
        medical diagnosis tools, chatbots, and financial fraud detection. These examples show how AI analyzes 
        patterns and makes decisions faster and more accurately than traditional methods.

        You will also learn how companies use AI to automate tasks, enhance customer experiences, improve 
        productivity, and reduce operational costs. By the end of this lesson, you’ll understand why AI is 
        considered one of the most important technologies shaping the future.
      `,
    },
    {
      id: 16,
      title: "Ethics of AI",
      content: `
        As AI becomes more powerful, ethical concerns become extremely important. This lesson covers topics 
        such as privacy, algorithmic bias, transparency, and fairness. You will learn how AI models can 
        unintentionally discriminate if trained on biased data, and why responsible AI development is crucial.

        You will also understand global AI regulations, responsible model deployment, and how organizations 
        ensure ethical use of AI. By the end of this lesson, you will appreciate the need for human oversight 
        and ethical standards in AI-driven systems.
      `,
    }
  ],
},
,
  {
  id: 7,
  title: "React Development",
  description: "Become productive with React JS.",
  longDescription: `
    React is a modern JavaScript library used to build fast, interactive, and dynamic user interfaces. 
    It focuses on creating reusable components that handle their own logic and state. React powers many 
    of today’s major applications, including Facebook, Instagram, WhatsApp Web, and Airbnb.

    In this course, you will learn the core foundations of React, including JSX, components, props, hooks, 
    and state management. By the end, you will be able to create fully functional React applications and 
    understand how modern frontend development works.
  `,
  lessons: [
    {
      id: 17,
      title: "React Intro",
      content: `
        This lesson explains why React is one of the most popular frontend libraries today. You will learn 
        how React uses a virtual DOM to efficiently update the UI and how component-based architecture makes 
        applications easier to build, maintain, and scale. You will also explore JSX, a unique syntax that 
        lets you write HTML directly inside JavaScript.

        By the end of this lesson, you will understand how React renders UI, how components manage data, and 
        how React differs from traditional DOM manipulation approaches. You’ll be ready for more advanced 
        concepts like props, hooks, and state.
      `,
    },
    {
      id: 18,
      title: "Components & Props",
      content: `
        Components are the building blocks of every React application. This lesson teaches you the difference 
        between functional and class components, how to structure them, and how data flows between them using 
        props (properties). Props allow parent components to pass information to child components, enabling 
        dynamic and reusable UI structures.

        You will also learn best practices for organizing components, naming props, and building modular UIs. 
        By the end of this lesson, you will be able to create reusable components and manage data across them 
        effectively.
      `,
    },
    {
      id: 19,
      title: "Hooks",
      content: `
        Hooks allow functional components to manage state and side effects. In this lesson, you will explore 
        essential hooks like useState, useEffect, and useRef. You will learn how useState manages component-level 
        data, how useEffect handles side effects (like API calls), and how useRef accesses DOM elements or stores 
        values across renders.

        You will also learn why hooks replaced class components for most use cases and how they simplify both logic 
        and readability. By the end of this lesson, you will confidently use hooks to build dynamic and responsive 
        React applications.
      `,
    },
    {
      id: 20,
      title: "State Management",
      content: `
        State management becomes essential as applications grow. This lesson explains local state, global state, 
        context API, and when to use external libraries like Redux or Zustand. You will learn how to share state 
        across components, avoid prop drilling, and manage complex data flows.

        You will also explore real-world examples where state management becomes challenging and how React tools 
        help solve these problems efficiently. By the end, you will be equipped to build scalable applications 
        with clean and predictable state structures.
      `,
    },
  ],
},
{
  id: 8,
  title: "SQL and Databases",
  description: "Understand databases and writing SQL.",
  longDescription: `
    SQL (Structured Query Language) is the standard language used to manage and query relational databases. 
    Databases store information for applications, websites, financial systems, social media platforms, 
    and almost every digital service today. Learning SQL is essential for backend development, data analysis, 
    and modern software engineering.

    This course teaches you how SQL works, how to structure relational data, and how to write efficient queries. 
    By the end of this course, you will be comfortable interacting with databases and extracting meaningful 
    insights using SQL commands.
  `,
  lessons: [
    {
      id: 21,
      title: "Intro to Databases",
      content: `
        This lesson introduces you to what databases are and why they are essential in modern applications. 
        You will understand the difference between relational and non-relational databases, primary keys, 
        foreign keys, tables, rows, and columns. These concepts form the backbone of structured data storage.

        You will also learn how database management systems (DBMS) like MySQL, PostgreSQL, and Oracle store 
        data efficiently and support large-scale applications. By the end of this lesson, you will understand 
        how data is logically organized and retrieved in real-world systems.
      `,
    },
    {
      id: 22,
      title: "Basic SQL Queries",
      content: `
        In this lesson, you will learn how to write essential SQL commands such as SELECT, INSERT, UPDATE, 
        and DELETE. You will explore how to filter data using WHERE, sort results with ORDER BY, and limit 
        output using LIMIT. These commands form the building blocks of SQL and are used in almost every 
        database operation.

        Through examples, you will also learn how to search text, handle numeric comparisons, and extract 
        specific datasets. By the end of this lesson, you will be comfortable writing basic queries and 
        interacting with any SQL database.
      `,
    },
    {
      id: 23,
      title: "Joins & Relationships",
      content: `
        Joins allow you to combine data from multiple tables. In this lesson, you will learn INNER JOIN, 
        LEFT JOIN, RIGHT JOIN, and FULL JOIN — each used to retrieve related data efficiently. You will also 
        understand one-to-one, one-to-many, and many-to-many relationships in relational databases.

        You will work through practical examples that show how tables connect using foreign keys and how joins 
        help pull meaningful insights that would be impossible from a single table alone. By the end, you will 
        have a clear understanding of relational data structures and advanced SQL operations.
      `,
    },
  ],
},
];
