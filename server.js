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
app.put('/dashboard/rateBook', (req, res) => {
    Book
        .update(
            {title: req.body.put.bookTitle},
            {rating2: req.body.put.bookRating}
        )
        .then(book => res.json(book));
})

//Edit book
app.put('/dashboard/editBook', (req, res) => {
    Book
        .updateOne(
            {title: req.body.put.bookTitle},
            {
                title: req.body.put.bookNewTitle,
                author: req.body.put.bookNewAuthor,
                description: req.body.put.bookNewDesc,
                category: req.body.put.bookNewCategory
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
    console.log(req.body.put);
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
        author: req.body.post.author,
        rating1: '0',
        rating2: '0',
        description: req.body.post.description,
        category: req.body.post.category
    });
    newBook
        .save()
        .then(book => res.json(book));
});

app.listen(port, () => console.log(`Server running on port ${port}.`));
