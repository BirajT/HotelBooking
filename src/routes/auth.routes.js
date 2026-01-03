import express from "express"
import { forgotPassword, login, logout, register, update } from "../controllers/auth.controller.js"

const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.put('/update',update)
router.post('/forgotPassword',forgotPassword)

export default router