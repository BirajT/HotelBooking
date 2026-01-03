import express from "express"
import { create, getAll, getById, remove, update } from "../controllers/booking.controller.js"

const router=express.Router()

router.get('/getAll',getAll)
router.get('/:id',getById)
router.post('/create',create)
router.put('/update',update)
router.delete('/remove',remove)

export default router