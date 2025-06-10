const { default: mongoose } = require("mongoose")
const { Order } = require("../models/Order")

const addProductToOrder = async (req, res, next) => {
    const { bookId, quantity } = req.body
    const userId = req.user.id
    try {
        let order = await Order.findOne({ user: userId, status: "active" })

        if (!order) {
            order = new Order({
                user: userId,
                products: [{ book: bookId, quantity }]
            })
        } else {
            const productInOrder = order.products.find(p => p.book.toString() === bookId)

            if (productInOrder) {
                productInOrder.quantity += quantity
            } else {
                order.products.push({ book: bookId, quantity })
            }
        }
        await order.save()

        order.populate('products.book')

        res.status(201).json(order)
    } catch (error) {
        next(error)
    }

}

const getNewstedOrder = async (req, res, next) => {
    try {
        const userId = req.user.id
        const order = await Order.find({ user: userId, status: 'active' }).populate('products.book')

        if (!order) return res.status(404).json({ message: "Order active not found" })

        res.status(200)
        res.json(order)
    } catch (error) {
        next(error)
    }
}

const buyOrder = async( req, res, next)=>{
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const userId = req.user.id
    const order = Order.findOne({User: userId, status: 'active' })
        .populate('products.book')
        .session(session)
    
    if (!order) {
        throw new Error(`no hay orden activa de este usuario ID ${userId}`) 
    }

    for (const item of order.products ) {
        const book = item.book
        const quantityPurchased = item.quantity

        if (book.stock < quantityPurchased) {
            throw new Error (`No hay suficiente stock para ${book.name}`)
        }

        book.stock -= quantityPurchased
        await book.save()
    }

    order.status = 'completed'
    await order.save()

    await session.commitTransaction()
    session.endSession()

    res.status(201)
    res.json({message: "compra realizada con exito"})
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

module.exports = { addProductToOrder, getNewstedOrder, buyOrder }