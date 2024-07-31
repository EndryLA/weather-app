
let apiKey = 'ed7470ecaebdeab1d47810f84643f381'
let inputText = document.getElementById('input-text')
let searchButton = document.getElementById('search-btn')

let currentTemperature = document.getElementById('current-temperature')
let minTemeperature = document.getElementById('min-temp-display')
let maxTemeperature = document.getElementById('max-temp-display')
let humidity = document.getElementById('humidity')
let windSpeed = document.getElementById('wind-speed')
let pressure = document.getElementById('pressure')
let sunset = document.getElementById('sunset')
let weatherImage = document.getElementById('weather-type-img')

let displayToggle = document.getElementById('display-toggle')



searchButton.addEventListener('click',getData)


function getData() {
  let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ inputText.value.toString().trim() + "&lang=fr&appid=" + apiKey
  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {

    console.log(data)

    showData(displayToggle)

    let searchData = new currentWeatherData()

    searchData.description = data.weather[0].description
    searchData.currentTemeperature = Math.floor(data.main.temp - 273.15) + "°C"
    searchData.minTemperature = Math.floor(data.main.temp_min - 273.15) + "°C"
    searchData.maxTemperature = Math.floor(data.main.temp_max - 273.15) + "°C"
    searchData.windSpeed = Math.floor(data.wind.speed * 3.6) + "km/h"
    searchData.humidity = data.main.humidity + " %"
    searchData.weatherIcon = data.weather[0].icon
    searchData.sunset = new Date(data.sys.sunset * 1000)
    searchData.pressure = ((data.main.pressure)/1000).toFixed(1) + " Bar"

    
    searchData.returnImageUrl()
    
    currentTemperature.innerText = searchData.currentTemeperature
    maxTemeperature.innerText = searchData.maxTemperature
    minTemeperature.innerText = searchData.minTemperature
    humidity.innerText = searchData.humidity
    windSpeed.innerText = searchData.windSpeed 
    pressure.innerText = searchData.pressure
    sunset.innerText = displayTime(searchData.sunset)
    weatherImage.src = "images/icons/" + searchData.returnImageUrl()
    console.log(weatherImage.src)
  })
}

class currentWeatherData {
  
  returnImageUrl() {
    switch(this.weatherIcon.trim()) {
     case "01d" : return "wi-day-sunny.svg";
     case "01n" : return "wi-night-clear.svg";
    }

    switch(this.weatherIcon.trim().slice(0,2)){
     case "02"  : return "wi-cloudy.svg";
     case "03"  : return "wi-cloud.svg";
     case "04"  : return "wi-cloud.svg";
     case "05"  : return "wi-showers.svg";
     case "09" : return "wi-showers.svg";
     case "10" : return "wi-night-rain.svg";
     case "11" : return "wi-thunderstorm.svg";
     case "13" : return "wi-snow.svg";      
     case "50" : return "wi-dust.svg";      
    }
}

}

function displayTime(date) {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  if (hours.toString().length < 2 ) {
    hours = "0" + hours.toString()
  }
  if (minutes.toString().length < 2 ) {
    minutes = "0" + minutes.toString()
  }

  return hours + ":" + minutes
}

function showData(element) {
  if (inputText.value.trim().length > 0) {
    element.style.display = 'block'
  }
}