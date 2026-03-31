import express from 'express'
import { signUpController } from '../controllers'
import { validatorSchema } from '../utils'
import { UserRegisterSchema } from '../schema'

const router = express.Router()

router.post('/',validatorSchema(UserRegisterSchema), signUpController)

export default router 