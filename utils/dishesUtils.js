import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import moment from 'moment'
import momentH from 'moment-hijri'
import axios from 'axios'
// converting the file url to a file path
const __filename = fileURLToPath(import.meta.url)

// this to get the directory name of the current module
const __dirname = path.dirname(__filename)

// fetching dishes from the dishes.json file:

export const randomDish = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const getDishes = () => {
  // creating the path to the 'dishes.json' file
  const Path = path.join(__dirname, '..', 'dishes.json')
  // reading the content of the 'dishes.json' file synchronously and storing it in Data
  const Data = fs.readFileSync(Path)
  return JSON.parse(Data)
}

// calculating the cooking time based on the prayers time and the duration of each dish:
export const calculateCookTime = (dish, maghribTime, asrTime) => {
  const doneCookingTime = moment(maghribTime)
  const startCookingTime = moment(doneCookingTime).subtract(dish.duration + 15, 'minutes')

  let timing = ''
  if (startCookingTime.isAfter(asrTime)) {
    // when asr is earlier than the start cooking time
    timing = `${startCookingTime.diff(asrTime, 'minutes')} minutes after Asr`
  } else {
    // when asr is later than the start cooking time
    timing = `${asrTime.diff(startCookingTime, 'minutes')} minutes before Asr`
  }

  return timing
}
export const findDayPrayerTimes = (prayerTimes, StartDate) => {
  let dayPrayerTimes
  for (let i = 0; i < prayerTimes.length; i++) {
    const apiDate = moment(prayerTimes[i].date.gregorian.date, 'DD-MM-YYYY')
    if (apiDate.isSame(StartDate, 'day')) {
      dayPrayerTimes = prayerTimes[i]
      break
    }
  }
  return dayPrayerTimes
}

export const getPrayerFromApi = async (URL) => {
  try {
    const response = await axios.get(URL)
    return response.data.data
  } catch (error) {
    console.error('Error fetching prayer times:', error)
    throw error
  }
}
/*
based on aladhan prayertime ressource : https://aladhan.com/ramadan-prayer-times/2024/Makkah/Saudi%20Arabia
the 1st day of the upcoming ramadan this year is 11 March, 2024 (Ramaḍān, 1445)
that's why i used it as my startDate to work with it (in the calculateStartDate below.)
*/
export const calculateStartDate = (day) => {
  const currentDate = momentH()
  console.log(currentDate)
  let currentYear = currentDate.iYear()

  while (true) {
    for (let i = 1; i <= 12; i++) {
      const testDate = momentH().iYear(currentYear).iMonth(i - 1).iDate(1)
      if (testDate.iMonth() === 8) { // Check if it's the 9th month (Ramadan)
        const StartDate = momentH(testDate).add(day - 1, 'days')

        return StartDate
      }
    }
    currentYear++
  }
}
export const validateDay = (day) => {
  if (day === undefined) {
    return 'hey, type a day please'
  }
  if (day < 1 || day > 30) {
    return 'Invalid day. Please enter a number between 1 and 30.'
  } if (isNaN(day)) {
    return 'hey, please enter a number as a day !!!'
  }
  return true
}
export const validateIngredient = (ingredient, dishes) => {
  if (ingredient === undefined) {
    return 'hey, please enter an ingredient'
  }
  if (!isNaN(ingredient)) {
    return 'hey, please enter a valid ingredient, not a number !'
  }
  if (!dishes.some(dish => dish.ingredients.includes(ingredient))) {
    return `Oups, this ingredient ${ingredient} does not exist in our dishes :(`
  }
  return true
}

/*
notes
const now = moment(); // Creating a moment object representing the current moment in time
=> a "moment object" represents a specific point in time
*/
