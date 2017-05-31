"use strict;"
// get location
// ----- Google Maps Api Call --------

function geoFindMe() {
  let latitude;
  let longitude;
  let output = document.getElementById("city");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    currentURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=93b0b9be965a11f0f099c8c7f74afa63";

   /* var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);*/
  
    // ---------  vanilla js promise chain - openweather ----------
  
    get(currentURL).then(function(response) {
      console.log('Vanilla Javascript success!', response.name);
      document.querySelector("#city").innerHTML = response.name + ", "  + response.sys.country + ":";
      document.querySelector("#weather").innerHTML = response.main.temp;
      console.log("Temp :", response.main.temp)
      document.querySelector("#icon").innerHTML = '<img src="http://openweathermap.org/img/w/'+response.weather[0].icon+'.png">';
      
      // Event handlers
      let el = document.getElementById("unit");
      el.addEventListener("click", fireEvents);

      function fireEvents() {
        getUnit();
      }
      // Temperature Unit change
        let clicked;
        let tempOutputCelsius = document.querySelector("#weather").innerHTML;
        function getUnit() {
          let tempOutput = document.querySelector("#weather");
          clicked = !clicked;
          if(clicked) {
            tempOutput.innerHTML = Math.round(tempOutput.innerHTML * (9/5) + 32, -2);
            document.getElementById("unit").innerHTML = ' <i class="wi wi-fahrenheit"></i>';
            console.log(document.getElementById("unit").innerHTML);
          } else {
            tempOutput.innerHTML = tempOutputCelsius;
            document.getElementById("unit").innerHTML = ' <i class="wi wi-celsius"></i>';
          }
          tempOutput.style.display = 'none';
          tempOutput.style.display = 'inline-block';
        } 

    }, function(error) {
      console.error('Vanilla Javascript failed!', error);

    })
    
}

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
  
}
// -------- End Google Maps Call 
geoFindMe();

    // OPEN WEATHER API CALL -----------------  
   // Vanilla JavaScript OpenWeather query
currentURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&APPID=93b0b9be965a11f0f099c8c7f74afa63";

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







