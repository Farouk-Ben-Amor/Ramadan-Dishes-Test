import moment from 'moment'

import {
  getDishes,
  calculateCookTime,
  randomDish,
  findDayPrayerTimes,
  getPrayerFromApi,
  calculateStartDate,
  validateDay
} from '../utils/dishesUtils.js'


  export const getSuggestionsRoutes= async (req, res) => {
    const currentYear = new Date().getFullYear()
    try {
      const day = parseInt(req.query.day)
      const validationMessage = validateDay(day)
      if (validationMessage !== true) {
        return res.status(400).send(validationMessage)
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

      const dishes = getDishes()
      const dish = randomDish(dishes,day)

      res.send({
        name: dish.name,
        ingredients: dish.ingredients,
        cooktime: calculateCookTime(dish, maghribTime, asrTime)
      })
    } catch (error) {
      console.error('Error fetching from dishes.json', error)
      res.status(500).json({ error: 'internal server error ' })
    }
  }
