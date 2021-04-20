const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref:'user',
        required:true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    description: {
        type: String
    }
})

Book = mongoose.model("book", BookSchema);
module.exports = Book;