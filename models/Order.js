const { Schema, model } = require("mongoose");

const itemsOrderSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Books'
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
        max: 100
    }
})

const orderSchema = new Schema({
    products: {
        type: [itemsOrderSchema],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled", "expired"],
        default: "active"
    },
    total: {
        type: Number,
        default: 0,
        min: 0
    }
},{
    timestamps: true
})

const Order = model('Order', orderSchema)

module.exports = { Order }