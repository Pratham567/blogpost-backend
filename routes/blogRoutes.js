const express = require('express');
const BlogPost = require('../models/blogpost');

const router = express.Router();

// // blog routes

// GET request to view all blogs
router.get('/', (req, res) => {
    // fetch all the blogs from the database
    // send the blogs as a response
    BlogPost.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: 'An error occurred while fetching the blogs' });
        });
});

// New route to view a single blog post
router.get('/:id', (req, res) => {
    const id = req.params.id;
    BlogPost.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send({ error: 'Blog not found' });
        });
});

// POST request to create a new blog
router.post('/', (req, res) => {
    // create a new blog in the database
    // send the newly created blog as a response
    const blog = new BlogPost(req.body);
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ error: 'An error occurred while creating the blog' });
        });
});

// DELETE request to delete a blog
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    BlogPost.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send({ error: 'Blog not found' });
        });
});

module.exports = router;



































// // 1. Read the cookie
// // 2. Verify the token
// // 2a. If token is valid, call next()
// // 2b. If token is invalid, redirect to login page
// router.use(cookieParser());
// function authRequired(req, res, next) {
//     const token = req.cookies.authtoken;
//     const secret = 'veryComplexSecret';
//     // Check if token exists
//     if (token) {
//         jwt.verify(token, secret, (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.redirect('/auth/login');
//             } else {
//                 console.log(decodedToken);
//                 next();
//             }
//         });
//     } else {
//         res.redirect('/auth/login');
//     }
// }

// router.use(authRequired);




// function authRequired(req, res, next) {
//     const user = res.locals.user;
//     if (user) {
//         // User is logged in
//         next();
//     } else {
//         // User is not logged in
//         res.status(401).redirect('/auth/login');
//     }
// }

// router.use(authRequired);