const express = require("express");
const router = express.Router();

const User = require("../models/Users");

// Get all users
router.get('/users', (req, res) => {
    User.find({})
        .then(function (users) {
            res.json(users);
        });

});

// Get new user via JSON FormData
router.post('/users', (req, res) => {
    const {
        id,
        name,
        department,
        sem,
    } = req.body;

    const newUser = new User({
        id: id,
        name: name,
        department: department,
        sem: sem,
    });

    newUser.save()
        .then(user => {
            console.log("New user registered successfully");
            res.redirect("/");
        })
        .catch(err => console.log(err));
    
});

// Get user with id 1
router.get('/users/:id', (req, res) => {

    const id = req.params.id;

    User.findOne({
            id: id
        })
        .then(user => {
                if (user) {
                    res.json(user);
                } else {
                    console.log(`User with id: ${id} doesn't exist.`);
                    res.redirect("/");
                }
            }

        )
});

// Update user details with id 1 via JSON FormData
router.put('/users/:id', (req, res) => {

    User.findOneAndUpdate({
        id: req.params.id
    }, {
        $set: {
            id: req.params.id,
            name: req.body.name,
            department: req.body.department,
            sem: req.body.sem
        }
    }, {
        upsert: false
    }, (err) => console.log(err));

    res.redirect("/");
});

// Delete user with id 1
router.delete('/users/:id', (req, res) => {

    User.findOneAndDelete({
        id: req.params.id
    }, (err) => console.log(err));

    res.redirect("/");
});


// ADDITIONAL ROUTES

// Update using HTML form
router.post('/update', (req, res) => {

    const {
        newid,
        newname,
        newdepartment,
        newsem,
    } = req.body;

    User.findOneAndUpdate({
        id: newid
    }, {
        $set: {
            name: newname,
            department: newdepartment,
            sem: newsem
        }
    }, (err) => console.log(err));

    res.redirect("/");
});


module.exports = router;