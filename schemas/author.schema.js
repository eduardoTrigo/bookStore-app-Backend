const z = require('zod')

const validateDataAuthor = z.object({
    firstName: z.string({
        required_error: "username is required",
    }),
    lastName: z.string({
        required_error: "lastname is required"
    })
})

module.exports = validateDataAuthor