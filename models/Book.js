const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    //0-5
    rating1: {
        type: String,
        default: '0',
    },
    //0-2
    //0 dislike
    //1 neutral
    //2 like
    rating2: {
        type: String,
        default: '0',
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

Book = mongoose.model("book", BookSchema);
module.exports = Book;