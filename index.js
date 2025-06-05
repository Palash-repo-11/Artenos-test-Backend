
const express = require('express')
const dotenv = require('dotenv')
const cors=require('cors')
dotenv.config()
const PORT = process.env.PORT
const API_KEY = process.env.API_KEY
const app = express()
app.use(cors({
    origin:'*'
}))
const sunnyRecommendationArray = [
    'cycling', 'picniking', 'Tea'
]
const rainyRecommendationArray = [
    'carrom', 'BGMI', 'movie'
]
const coludyRecommendationArray = [
    'tea'
]
const weathers = ['cloudy', 'rainy', 'sunny']
app.get('/', async (req, res) => {
    res.send('welcome')
})


app.get('/getweather', async (req, res) => {
    let city = req.query.city
    let apiResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
    if (!apiResponse.ok) return res.status(400).send('someThing went Wrong.Try Later')
    let apiResult = await apiResponse.json()
    let recommadation;

    if (apiResult.current.condition.text?.toLowerCase().includes(weathers[0])) {
        let random = Math.floor(Math.random() * coludyRecommendationArray.length)
        recommadation = coludyRecommendationArray[random]
    }
    else if (apiResult.current.condition.text?.toLowerCase().includes(weathers[1])) {
        let random = Math.floor(Math.random() * rainyRecommendationArray.length)
        recommadation = rainyRecommendationArray[random]
    }
    else {
        let random = Math.floor(Math.random() * sunnyRecommendationArray.length)
        recommadation = sunnyRecommendationArray[random]
    }
    res.status(200).send({
        name: apiResult.location.name,
        temparature: apiResult.current.temp_c,
        weather: apiResult.current.condition.text,
        recommadation,
    })

})


app.listen(PORT, () => {
    console.log(`server started listening ${PORT}`)
})
