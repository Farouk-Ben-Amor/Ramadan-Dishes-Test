
/*
// Generate a future timestamp
let currentTime = new Date().getTime();
let futureTime = currentTime + 60 * 60 * 1000;
console.log(futureTime)
const URL1 = `https://file.notion.so/f/f/29f0d547-e67d-414a-aece-c8e4f886f341/7c1daa75-3bea-4684-bf17-be07a0800452/dishes.json?id=bcc24a10-cc7d-4db2-8c82-f61773c06fc7&table=block&spaceId=29f0d547-e67d-414a-aece-c8e4f886f341&expirationTimestamp=${futureTime}&signature=jaV2tpdEkKJ1BrnCJHbWTq_L9OEokCP8huKGpopJ9uI&downloadName=dishes.json`;
*/
const URL = 'https://file.notion.so/f/f/29f0d547-e67d-414a-aece-c8e4f886f341/7c1daa75-3bea-4684-bf17-be07a0800452/dishes.json?id=bcc24a10-cc7d-4db2-8c82-f61773c06fc7&table=block&spaceId=29f0d547-e67d-414a-aece-c8e4f886f341&expirationTimestamp=1706191200000&signature=VVtEt3NHmIQdSoEFKHofeOgQd6sm96_x-4WhJq-fSps&downloadName=dishes.json'
/** 
 * @param array an array of   ...
*/
const randomDish = (array)=>{
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]; 
}

const suggestionsControllers = {
    getSuggestionsRoutes : async (req,res) => {
        try {
            const day = parseInt(req.query.day)
            if (day < 1 || day > 30) {
                return res.status(400).send("Hey! Ramadan contains just 30 days!");
            }
            const result = await fetch(URL)
            if(!result.ok){
                throw new Error('failed to fail the dish !')
            }
            const dishes = await result.json()
            const dish = randomDish(dishes)
            res.send(dish)



        } catch (error) {
            console.error('error while fetching the random dish' ,error)
            res.status(500).json(({error : 'Internal server error'}))
        }
    },
}
export default suggestionsControllers