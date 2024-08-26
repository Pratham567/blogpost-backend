const { Router } = require('express');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const router = Router();


// apply cookie parser middleware
router.use(cookieParser());

// Signup POST API
router.post('/signup', (req, res) => {
    // 1. Extract the name, email and password from the request body
    const obj = req.body;
    console.log(obj);
    // 2. Create a new user in the database
    User.create(obj)
        .then(user => {
            // 2a. If user is created successfully, create a token,
            // // send it back in response body with status 200
            console.log('User created successfully');
            // Create a token and send it back
            const token = getToken(user.email, user.name);
            // We will not send the token as cookie, as it will be sent in the response body

            // set the token as cookie as well
            res.cookie('authtoken', token);
            res.status(200).send({ email: obj.email, token });
        })
        .catch(err => {
            // 2b. If user creation fails, send an error message with status code 400 (Bad Request)
            console.log(err);
            res.status(400).send({ error: err.message });
        });
});

function getToken(email, name) {
    const secret = "veryComplexSecret";
    const token = jwt.sign({ email, name }, secret, { expiresIn: '7d' });
    return token;
}

// Login POST API
router.post('/login', (req, res) => {
    // 1. Extract the email and password from the request body
    const { email, password } = req.body;
    console.log(req.body);
    // 2. Search for the user in the database
    User.findOne({ email })
        .then(user => {
            if (!user) {
                // If user is not found,
                // send an error message with status code 400 (Bad Request)
                return res.status(400).send({ error: "User not found" });
            }
            else if (user.password !== password) {
                // If password is incorrect,
                // send an error message with status code 400 (Bad Request)
                return res.status(400).send({ error: "Password incorrect" });
            }
            else {
                // If user is found and password is correct, create a token,
                // // send it back in response body with status 200
                console.log('User logged in successfully');
                // Create a token and send it back
                const token = getToken(user.email, user.name);
                // We will not send the token as cookie, as it will be sent in the response body
                // Add token in the response body

                // set the token as cookie as well
                res.cookie('authtoken', token);
                res.status(200).send({ email, token });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send({ error: err.message });
        });
});



module.exports = router;
