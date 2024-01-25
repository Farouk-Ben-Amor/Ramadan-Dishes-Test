import express from 'express'
import cors from 'cors'
import cookingController from './controllers/CookingControllers.js'
import suggestionsControllers from './controllers/SuggestionsControllers.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/cooktime',cookingController.getCookingRoutes)
app.use('/suggest',suggestionsControllers.getSuggestionsRoutes)

const PORT = 3000
app.listen(PORT, ()=> console.log(`Ramadan App is running on port ${PORT}`) )