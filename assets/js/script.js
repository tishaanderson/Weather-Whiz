var searchBtn = document.querySelector('#search-btn');
var todayCard = document.querySelector('#today-card');
var weekResults = document.querySelector('#week-forecast');
var userCityInput = document.querySelector('#user-input');
var modal = document.querySelector('#modal');

var apiKey = "d1563961808c83772a4b3c464060f924";

searchBtn.addEventListener('click', formSubmitHandler);

var formSubmitHandler = function(event) {
  event.preventDefault();

  var city = userCityInput.value.trim();

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&limit=5&appid=" + apiKey)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      console.log(data);

      
      todayCard.innerHTML = "Current weather data for " + city + ":";
      todayCard.innerHTML += "<p>Temp: " + data.current.temp + " F</p>";
      todayCard.innerHTML += "<p>Humidity: " + data.current.humidity + "%</p>";



      var weekForecastElement = document.getElementById('week-forecast');
      weekForecastElement.innerHTML = "Weekly forecast for " + city + ":";
      weekForecastElement.innerHTML += "<p>Temp: " + data.current.temp + " F</p>";
      weekForecastElement.innerHTML += "<p>Humidity: " + data.current.humidity + "%</p>";


      var currentWeatherData = data.weather[0];
      todayResults.textContent = currentWeatherData.main.temp + " F";

    })

  if (city) {
    currentCityData(city);

    todayResults.textContent = '';
    userCityInput.value = '';
  } else {
    modal.show();
  }
};

// var currentCityData = function(city) {
//   var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;

//   fetch(apiURL)
//     .then(function(response) {
//       return response.json();
//     })
//     .then((responseData) => {
//       if (responseData.cod !== 200) {
//         modal.show();
//         return;
//       }

//       var weather = responseData.weather;

//       weather.forEach((weather) => {
//         console.log(weather);
//       });
//     })
//     .catch(function(error) {
//       console.log(error);
//       modal.show();
//     });
// }



// var weeklyForecast = function(city) {
//   var apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&limit=5&appid=" + apiKey;

//   fetch(apiURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then((responseData) => {
//       var week = responseData;
//       console.log(week);
//     })
//     .catch((error) => {
//       console.log("An error occurred:", error);
//     })
// }

// searchBtn.addEventListener('click', currentCityData);







// function searchWeather(event) {
//   event.preventDefault();
//   var city = userCityInput.value;
//   if (city === ''){
//     modal.show();
//     return;
//   }

//   var baseURL = "https.//api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

//   fetch(baseURL)
//     .then(function(response) {
//       return response.json();
//     })
//     .then((responseData) => {
//       if (responseData.cod !== 200) {
//         modal.show();
//         return;
//       }

//       var weather = responseData.weather;

//       weather.forEach((weather) => {
//         console.log(weather);
//       });
//     })
//     .catch(function(error) {
//       console.log(error);
//       modal.show();
//     });
// }


// searchBtn.addEventListener('click', function(event) {
//   event.preventDefault();

  

//   localStorage.setItem('city', JSON.stringify(city));


// })


  