const { Schema, model } = require("mongoose");

const itemsCartSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Books'
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
})

const cartSchema = new Schema({
    products: {
        type: [itemsCartSchema],
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled", "expired"],
        default: "active"
    }
})

const Cart = model('Cart', cartSchema)

module.exports = { Cart }