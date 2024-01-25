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

/*
or this way we can fetch with the url (but the problem its has daily timestamp changing so i fetched with the json file):
const URL = 'https://file.notion.so/f/f/29f0d547-e67d-414a-aece-c8e4f886f341/7c1daa75-3bea-4684-bf17-be07a0800452/dishes.json?id=bcc24a10-cc7d-4db2-8c82-f61773c06fc7&table=block&spaceId=29f0d547-e67d-414a-aece-c8e4f886f341&expirationTimestamp=1706191200000&signature=VVtEt3NHmIQdSoEFKHofeOgQd6sm96_x-4WhJq-fSps&downloadName=dishes.json'
const result = await fetch(URL)
            if(!result.ok){
                throw new Error('failed to fail the dish !')
            }
const dishes = await result.json()
*/
const currentDate = new Date()
const currentYear = currentDate.getFullYear()

const suggestionsControllers = {
  getSuggestionsRoutes: async (req, res) => {
    try {
      const day = parseInt(req.query.day)
      const validationMessage = validateDay(day)
      if (validationMessage !== true) {
        return res.status(400).send(validationMessage)
      }

      const StartDate = calculateStartDate(day)
      // console.log(StartDate)
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
      const dish = randomDish(dishes)

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
}

export default suggestionsControllers
