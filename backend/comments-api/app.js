// Requirements to run application
const express = require('express');
const app = express();
const port = 3030;

// Empty comments object instantiated for storage
comments = {}

// Basic Home Page
app.get('/', (req, res) => res.send('Hello World!'));

// Recieve comments from client
app.post('/comments/', (req, res) => {
    console.log('req.body', req.body);
    res.send('got your shit');
})

// Recieve shootId and hand out associated comments
app.get('/comments/', (req, res) => {
    if (req.query.shootId) {
        shootId = req.query.shootId;
        console.log('req.query.shootId', shootId);
        res.send(`You queried ${shootId}`);
        comments = checkForComments(shootId)
        if (comments) {
            res.send(`These are the comments for shootId: ${shootId} ${comments}`)
        } else {
            res.send(`There are no comments for your shootId: ${shootId}`)
        }
    } else {
        res.send('Send in a shootId as a query please')
    }
})

// Function to check for comments associated with shootId
let checkForComments = shootId => {

}


// Instantiate the app
app.listen(port, () => console.log(`Comments-api listening on port ${port}!`));
