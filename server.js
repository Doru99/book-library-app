const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const passport = require("passport");
const router = express.Router();
const app = express();

//Load models
const User = require('./models/User');
const Book = require('./models/Book');

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

//Authorization
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("You do not have a token")
    } else {
        jwt.verify(token, require("./config/keys").secretOrKey, (err, decoded) => {
            if (err) {
                res.json({auth: false, message:"Failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

//Routes
app.put('/dashboard/editBook', (req, res) => {
    Book
        .updateOne(
            {title: req.body.put.oldtitle},
            {
                title: req.body.put.title,
                description: req.body.put.description
            }
        )
        .then(book => res.json(book))
})

app.put('/dashboard/deleteBook', (req, res) => {
    Book
        .deleteOne({title: req.body.put.title})
        .then(res.json({deleted: true}));
})

app.put('/dashboard/likeBook', (req, res) => {
    //Update book rating1 + 1
    Book
        .update(
            {title: req.body.put.title},
            {rating1: '1'}
        )
        .then(book => res.json(book));
})

app.put('/dashboard/neutralBook', (req, res) => {
    //Update book rating1 0
    Book
        .update(
            {title: req.body.put.title},
            {rating1: '0'}
        )
        .then(book => res.json(book));
})

app.put('/dashboard/dislikeBook', (req, res) => {
    //Update book rating1 -1
    Book
        .update(
            {title: req.body.put.title},
            {rating1: '-1'}
        )
        .then(book => res.json(book));
})

app.get('/dashboard', (req, res) => {
    books = Book.find({}, function(err, result) {
        res.send({express: result});
    });
});

app.post('/dashboard/addBook', (req, res) => {
    //Save book
    const newBook = new Book({
        title: req.body.post.title,
        rating1: '0',
        rating2: '0',
        description: req.body.post.description
    });
    newBook
        .save()
        .then(book => res.json(book));
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


//Register Handler
app.post('/register', (req, res) => {
    //Deconstruct post
    const {name, surname, email, password, password2} = req.body.post;
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
    User.findOne({ email }).then( user => {
        //Email match
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        //Password match
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                console.log("Successful authentication");
                //JWT
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //Create login token
                jwt.sign(
                    payload,
                    require("./config/keys").secretOrKey,
                    {
                        expiresIn: 31556926 //1 year in secs
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                        res.cookie('token', jwt);
                    }
                );
            }
            else {
                console.log("Failed authentication");
            }
        })
    })
});

app.listen(port, () => console.log(`Server running on port ${port}.`));
