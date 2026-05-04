// we will use zod as schema
import { z } from 'zod'


// z.object: object of zod
export const UserRegisterSchema = z.object({
    // we need the body from the object
    body: z.object({                    // ← Added z.object( ) here
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        fullName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        profileImage: z.string(),
        bio: z.string(),
        password: z.string(),
        username: z.string()
    }),
})
export const UserLoginSchema = z.object({
    // we need the body from the object
    body: z.object({                    // ← Added z.object( ) here
        email: z.string().email(),
        password: z.string()
    }),
})

export type UserRegisterInput = z.infer<typeof UserRegisterSchema>['body']
export type UserLoginInput = z.infer<typeof UserLoginSchema>['body']