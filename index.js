const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());

//array to store users
let users = [];

//POST for users to create a user
server.post("/api/users", (req, res) => {
    const userInfo = req.body;
    
    //if post request did not include a name or bio property
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    }

    //generate id for user
    userInfo.id = shortid.generate();

    //push user to the array of users
    users.push(userInfo);

    //send response with user info
    res.status(201).json(userInfo);

})

//GET for return of array of users
server.get('/api/users', (req, res) => {
    res.status(200).json(users);
})

//GET for return of specific user at an id
server.get('/api/users/:id', (req, res) => {
    const userRequested = req.params;

    const foundUser = users.find(user => user.id === userRequested.id);

    if (!foundUser) {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    }
    else {
        res.status(200).json(foundUser);
    }
})

//DELETE a user
server.delete('/api/users/:id', (req, res) => {
    const userRequested = req.params;
    console.log(userRequested.id)
    const foundUser = users.find(user => user.id === userRequested.id);

    console.log(foundUser)
    if (!foundUser) {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    }
    else {

        users = users.filter(user => user !== foundUser);

        res.status(200).json({message: "User has been deleted"});
    }
})

// //PUT to edit a user
// server.put('/api/users/:id', (req, res) => {
//     const userRequested = req.params;
//     const editedUser = req.body;

//     const foundUser = users.find(user => user.id === userRequested.id);

//     if (!foundUser) {
//         res.status(404).json({message: "The user with the specified ID does not exist"})
//     }
//     else if (!editedUser.name || !editedUser.bio) {
//         res.status(400).json({errorMessage: "Please provide name and bio for the user."});
//     }
//     else {
//         //delete the found user, then push the edited user?
//         map over the array, when finding foundUser, return the new version
//     }
// })



const PORT = 5000;
server.listen(PORT, () => 
    console.log(`\n ** API on http://localhost:${PORT} **\n`)
);

