import { test , expect } from 'vitest'
//todo : make sure that the api is running when testing this input
const result = {
    dishes: [
        {name: "Shakshouka", "ingredients": ["Egg", "Harissa", "Tomatoe Paste"], "cooktime": "100 minutes after Asr"},
        {name: "Brik", "ingredients": ["Malsouqa", "Egg", "Tuna"], "cooktime": "115 minutes after Asr"},
        {name: "Blunkett Salad", "ingredients": ["Bread", "Horseradish", "Egg", "Tuna"], "cooktime": "110 minutes after Asr"},
        {name: "Tajeen", "ingredients": ["Egg", "Chicken", "Parsley", "Onion"], "cooktime": "97 minutes after Asr"}
    ],
    prayerTimes: "-----> Asr prayer time in Makkah: ١٥:٥٤, Maghrib prayer time in Makkah: ١٨:٢٩",
    dayOfRamadan: "-----> Today is ٠٣/١٢ , The day 2 of ramadan "
}
test('The retutn of cooktime endpoint', async () => {
    const response = await fetch('http://localhost:3001/cooktime?ingredient=Egg&day=2')
    const data = await response.json()

    expect(data).toEqual(result)
})
