import express from 'express'
import { signUpController, userLoginController } from '../controllers'
import { validatorSchema } from '../utils'
import { UserLoginSchema, UserRegisterSchema } from '../schema'
import { asyncHandler } from '../core/async-handler'

const router = express.Router()
// in postman , /auth/register
// as we used asyncHandler, we dont have to use try catch
// if we leave register, we will go to the next, the login
router
.post('/register',validatorSchema(UserRegisterSchema), asyncHandler(signUpController))
.post('/logIn',validatorSchema(UserLoginSchema), userLoginController)

export default router 