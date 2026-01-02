import express from "express"
import { create, getAll, getById, remove, update } from "../controllers/booking.controller"

const router=express.Router()

router.get('/getAll',getAll)
router.get('/:id',getById)
router.post('/create',create)
router.post('/update',update)
router.delete('/remove',remove)
