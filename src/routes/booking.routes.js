import express from "express"
import { create, getAll, getById, remove, update } from "../controllers/booking.controller.js"
import { authenticate } from "../middlewares/authenticate.middleware.js"
import { USER_ROLE } from "../constants/enums.constants.js"

const router=express.Router()

router.get('/getAll',authenticate([USER_ROLE.ADMIN]),getAll)
router.get('/:id',authenticate([USER_ROLE.USER,USER_ROLE.ADMIN]),getById)
router.post('/create',authenticate([USER_ROLE.USER,USER_ROLE.ADMIN]),create)
router.put('/:id',authenticate([USER_ROLE.USER,USER_ROLE.ADMIN]),update)
router.delete('/:id',authenticate([USER_ROLE.USER,USER_ROLE.ADMIN]),remove)

export default router