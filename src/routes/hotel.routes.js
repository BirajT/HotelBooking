import express from "express"
import { create, getAll, getByID, remove, update } from "../controllers/hotel.controller.js"
import { uploadFile } from '../middlewares/multer.middleware.js';


const router=express.Router()

const upload = uploadFile()

router.get('/getAll',getAll)
router.get('/:id',getByID)
router.post('/create',upload.single("hotel_images"),create)
router.put('/update/:id' ,upload.single("hotel_images"),update)
router.delete('remove',remove)

export default router