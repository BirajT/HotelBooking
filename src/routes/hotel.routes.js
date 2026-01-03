import express from "express"
import { create, getAll, getByID, remove, update } from "../controllers/hotel.controller.js"

const router=express.Router()

router.get('/getAll',getAll)
router.get('/:id',getByID)
router.post('/create',create)
router.put('/update',update)
router.delete('remove',remove)

export default router