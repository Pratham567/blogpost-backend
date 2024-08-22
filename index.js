const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogpostRoutes = require('./routes/blogRoutes');

// CONSTANTS
const USER_NAME = 'mitUser';
const PASSWORD = 'mitPassword';
const DB_NAME = 'merndb'; // TODO: Change this to your database name
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.xtjdu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernMongoose`;
const PORT = 3040;

// express app
const app = express();
// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(DB_URI)
    .then((result) => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1); // Exit the process with a failure code
    });



app.get('/', (req, res) => {
    res.send({ message: 'Blogpost API' });
});

// blog routes
app.use('/blogs', blogpostRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).send({ error: '404: Page not found' });
});
