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
/*
i tried to fetch with this api but it have timestamp changing randomly each day , so i used dishes.json file to fetch instead
const URL = 'https://file.notion.so/f/f/29f0d547-e67d-414a-aece-c8e4f886f341/7c1daa75-3bea-4684-bf17-be07a0800452/dishes.json?id=bcc24a10-cc7d-4db2-8c82-f61773c06fc7&table=block&spaceId=29f0d547-e67d-414a-aece-c8e4f886f341&expirationTimestamp=1706191200000&signature=VVtEt3NHmIQdSoEFKHofeOgQd6sm96_x-4WhJq-fSps&downloadName=dishes.json'
const result = await fetch(URL)
    if (!result.ok) {
        throw new Error('Failed to fetch the data')
    }
*/
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const cookingController = {
  getCookingRoutes: async (req, res) => {
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
      const formattedDate = `-----> Today is ${StartDate.format(
        'MM/DD'
      )} , The day ${day} of ramadan `
      const ramadanMonth = StartDate.month() + 1

      const URL = `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${ramadanMonth}?city=Makkah&country=Saudi Arabia&method=1`

      const prayerTimes = await getPrayerFromApi(URL)
      console.log(prayerTimes)

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

      res.send({
        dishes: dishesWithCooktime,
        // I added them optional to verify that the prayer times are updating properly based on the day that the user entered in query param
        prayerTimes: `-----> Asr prayer time in Makkah: ${asrTime.format(
          'HH:mm'
        )}, Maghrib prayer time in Makkah: ${maghribTime.format('HH:mm')}`,
        dayOfRamadan: formattedDate
      })
      // to display the data simply inside an array : res.send(dishesWithCooktime)
    } catch (error) {
      console.error('Error fetching from dishes.json', error)
      res.status(500).json({ error: 'internal server error ' })
    }
  }
}
export default cookingController
