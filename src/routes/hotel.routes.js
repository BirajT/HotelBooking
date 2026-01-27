import express from "express"
import { create, getAll, getByID, remove, update } from "../controllers/hotel.controller.js"
import { uploadFile } from '../middlewares/multer.middleware.js';
import { authenticate } from "../middlewares/authenticate.middleware.js"
import { USER_ROLE } from "../constants/enums.constants.js"


const router=express.Router()

const upload = uploadFile()

router.get('/getAll',getAll)
router.get('/:id',getByID)
router.post('/create',authenticate([USER_ROLE.ADMIN]),upload.single("hotel_images"),create)
router.put('/update/:id',authenticate([USER_ROLE.ADMIN]),upload.single("hotel_images"),update)
router.delete('/remove/:id',authenticate([USER_ROLE.ADMIN]),remove)

export default router