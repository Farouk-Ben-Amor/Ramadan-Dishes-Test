import { test, expect } from 'vitest'
import { calculateCookTime } from '../utils/dishesUtils'
import moment from 'moment'

const dish = {
    name: "Meshwiya Salad",
    ingredients: [
      "Pepper",
      "Tomatoe",
      "Garlic",
      "Onion"
    ],
    duration: 30
}
const asr = moment("15:49", 'HH:mm')
const maghrib = moment("18:36", 'HH:mm')

test('Cooking Time Calculation', () => {
    const result = calculateCookTime(dish, maghrib, asr);
    expect(result).toBe("122 minutes after Asr");
});
