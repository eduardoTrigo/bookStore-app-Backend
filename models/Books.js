const { Schema, model } = require("mongoose");

const booksSchema = new Schema({
    title: {},
    description: {},
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' }
})

const Books = model('Books', booksSchema)

module.exports = { Books }