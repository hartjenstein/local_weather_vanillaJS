"use strict;"
// get location
  let latitude = "";
  let longitude = "";
  let currentURL = "";
  
// ----- Google Maps Api Call --------
function geoFindMe() {
  let output = document.getElementById("city");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    //Location output
    console.log(latitude)
    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    currentURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=93b0b9be965a11f0f099c8c7f74afa63";

    console.log(city)
    console.log(currentURL)


    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  
        // vanilla js promises chain - openweather 
    get(currentURL).then(function(response) {
      console.log('Vanilla Javascript success!', response.name);
      document.querySelector("#city").innerHTML = response.name + ", "  + response.sys.country + ":";
      document.querySelector("#weather").innerHTML = response.main.temp
      console.log(response.weather)

      
      // Event handlers

      let el = document.getElementById("unit");
      el.addEventListener("click", fireEvents);

      function fireEvents() {
        getUnit();
      }
      // Temperature Unit change - promise call
        let clicked;
        let tempOutputCelsius = document.querySelector("#weather").innerHTML;
        console.log("TempCelsius :",tempOutputCelsius)
        function getUnit() {
          let tempOutput = document.querySelector("#weather");
          console.log("fired");
          clicked = !clicked;
          console.log(clicked)
          if(clicked) {
            console.log(tempOutput.innerHTML);
            tempOutput.innerHTML = Math.round(tempOutput.innerHTML * (9/5) + 32, -2);
            
            console.log(tempOutput.innerHTML);
          } else {
            tempOutput.innerHTML = tempOutputCelsius;
          }
          tempOutput.style.display = 'none';
          tempOutput.style.display = 'block';
        } 




    }, function(error) {
      console.error('Vanilla Javascript failed!', error);
    });

}

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
  
}
// -------- End Google Maps Call 
geoFindMe();

console.log("lat :",latitude)
    console.log("Current :",currentURL);

    // OPEN WEATHER API CALL -----------------  
   // Vanilla JavaScript OpenWeather query
currentURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=93b0b9be965a11f0f099c8c7f74afa63";

console.log(currentURL);
// Vanilla Javascript Ajax call
function get(url) {
  return new Promise(function(resolve, reject) {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (xhr.status === 200) {
        // Resolve the promise with the response text
        resolve(JSON.parse(xhr.response));
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(xhr.statusText));
      }
    };

    // Handle network errors
    xhr.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    xhr.send();
  });
}







/* Temperature Unit change - promise call
let clicked;
function getUnit() {
  console.log("fired");
  clicked = !clicked;
  if(clicked) {
  currrentURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=imperial&APPID=93b0b9be965a11f0f099c8c7f74afa63";
  console.log(clicked);
  } else {
    currentURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=93b0b9be965a11f0f099c8c7f74afa63";
  }
  get(currentURL).then(function(response) {
    console.log('Vanilla Javascript success!', response.name);
    document.querySelector("#city").innerHTML = response.name + ", "  + response.sys.country + ":";
    document.querySelector("#weather").innerHTML = response.main.temp
    console.log(response.weather)
  }, function(error) {
    console.error('Vanilla Javascript failed!', error);
  })
};*/







