const z = require('zod')

const validateDataAuthor = z.object({
    firstName: z.string({
        required_error: 'username is required',
        invalid_type_error: 'First name must be a String',
    }).min(1, 'First name cannot be empty'),
    lastName: z.string({
        required_error: 'lastname is required',
        invalid_type_error: 'Last name must be a string'
    }).min(1, 'Last name cannot be empty'),
})

const updateDataAuthor = z
    .object({
        firstName: z.string().min(1, 'First name cannot empty').optional(),
        lastName: z.string().min(1, ' Last name cannot empty').optional()
    })
    .refine((data) => Object.keys(data).length > 0, {
        message:'At least one field must be provided for update',
    })

module.exports = { validateDataAuthor , updateDataAuthor }