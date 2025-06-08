const { z } = require("zod");

const registerSchema = z.object({
    userName: z.string({
        required_error: "Username is required"
        }),
    email: z.string({
        required_error: "Email is required"
        })
        .email({
            message: "invalid email"
        }),
    password: z.string({
            required_error: "password is required",
        })
        .min(6, { 
            message: "Password must be at least 6 characters"
        })
})

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
        })
        .email({
            message: "Invalid email"
        }),
    password: z.string({
        required_error: "Password is required"
        })
        .min(6,{
        message: "Password must be at least 6 characters"
        })
})

module.exports = {
    registerSchema,
    loginSchema
}