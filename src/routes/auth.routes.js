import express from "express"
import { forgotPassword, login, logout, register, changePassword } from "../controllers/auth.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js"
import { USER_ROLE } from "../constants/enums.constants.js"

const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/changePassword', authenticate([USER_ROLE.USER, USER_ROLE.OWNER, USER_ROLE.ADMIN]), changePassword)
router.post('/logout', authenticate, logout)

export default router