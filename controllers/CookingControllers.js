import axios from "axios";
const URL1 = 'https://file.notion.so/f/f/29f0d547-e67d-414a-aece-c8e4f886f341/7c1daa75-3bea-4684-bf17-be07a0800452/dishes.json?id=bcc24a10-cc7d-4db2-8c82-f61773c06fc7&table=block&spaceId=29f0d547-e67d-414a-aece-c8e4f886f341&expirationTimestamp=1706191200000&signature=VVtEt3NHmIQdSoEFKHofeOgQd6sm96_x-4WhJq-fSps&downloadName=dishes.json'

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const URL2 = `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=Makkah&country=Saudi Arabia&method=1`

const cookingController = {
    getCookingRoutes : async (req,res)=> {
        try {
            // Check if 'day' and 'ingredient' are present in the request query parameters
            if (!req.query.hasOwnProperty('day')) {
                return res.status(400).send("The 'day' query parameter is required.");
            }
            if (!req.query.hasOwnProperty('ingredient')) {
                return res.status(400).send("The 'ingredient' query parameter is required.");
            }
            
            const day = parseInt(req.query.day)
            if (day < 1 || day > 30) {
                return res.status(400).send("Hey! Ramadan contains just 30 days!");
            }
            //fetching the data from the dishes.json file 
            const result = await fetch(URL1)
            if (!result.ok) {
                throw new Error('Failed to fetch the data')
            }
            //parsing the json data
            const dishes = await result.json()
            const filteredDishes = dishes.filter(dish => 
                dish.ingredients.includes(req.query.ingredient))

             
            const response = await axios.get(URL2);
            const prayerTimes = response.data.data;

            // Extract Asr and Maghrib prayers times :(timing do?)
            const firstDayPrayerTimes = prayerTimes[0].timings;
            const asrTime = firstDayPrayerTimes.Asr.replace(/\s+\(\+\d+\)/, '');
            const maghribTime = firstDayPrayerTimes.Maghrib.replace(/\s+\(\+\d+\)/, '');
            //i used .replace(/\s+\(\+\d+\)/, '') to remove the (+3) for the GMT

            res.send({
                dishes : filteredDishes,
                prayerTimes : `-----> And Asr prayer time in Makkah: ${asrTime}, Maghrib prayer time in Makkah: ${maghribTime}`
                })

        } catch (error) {
            console.error('Error fetching from dishes.json',error)
            res.status(500).json({error : 'internal server error '})
        }
    },
}

export default cookingController
