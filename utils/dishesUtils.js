import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';
import axios from 'axios'
//converting the file url to a file path
const __filename = fileURLToPath(import.meta.url);

//this to get the directory name of the current module
const __dirname = path.dirname(__filename);

//fetching dishes from the dishes.json file:

export const randomDish = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export const getDishes = () => {
    //creating the path to the 'dishes.json' file
    const Path = path.join(__dirname, "..", "dishes.json");
    //reading the content of the 'dishes.json' file synchronously and storing it in Data
    const Data = fs.readFileSync(Path);
    return JSON.parse(Data);
}

//calculating the cooking time based on the prayers time and the duration of each dish:
export const calculateCookTime = (dish, maghribTime, asrTime) => {
    let doneCookingTime = moment(maghribTime);
    let startCookingTime = moment(doneCookingTime).subtract(dish.duration+15, 'minutes');

    let timing = '';
    if (startCookingTime.isAfter(asrTime)) {
        //when asr is earlier than the start cooking time
        timing = `${startCookingTime.diff(asrTime, 'minutes')} minutes after Asr`;
    } else {
        //when asr is later than the start cooking time
        timing = `${asrTime.diff(startCookingTime, 'minutes')} minutes before Asr`; 
    }

    return timing;
}
export const findDayPrayerTimes = (prayerTimes,StartDate)=>{
    let dayPrayerTimes;
            for (let i = 0; i < prayerTimes.length; i++) {
                const apiDate = moment(prayerTimes[i].date.gregorian.date, 'DD-MM-YYYY');
                if (apiDate.isSame(StartDate, 'day')) {
                    dayPrayerTimes = prayerTimes[i];
                    break;
                }
            }
            return dayPrayerTimes;
}

export const getPrayerFromApi = async (URL) => {
    try {
        const response = await axios.get(URL);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        throw error; 
    }
}
export const calculateStartDate = (day) => {
    let StartDate = moment([new Date().getFullYear(), 2, 11]); // March 11
    StartDate.add(day - 1, 'days');
    return StartDate;
} 
export const validateDay = (day) => {
    if (day === undefined) {
        return "hey, type a day please";
    }
    if ( day < 1 || day > 30) {
        return "Invalid day. Please enter a number between 1 and 30.";
    }if (isNaN(day)) {
        return "hey, please enter a number as a day !!!";
    }
    return true;
}
export const validateIngredient = (ingredient, dishes) => {
    if (ingredient === undefined) {
        return "hey, please enter an ingredient";
    }
    if (!isNaN(ingredient)) {
        return "hey, please enter a valid ingredient, not a number !";
    }
    if (!dishes.some(dish => dish.ingredients.includes(ingredient))) {
        return `Oups, this ingredient ${ingredient} does not exist in our dishes :(`;
    }
    return true;
}

    /*
notes
const now = moment(); // Creating a moment object representing the current moment in time
=> a "moment object" represents a specific point in time
*/