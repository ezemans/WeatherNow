(function(){
	var myApi ="2594cebdc710b289da91b89819923d58";
	var theUrl = "http://api.openweathermap.org/data/2.5/weather?&APPID="+myApi+"&";
	
	

	var cityWeather = {}; //objeto
	var body = $("body");
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(getCoords, errorFound, geo_options);
	}else{
		alert("Ops! Actualice su navegador a una version mas actual!")
	}

	function errorFound(err){
		alert("Un error ocurrio: " + error.code)
	};
	var geo_options = {
  		enableHighAccuracy: true, 
  		maximumAge        : 30000, 
  		timeout           : 27000
  	};
  	var panorama;
	function getCoords(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		$.getJSON(theUrl + "lat="+ lat +"&lon=" + lon, getCurrentWeather);
		initialize(lat,lon);
	}


function initialize(lat,lon) {
  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'),
      {
        position: {lat: lat, lng: lon},
        pov: {heading: 165, pitch: 0},
        linksControl: false,
        panControl: false,
        zoomControl: false,
        creditsControl: false,
        zoom: 1,
        enableCloseButton: false
      });
}

	function getCurrentWeather(data){
		cityWeather.temp = data.main.temp - 273.15;
		cityWeather.temp_min = data.main.temp_min - 273.15;
		cityWeather.temp_max = data.main.temp_max - 273.15;
		cityWeather.descripcion = data.weather[0].description;
		cityWeather.zone = data.name;
		cityWeather.pressure = data.main.pressure;
		cityWeather.country = data.sys.country
		cityWeather.humidity = data.main.humidity;
		cityWeather.wind = data.wind.speed;
		cityWeather.clouds = data.clouds.all;
		cityWeather.wm = data.weather[0].main;
		if(cityWeather.temp <= 13){
			actions = "a cold day for go out, lets watch a movie!";
		}else if(cityWeather.temp >= 14 && cityWeather.temp <= 26){
			actions = "is a nice day for make some sports!";
		}else if(cityWeather.temp >= 27 && cityWeather.temp <= 35){
			actions = "It's hot! lets go to swim and take a beer!";
		}else{
			actions= "protect yourself! use solar protector!";
		}
		renderizartemplate();
	}
	function activartemplate(id){
    var t = document.querySelector(id); //tomo el template
    return document.importNode(t.content,true);
  }

  function renderizartemplate(){
    var clone = activartemplate("#MainTemplate");
    clone.querySelector("[data-temp]").innerHTML = cityWeather.temp;
    clone.querySelector("[data-min]").innerHTML = cityWeather.temp_min;
    clone.querySelector("[data-max]").innerHTML = cityWeather.temp_max;
    clone.querySelector("[data-humidity]").innerHTML = cityWeather.humidity;
    clone.querySelector("[data-description]").innerHTML = cityWeather.descripcion;
    clone.querySelector("[data-zone]").innerHTML = cityWeather.zone;
    clone.querySelector("[data-wind]").innerHTML = cityWeather.wind;
    clone.querySelector("[data-clouds]").innerHTML = cityWeather.clouds;
    clone.querySelector("[data-wm]").innerHTML = cityWeather.wm;
    clone.querySelector("[data-action]").innerHTML = actions;
    clone.querySelector("[data-country]").innerHTML = cityWeather.country;
    clone.querySelector("[data-pressure]").innerHTML = cityWeather.pressure;
    $(body).append(clone);
  }


})();