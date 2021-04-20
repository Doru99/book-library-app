const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const router = express.Router();
const app = express();

//Load User model
const User = require('./models/User');

// Specify port
const port = 5000;

app.use(cors());

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log("Connected successfully"))
    .catch(err => console.log(err));    

//Register Handler
app.post('/register', (req, res) => {
    //Deconstruct post
    const {name, surname, email, password, password2} = req.body.post;
    console.log(req.body);
    var errors = [];
    //Check for empty fields
    if (!name ||!surname || !email || !password || !password2) {
        errors.push({errmsg: 'Please complete all fields'});
    }

    //Check passwords match
    if (password !== password2) {
        errors.push({errmsg: 'Passwords do not match'});
    }

    //Check validation
    if (errors.length > 0) {
        console.log(errors);
    } else {
        console.log("Successful validation");
        //Check if User already exists
        User.findOne({ email: email}).then(user => {
            if (user) {
              return res.status(400).json({ email: "Email already exists" });
            } else {
                //Save user
                const newUser = new User({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
              });

              //Hash password
                bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

//Login Handler
app.post('/login', (req, res) => {
    const {email, password} = req.body.post;
    console.log(req.body);
    User.findOne({ email}).then( user => {
        //Email match
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        //Password match
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                console.log("Successful authentication");
            }
            else {
                console.log("Failed authentication");
            }
        })
    })
});

app.listen(port, () => console.log(`Server running on port ${port}.`));
