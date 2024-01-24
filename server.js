import express from 'express'
import cors from 'cors'
import CookingRoutes from './routes/CookingRoutes.js'
import SuggestionsRoutes from './routes/SuggestionsRoutes.js'
//import PrayersRoutes from './routes/PrayersRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/cooktime',CookingRoutes)
app.use('/suggest',SuggestionsRoutes)
//app.use('/',PrayersRoutes)

const PORT = 3000
app.listen(PORT, ()=> console.log(`Ramadan App is running on port ${PORT}`) )