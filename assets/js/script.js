var searchBtn = document.querySelector('#search-btn');
var todayCard = document.querySelector('#today-card');
var weekResults = document.querySelector('#week-forecast');
var userCityInput = document.querySelector('#user-input');
var modal = document.querySelector('#modal-container');

var apiKey = "d1563961808c83772a4b3c464060f924";

function formSubmitHandler(event) {
  event.preventDefault();

  var city = userCityInput.value.trim();
  searchWeather(city);


  // if (city) {
  //   currentCityData(city);

//     todayResults.textContent = '';
//     userCityInput.value = '';
//   } else {
//     modal.show();
//   }
};

searchBtn.addEventListener('submit', formSubmitHandler);

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



var weeklyForecast = function(city) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&limit=5&appid=" + apiKey + "&units=imperial")
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(data) {

      console.log(data);

      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")){
          console.log(data.list[i]);
        }
        
      }

      var weekForecastElement = document.getElementById('week-forecast');
      weekForecastElement.innerHTML = "Weekly forecast for " + city + ":";
      weekForecastElement.innerHTML += "<p>Temp: " + data.current.temp + " F</p>";
      weekForecastElement.innerHTML += "<p>Humidity: " + data.current.humidity + "%</p>";


    })
}

// searchBtn.addEventListener('click', currentCityData);







function searchWeather(city) {

  var baseURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

  fetch(baseURL)
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      weeklyForecast(city);
      document.querySelector(".card-title").innerHTML = "Current weather data for " + data.name + ":";
      document.querySelector(".today-temp").innerHTML += "<p>Temp: " + data.main.temp + " F</p>";
      document.querySelector(".today-humidity").innerHTML += "<p>Humidity: " + data.main.humidity + "%</p>";
      document.querySelector(".today-wind").innerHTML += "<p>Wind: " + data.wind.speed + "MPH</p>";

      var currentWeatherData = data.weather[0].icon;
      var icon = "https://openweathermap.org/img/wn/" + currentWeatherData + ".png";
      document.querySelector('.today-icon').src = icon;


      // todayResults.textContent = currentWeatherData.main.temp + " F";
    })
    .catch(function(error) {
      console.log(error);
      modal.show();
    });
}


// searchBtn.addEventListener('click', function(event) {
//   event.preventDefault();

  

//   localStorage.setItem('city', JSON.stringify(city));


// })


  