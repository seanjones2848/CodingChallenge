// Requirements to run application
const express = require('express');
const app = express();
const port = 3030;

// JSON parser for injesting JSON comments
let bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: false }));

// Empty comments list instantiated for storage
comments = []

// Basic Home Page
app.get('/', (req, res) => res.send('This is a Comment API, please send requests to /comments'));

// Recieve comments from client
app.post('/comments/', (req, res) => {
    body = req.body
    console.log('req.body', req.body);
    if (ValidateComment(body)) {
        comments.push(body);
        res.statusCode = 201;
        res.send(`successfully added comment`)
        console.log('successfully added comment')
    } else {
        res.statusCode = 400;
        res.send('comment failed validation')
        console.log('comment failed validation')
    }
})

// Validation function checking for valid data in request body
// Checks for length 10-100 latin chars, numerical shootId, and existance of parameters
let ValidateComment = body => {
    shootId = body.shootId;
    comment = body.comment;
    if (!shootId | !comment) {
        console.log('failed existance check');
        return 0;
    } else {
        if (!parseInt(shootId)) {
            console.log('failed int check for shootId');
            return 0;
        }
        if (comment.length >= 100 || comment.length < 10) {
            console.log('failed comment length check')
            return 0;
        }
        if (!comment.match(/(?:[^a-zA-Z0-9]*[a-zA-Z0-9]){10}/)) {
            console.log('not latin chars')
            return 0;
        }
    }
    return 1;
}

// Recieve shootId and hand out associated comments
app.get('/comments/', (req, res) => {
    if (req.query.shootId) {
        shootId = req.query.shootId;
        console.log('req.query.shootId', shootId);
        returnComments = checkForComments(shootId)
        if (returnComments) {
            res.statusCode = 200;
            res.send(`These are the comments for shootId: ${shootId} ${JSON.stringify(returnComments)}`)
        } else {
            res.statusCode = 404;
            res.send(`There are no comments for your shootId: ${shootId}`)
        }
    } else {
        res.statusCode = 400;
        res.send('Send in a shootId as a query please')
    }
})

// Function to check for comments associated with shootId
// First checks existance of comments, filters comments based on shootId, and checks array
let checkForComments = shootId => {
    if (!comments.length) {
        console.log('no comments exist yet')
        return 0;
    }
    // Filters comments based on shootId then with the map grabs only the comment
    returnComments = comments.filter(comment => comment.shootId == shootId)
        .map(comment => comment.comment)
    if (!returnComments.length) {
        console.log(`no comments matching shootId: ${shootId}`)
        return 0;
    }
    console.log(`returned ${returnComments.length} comments for shootId: ${shootId} : ${returnComments}`)
    return returnComments;
}

// Instantiate the app
app.listen(port, () => console.log(`Comments-api listening on port ${port}!`));
