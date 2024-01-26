import moment from 'moment'

import {
  getDishes,
  calculateCookTime,
  findDayPrayerTimes,
  getPrayerFromApi,
  calculateStartDate,
  validateDay,
  validateIngredient
} from '../utils/dishesUtils.js'

  export const getCookingRoutes = async (req, res) => {

    const currentYear = new Date().getFullYear()
    try {
      const dishes = getDishes()
      const day = parseInt(req.query.day)
      
      const validationDayMessage = validateDay(day)
      if (validationDayMessage !== true) {
        return res.status(400).send(validationDayMessage)
      }
      
      const ingredient = req.query.ingredient

      const validationIngredientMessage = validateIngredient(ingredient, dishes)
      if (validationIngredientMessage !== true) {
        return res.status(400).send(validationIngredientMessage)
      }

      const StartDate = calculateStartDate(day)
      const ramadanMonth = StartDate.month() + 1

      const URL = `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${ramadanMonth}?city=Makkah&country=Saudi Arabia&method=1`

      const prayerTimes = await getPrayerFromApi(URL)

      const dayPrayerTimes = findDayPrayerTimes(prayerTimes, StartDate)

      if (!dayPrayerTimes) {
        return res
          .status(400)
          .send('No prayer times found for the specified day.')
      }

      const asrTime = moment(dayPrayerTimes.timings.Asr, 'HH:mm')
      const maghribTime = moment(dayPrayerTimes.timings.Maghrib, 'HH:mm')

      // dish is imported above to verify the ingredient existance : const dishes = getDishes();
      const filteredDishes = dishes.filter((dish) =>
        dish.ingredients.includes(ingredient)
      )

      const dishesWithCooktime = filteredDishes.map((dish) => ({
        ...dish,
        cooktime: calculateCookTime(dish, maghribTime, asrTime),
        duration: undefined
      })) 
      res.send(dishesWithCooktime)
    } catch (error) {
      console.error('Error fetching from dishes.json', error)
      res.status(500).json({ error: 'internal server error ' })
    }
  }