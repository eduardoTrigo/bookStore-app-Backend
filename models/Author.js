const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
    firstName: {type: String, required:true},
    lastName:{type:String, required:true},
},{
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
})

authorSchema.virtual('books',{
    ref:'Books',
    localField: '_id',
    foreignField: 'authorId'
})

const Author = model('Author', authorSchema)

module.exports = Author