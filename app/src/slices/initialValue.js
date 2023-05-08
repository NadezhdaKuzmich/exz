export const initialValue = {
  boards: [
    {
      id: "vMEE617FyTOuyUya5x57F",
      name: "Example",
      isActive: true,
      columns: [
        {
          id: "ljl7ZqUsmJ1l47FYx_HGW",
          name: "todo",
          tasks: [
            {
              id: "7gZZ320CjrlYjQCrJd8Im",
              title: "Learn TypeScript",
              date: new Date(2023, 3, 24, 10, 15, 32).toString(),
              description:
                'TypeScript (TS, TScript or "typescript") is a web development programming language based on JavaScript. Makes the code more understandable and reliable, adds static typing (variables are bound to certain data types), and can also compile to JavaScript. TypeScript is used by front-end and back-end developers.',
              status: "todo",
              limit: new Date(2023, 4, 31, 16, 15, 32).toString(),
              visible: true,
            },
            {
              id: "7h3D0e7OS3E-9jgobYmVB",
              title: "Learn MongoDB",
              date: new Date(2023, 4, 1, 16, 45, 11).toString(),
              description:
                "MongoDB is a document-oriented database management system that does not require a description of the table schema. Considered one of the classic examples of NoSQL systems, it uses JSON-like documents and a database schema. Written in C++.",
              status: "todo",
              limit: new Date(2023, 4, 1, 16, 15, 32).toString(),
              visible: true,
            },
          ],
        },
        {
          id: "XKUqx1xuCBrVMf7YToAjD",
          name: "in progress",
          tasks: [
            {
              id: "zdeTd0Fw8ei06OSNJkC7B",
              title: "Learn React",
              date: new Date(2023, 2, 14, 11, 12, 28).toString(),
              description:
                "At this point, once you've learned the basics of JavaScript, it's time to dive into React. You can get started learning React by browsing the official React documentation or using the official React tutorial.\nThe React docs are very well written and cover the basics of React. Learn these topics very well to understand React fundamentally.",
              status: "in progress",
              limit: new Date(2023, 4, 31, 16, 15, 32).toString(),
              visible: true,
            },
            {
              id: "dBcXuOO4F7auV5H4qgh7g",
              title: "Learn React Router",
              date: new Date(2023, 2, 24, 14, 17, 52).toString(),
              description:
                "Learn about the React router. React router is a routing library for React that will help you navigate through different pages in your application. Learn about loading the content of a particular page, passing parameters in a URL, redirecting, etc. Also, understand that the router is not part of React, it is a routing library built for React.",
              status: "in progress",
              limit: new Date(2023, 4, 31, 18, 12, 12).toString(),
              visible: true,
            },
            {
              id: "LctGSjEUg_viREF82WMGx",
              title: "Learn Redux",
              date: new Date(2023, 3, 4, 15, 14, 42).toString(),
              description:
                'Redux is an independent library that can be used with any UI logic or framework, including React, Angular, Vue, Ember, and vanilla JS. Despite the frequent use of Redux and React together, they are independent.\nUsing Redux with any platform usually involves a "UI binding" library to communicate between Redux and that platform, rather than directly interacting with the Redux store from the UI code.',
              status: "in progress",
              limit: new Date(2023, 4, 31, 16, 15, 32).toString(),
              visible: true,
            },
          ],
        },
        {
          id: "IFS1yEwW8c0A5RLpPCWYj",
          name: "done",
          tasks: [
            {
              id: "llQwMtz_Ya9HeLyQM2NYz",
              title: "Learn HTML",
              date: new Date(2023, 0, 4, 19, 32, 52).toString(),
              description:
                "You must learn basic tags and attributes, understand the anatomy of HTML markup, and be aware of accessibility and SEO fundamentals. \nThe decision about HTML5 is the fifth version, which is found in the requirements of every first job. HTML doesn't evolve quickly, so you'll have a big advantage if you already know the markup language.",
              status: "done",
              limit: new Date(2023, 4, 31, 16, 15, 32).toString(),
              visible: true,
            },
            {
              id: "lD5dLtjNTRWOcXg3azbvy",
              title: "Learn CSS",
              date: new Date(2023, 0, 14, 21, 25, 22).toString(),
              description:
                "It's also important to learn how to style elements with CSS and do it the right way, like reusing styles for the same elements. \nFirst, master the box model and content positioning—the layout, alignment, and centering of elements, as well as their visibility. Read about responsive and responsive design. \nNext, move on to media queries to take into account the technical parameters of various devices. A good bonus will be the ability to work with CSS Grid and Flexbox. Then deepen your knowledge by studying architecture and preprocessors.",
              status: "done",
              limit: new Date(2023, 4, 31, 16, 15, 32).toString(),
              visible: true,
            },
            {
              id: "Ajq96k9ivr98TxMwxRYbC",
              title: "Learn CSS preprocessors",
              date: new Date(2023, 0, 24, 17, 35, 10).toString(),
              description:
                "A CSS preprocessor is a program that has its own syntax but can generate CSS code from it. The most popular are SASS, Stylus, LESS and PostCSS, however, SASS has the largest community. Preprocessors are for:\n1. Speeding up the process of writing code;\n2. Simplification of code reading and its further support;\n3. Minimizing routine work when writing code.",
              status: "done",
              limit: new Date(2023, 4, 31, 16, 15, 32).toString(),
              visible: true,
            },
            {
              id: "nZAm2UUdV_nQBI-baZH62",
              title: "Learn JavaScript",
              date: new Date(2023, 1, 28, 14, 55, 19).toString(),
              description:
                "It is important to master the DOM, the interface for working with HTTP requests and Fetch API responses, AJAX technology and XMLHttpRequest, ECMAScript 6+, modular approach and web components. \nAlso go over the concepts listed, like strict mode and shadow DOM.",
              status: "done",
              limit: new Date(2023, 4, 31, 16, 15, 32).toString(),
              visible: true,
            },
          ],
        },
        {
          id: "ljl7ZqUsmJ1347FYx_HGW",
          name: "overdue",
          tasks: [],
        },
      ],
    },
  ],
};
