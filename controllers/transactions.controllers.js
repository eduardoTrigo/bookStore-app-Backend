const { default: mongoose } = require("mongoose")
const { Order } = require("../models/Order")
const { errorResponse, successResponse } = require("../utils/response")

const getOrder = async (req, res, next) => {
    const userId = req.user.id
    try {
        const order = await Order.find({ user: userId })
        if (!order) return errorResponse(res, "Orden Activa No Encontrada", 404)

        return successResponse(res, order, 'Ordenes obtenidas correctamente')
    } catch (error) {
        next(error)
    }
}

const getNewstedOrder = async (req, res, next) => {
    try {
        const userId = req.user.id
        const order = await Order.findOne({ user: userId, status: 'active' }).populate('products.book')

        if (!order) return errorResponse(res, "Orden Activa No Encontrada", 404)

        return successResponse(res, order, 'Orden activa obtenida correctamente')
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

        order.total = order.products.reduce((sum, item) => {
            return sum + (item.book.price * item.quantity)
        }, 0)

        await order.save()

        return successResponse(res, order, 'Producto agregado al carrito', 201)
    } catch (error) {
        next(error)
    }
}

const deleteProductByOrder = async (req, res, next) => {
    const userId = req.user.id
    const { bookId } = req.body

    try {
        const order = await Order.findOne({ user: userId, status: 'active' }).populate('products.book')
        if (!order) return errorResponse(res, "Orden No Encontrada", 404)

        const productInOrder = order.products.length

        order.products = order.products.filter(item => item.book._id.toString() !== bookId)

        if (order.products == productInOrder) {
            return errorResponse(res, "El producto no se encuentra en el carrito", 404)
        }

        order.total = order.products.reduce((sum, item) => {
            return sum + (item.book.price * item.quantity)
        }, 0)

        await order.save()
        return successResponse(res, order, 'Producto eliminado correctamente', 200)
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

        return successResponse(res, order, 'Compra realizada con éxito', 201)
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