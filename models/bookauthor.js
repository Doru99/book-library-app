const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref:'book',
        required:true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref:'author',
        required:true
    }
})

BookAuthor = mongoose.model("bookauthor", BookAuthor);
module.exports = BookAuthor;