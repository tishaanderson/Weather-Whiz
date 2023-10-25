var searchBtn = document.querySelector("#search-btn");
var todayCard = document.querySelector("#today-card");
var weekResults = document.querySelector("#week-forecast");
var userCityInput = document.querySelector("#user-input");
var modal = document.querySelector("#modal-container");

var apiKey = "d1563961808c83772a4b3c464060f924";

// window.addEventListener('load', updateSearchHistory);

//function to add a city to the search history
function updateSearchHistory(city) {
  var history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

//function to load and display the search history to the container
function loadSearchHistory() {
  var searchHistoryList = document.querySelector("#keyword-list");
  searchHistoryList.innerHTML = "";

  var history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  for (var i = 0; i < history.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = history[i];
    listItem.addEventListener("click", () => {
      // userCityInput.value = history[i];
      searchWeather(history[i]);
    });
    searchHistoryList.appendChild(listItem);
  }
}

//function to handle form submission
function formSubmitHandler(event) {
  event.preventDefault();

  var city = userCityInput.value.trim();
  searchWeather(city);
}

//adds event listener to the search button
searchBtn.addEventListener("submit", formSubmitHandler);
loadSearchHistory();

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
function weeklyForecast(city) {
var weekURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&limit=5&appid=" + apiKey + "&units=imperial";

  fetch(weekURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);

      var weekForecastElement = document.getElementById("week-forecast");
      weekForecastElement.innerHTML = "Weekly forecast for " + data.city.name + ":";

      // document.querySelectorAll('.forecast-day').innerHTML = data.date;
      // document.querySelectorAll('.forecast-temp').innerHTML = "<p>Temp: " + data.main.temp + " F</p>";
      // document.querySelectorAll('.forecast-humidity').innerHTML = "<p>Humidity: " + data.main.humidity + "%</p>";
      // document.querySelectorAll('.forecast-wind').innerHTML = "<p>Wind: " + data.wind + " MPH</p>";


      var dayElements = document.querySelectorAll(".forecast-day");
      var tempElements = document.querySelectorAll(".forecast-temp");
      var humidityElements = document.querySelectorAll(".forecast-humidity");
      var windElements = document.querySelectorAll(".forecast-wind");

      if (data.list.length < 5) {
        weekForecastElement.innerHTML +=
          "<p>Not enough data for the next 5 days.<p>";
        return;
      }

      for (var i = 0; i < 5; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {
          console.log(data.list[i]);

          var dayData = data.list[i];

          var date = new Date(dayData.dt * 1000);
          var temp = dayData.main.temp;
          var humidity = dayData.main.humidity;
          var wind = dayData.wind.speed;

          dayElements[i].textContent = date.toLocaleDateString();
          tempElements[i].textContent = "Temp: " + temp + " F";
          humidityElements[i].textContent = "Humidity: " + humidity + "%";
          windElements[i].textContent = "Wind: " + wind + " MPH";
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

function searchWeather(city) {
  var baseURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(baseURL)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      updateSearchHistory(city);
      loadSearchHistory();

      weeklyForecast(city);
      document.querySelector(".card-title").innerHTML =
        "Current weather for " + data.name + ":";
      document.querySelector(".today-temp").innerHTML +=
        "<p>Temp: " + data.main.temp + " F</p>";
      document.querySelector(".today-humidity").innerHTML +=
        "<p>Humidity: " + data.main.humidity + "%</p>";
      document.querySelector(".today-wind").innerHTML +=
        "<p>Wind: " + data.wind.speed + " MPH</p>";

      var currentWeatherData = data.weather[0].icon;
      var icon =
        "https://openweathermap.org/img/wn/" + currentWeatherData + ".png";
      document.querySelector(".today-icon").src = icon;
    })
    .catch(function (error) {
      console.log(error);
      modal.show();
    });
}

loadSearchHistory();
