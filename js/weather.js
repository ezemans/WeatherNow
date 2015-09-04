(function(){
	var myApi ="2594cebdc710b289da91b89819923d58";
	var theUrl = "http://api.openweathermap.org/data/2.5/weather?&APPID="+myApi+"&";
	var hourTemp ="http://api.openweathermap.org/data/2.5/forecast?&APPID="+myApi+"&";
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
	function getCoords(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		$.getJSON(theUrl + "lat="+ lat +"&lon=" + lon, getCurrentWeather);
		$.getJSON(hourTemp + "lat="+ lat +"&lon=" + lon, getHourWeather)
	}
	var hourTemperature = {};
	function getHourWeather(data){
		hourTemperature.eve =data.dt_txt;
	}


	function getCurrentWeather(data){
		cityWeather.temp = data.main.temp - 273.15;
		cityWeather.descripcion = data.weather[0].description;
		cityWeather.zone = data.name;
		cityWeather.humidity = data.main.humidity;
		if(cityWeather.temp <= 13){
			actions = "a cold day for go out, lets watch a movie!";
		}else if(cityWeather.temp >= 14 && cityWeather.temp <= 26){
			actions = "is a nice day for make some sports!";
		}else if(cityWeather.temp >= 27 && cityWeather.temp <= 35){
			actions = "It's hot! lets go to swim and take a beer!";
		}else{
			actions= "protect yourself! use solar protector!";
		}
		getHourWeather();
		renderizartemplate();
	}
	function activartemplate(id){
    var t = document.querySelector(id); //tomo el template
    return document.importNode(t.content,true);
  }

  function renderizartemplate(){
    var clone = activartemplate("#MainTemplate");
    clone.querySelector("[data-temp]").innerHTML = cityWeather.temp;
    clone.querySelector("[data-humidity]").innerHTML = cityWeather.humidity;
    clone.querySelector("[data-description]").innerHTML = cityWeather.descripcion;
    clone.querySelector("[data-zone]").innerHTML = cityWeather.zone;
    clone.querySelector("[data-action]").innerHTML = actions;
    clone.querySelector("[data-night]").innerHTML = hourTemperature.eve;
    $(body).append(clone);
  }


})();