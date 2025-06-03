const { Schema, model } = require("mongoose");

const booksSchema = new Schema({
    title: {type: String, required:true, unique:true},
    description: {type: String},
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' }
})

const Books = model('Books', booksSchema)

module.exports = { Books }