const { default: mongoose } = require("mongoose")
const { Order } = require("../models/Order")

const getOrder = async (req, res, next) => {
    const userId = req.user.id
    try {
        const order =await Order.find({user: userId})
        if (!order) return res.status(404).json({ message: "Order active not found" })

        res.status(200)
        res.json(order)
    } catch (error) {
        next(error)
    }
}

const getNewstedOrder = async (req, res, next) => {
    try {
        const userId = req.user.id
        const order = await Order.findOne({ user: userId, status: 'active' }).populate('products.book')

        if (!order) return res.status(404).json({ message: "Order active not found" })

        res.status(200)
        res.json(order)
    } catch (error) {
        next(error)
    }
}

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
        await order.populate('products.book')

        order.total = order.products.reduce((sum, item)=>{
            return sum + (item.book.price * item.quantity)
        },0)

        await order.save()

        res.status(201).json(order)
    } catch (error) {
        next(error)
    }
}

const deleteProductByOrder = async(req, res, next) => {
    const userId = req.user.id
    const { bookId } = req.body

    try {
        const order = await Order.findOne({user: userId, status:'active'}).populate('products.book')
        if ( !order ) return res.status(404).json({message: "order not found"})
        
        const productInOrder = order.products.length

        order.products = order.products.filter(item => item.book._id.toString() !== bookId)

        if (order.products == productInOrder) {
            return res.status(404).json({message: "el producto no se encuemtra en el carrito"})
        }

        order.total = order.products.reduce((sum, item) => {
            return sum + (item.book.price * item.quantity)
        },0)

        await order.save()
        res.status(201).json({message: "producto eliminado correctamente"},order)
    } catch (error) {
        next(error)
    }
}

const buyOrder = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const userId = req.user.id
        const order = await Order.findOne({ user: userId, status: 'active' })
            .populate('products.book')
            .session(session)

        if (!order) {
            throw new Error(`no hay orden activa de este usuario ID ${userId}`)
        }

        for (const item of order.products) {
            const book = item.book
            const quantityPurchased = item.quantity

            if (book.stock < quantityPurchased) {
                throw new Error(`No hay suficiente stock para ${book.name}`)
            }

            book.stock -= quantityPurchased
            await book.save()
        }

        order.status = 'completed'
        await order.save()

        await session.commitTransaction()
        session.endSession()

        res.status(201)
        res.json({ message: "compra realizada con exito" })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

module.exports = { 
    getOrder,
    getNewstedOrder,
    addProductToOrder,
    deleteProductByOrder,
    buyOrder
}