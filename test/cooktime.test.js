import { test , expect } from 'vitest'
//todo : make sure that the api is running when testing this input
const result = [
    {
    "name": "Shakshouka",
    "ingredients": [
    "Egg",
    "Harissa",
    "Tomatoe Paste"
    ],
    "cooktime": "100 minutes after Asr"
    },
    {
    "name": "Brik",
    "ingredients": [
    "Malsouqa",
    "Egg",
    "Tuna"
    ],
    "cooktime": "115 minutes after Asr"
    },
    {
    "name": "Blunkett Salad",
    "ingredients": [
    "Bread",
    "Horseradish",
    "Egg",
    "Tuna"
    ],
    "cooktime": "110 minutes after Asr"
    },
    {
    "name": "Tajeen",
    "ingredients": [
    "Egg",
    "Chicken",
    "Parsley",
    "Onion"
    ],
    "cooktime": "97 minutes after Asr"
    }
    ]
test('The retutn of cooktime endpoint', async () => {
    const response = await fetch('http://localhost:3000/cooktime?ingredient=Egg&day=2')
    const data = await response.json()

    expect(data).toEqual(result)
})
