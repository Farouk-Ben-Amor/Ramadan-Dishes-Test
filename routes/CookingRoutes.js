import express from 'express'
const router = express.Router()
import cookingController from '../controllers/CookingControllers.js'

router.get('/',cookingController.getCookingRoutes)

export default router