const { default: mongoose } = require('mongoose')
const z = require('zod')

const validateDataBook = z.object({
    title: z.string({
        required_error: "title is required",
    })
        .min(3, { message: "title must be at least 3 characters" })
        .max(20, { message: "The title must have a maximum of 20 characters" }),
    description: z.string().optional(),
    authorId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "Author ID must be a valid Mongo ObjectId"
    }),
    price: z.number().min(0).default(0),
    stock: z.number().min(0).default(0),
    available: z.boolean().default(false),
})

const updateBookSchema = z
.object({
    title: z.string().min(1, 'title is required').optional(),
    description: z.string().min(1, 'description is required').optional(),
    authorId: z.string().length(24, 'Invalid authorId').optional()
})
.refine((data)=> Object.keys(data).length > 0,{
    message: 'At least one field must be provided for update',
})


module.exports = { validateDataBook , updateBookSchema }