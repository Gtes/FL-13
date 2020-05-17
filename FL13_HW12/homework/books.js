const data = [{
        'id': 1,
        'title': `Eloquent JavaScript, Second Edition`,
        'author': 'Marijn Haverbeke',
        'image': 'https://eloquentjavascript.net/img/cover.jpg',
        'plot': `JavaScript lies at the heart of almost every modern web application, 
    from social apps to the newest browser-based games. 
    Though simple for beginners to pick up and play with, JavaScript is a flexible, 
    complex language that you can use to build full-scale applications.`
    },
    {
        'id': 2,
        'title': 'Git Pocket Guide',
        'author': 'Richard E. Silverman',
        'image': 'https://images-na.ssl-images-amazon.com/images/I/71f5JPIzrbL.jpg',
        'plot': `This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. 
    It provides a compact, readable introduction to Git for new users, 
    as well as a reference to common commands and procedures for those of you with Git experience.`
    },
    {
        'id': 3,
        'title': 'Understanding ECMAScript 6',
        'author': 'Nicholas C. Zakas',
        'image': 'https://images-na.ssl-images-amazon.com/images/I/512T%2Bd%2BVK6L._SX376_BO1,204,203,200_.jpg',
        'plot': `ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. 
    In Understanding ECMAScript 6, 
    expert developer Nicholas C. Zakas provides a complete guide to the object types, 
    syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.`
    }
];


localStorage.getItem('books') ? '' : localStorage.setItem('books', JSON.stringify(data));