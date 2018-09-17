"use strict;"
// get location
// ----- Google Maps Api Call --------
let latitude = 0;
let longitude = 0;
function geoFindMe() {

  let output = document.getElementById("city");
  let map = "";
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;  
    currentURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=_SECRET_&lang=de";
    let map = document.getElementById("google-map");
    var img = new Image();
    
  img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&markers=color:green%7Clabel:U%7C" + latitude + "," + longitude + "&zoom=15&size=300x300&sensor=false&key=AIzaSyDokRCBZZdMADwpo-ndrmpyut6_FuOWL-E";
    output.appendChild(img);
    map.appendChild(img);
  
    // ---------  vanilla js promise chain - openweather ----------
  
    get(currentURL).then(function(response) {
      let land = response.sys.country == "DE" ? "Deutschland" : response.sys.country;
      document.querySelector("#city").innerHTML = response.name + ", "  + land;
      document.querySelector("#weather").innerHTML = response.main.temp;
      document.querySelector("#icon").innerHTML = '<img src="https://openweathermap.org/img/w/'+response.weather[0].icon+'.png">';
      document.querySelector("#icon-description").innerHTML = response.weather[0].description;
      document.querySelector("#humidity").innerHTML = response.main.humidity + "%";
      // Event handlers
      let el = document.getElementById("unit");
      el.addEventListener("click", fireEvents);

      function fireEvents() {
        getUnit();
      }
      // Temperature Unit change
        let clicked;
        let tempUnit = "Celsius";
        let tempOutputCelsius = document.querySelector("#weather").innerHTML;
        function getUnit() {
          let tempOutput = document.querySelector("#weather");
          clicked = !clicked;
          if(clicked) {
            tempOutput.innerHTML = Math.round(tempOutput.innerHTML * (9/5) + 32, -2);
            document.getElementById("unit").innerHTML = ' <i class="wi wi-fahrenheit"></i>';
            tempUnit = "Fahrenheit";
          } else {
            tempOutput.innerHTML = tempOutputCelsius;
            document.getElementById("unit").innerHTML = ' <i class="wi wi-celsius"></i>';
            tempUnit = "Celsius";
          }
          tempOutput.style.display = 'none';
          tempOutput.style.display = 'inline-block';
          let spanTempUnit = document.querySelector(".temp-unit");
          spanTempUnit.innerHTML =tempUnit; 
        } 
        // ---- set background image -------
        setBackground(tempOutputCelsius);
        function setBackground(temperature){
            let body = document.querySelector("body");
         
            if( (temperature < 3)  ) {
              body.style.backgroundImage = "url('./img/bg-snow.jpg')"
            } else if ( temperature < 15 && temperature > 3  ) {
              body.style.backgroundImage = "url('./img/bg-cloudy.jpg')"
            } else if ( temperature < 25 && temperature >= 15  ) {
              body.style.backgroundImage = "url('./img/bg-clear.jpg')"
            } else if ( temperature > 25 ) {
              body.style.backgroundImage = "url('./img/bg-sunny.jpg')"
          }
        }
        showControls()
    }, function(error) {
      console.error('Request failed!', error);

    })
 
    
}

  function error() {
    output.innerHTML = "Konnte Position nicht betimmen";
  }

  output.innerHTML = "<p>Orte Position…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
  
}
// -------- End Google Maps Call 
geoFindMe();

    // OPEN WEATHER API CALL -----------------  
   // Vanilla JavaScript OpenWeather query
currentURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=8cf55d0643deacaec6ffad3309ba7802";

// Vanilla Javascript Ajax call (with promise)
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

function showControls() {
  let controls = document.querySelector(".controls");
  controls.style.display = "block";
}







