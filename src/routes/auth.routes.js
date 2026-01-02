import express from "express"
import { forgotPassword, login, logout, register, update } from "../controllers/auth.controller"

const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.update('/update',update)
router.post('/forgotPassword',forgotPassword)