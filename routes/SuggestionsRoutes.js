import express from 'express'
const router = express.Router()
import suggestionsControllers from '../controllers/SuggestionsControllers.js'

router.get('/',suggestionsControllers.getSuggestionsRoutes)

export default router