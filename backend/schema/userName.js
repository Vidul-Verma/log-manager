const {z} = require('zod');

const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be max 20 characters"),
})

const loginSchema = z.object({
    name: z.string().min(3),
    password: z.string().min(6).max(20),
})

module.exports = {
    registerSchema,
    loginSchema,
  };