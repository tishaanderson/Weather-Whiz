var baseURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
var apiKey = "d1563961808c83772a4b3c464060f924";
var city = "Farmersville";

fetch(baseURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    var temperature = data.list[0].main.temp;
    console.log(temperature);
    console.log('Weather forecast for ' + city + ': \n---------');
    console.log(data);
  })

  