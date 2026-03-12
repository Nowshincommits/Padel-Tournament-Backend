import express from 'express'
import { signUpController } from '../controllers'

const router = express.Router()

router.post('/',signUpController)

export default router