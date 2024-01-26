import express from 'express'
import cors from 'cors'
import { getCookingRoutes } from './controllers/CookingControllers.js'
import { getSuggestionsRoutes } from './controllers/SuggestionsControllers.js'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/cooktime', getCookingRoutes)
app.use('/suggest', getSuggestionsRoutes)


const PORT = 3000

app.listen(PORT, () => console.log(`Ramadan App is running on port ${PORT}`))
