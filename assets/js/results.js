var apiEndpoint = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=d1563961808c83772a4b3c464060f924"


fetch(apiEndpoint).then(function(response){
  return response.json();
}).then(function(data){
    console.log(data);
})