let weather = {
  apiKey: "1f050409a5416d907f466e2dc4ef7607",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    const { lat,lon } = data.coord;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".lat").innerText = "Latitude: " + lat;
    document.querySelector(".long").innerText = "Longitude: " + lon;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
    document.querySelector(".feels").innerText = "Feels Like: " + feels_like;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";

  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

};

let zipcode = {
  apiKey: "1f050409a5416d907f466e2dc4ef7607",

  findCoordByZipcode: function (zip, countrycode) {
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countrycode}&appid=${this.apiKey}`).then((response) => {
      if(!response.ok){
        alert("No coordenate found or the zipcode might be wrong!");
         throw new Error("No coordenate found or the zipcode might be wrong!");
      }
       return response.json();
    }).then((data) => this.diplayCoordinates(data));

  },//end findCoordByZipcode

  diplayCoordinates: function(data){
    const { country } = data;
    const { lat, lon } = data;
  
    document.querySelector(".country").innerText = "Country: " + country;
    document.querySelector(".latitude").innerText = "Latitude: " + lat;
    document.querySelector(".longitude").innerText = "Longitude: " + lon;
  },// end displayCoordinates

  searchzip: function () {
  
       let input = document.querySelector(".search-bar-zip").value;

       if(input == 0 || input == " " || input == undefined){
        alert("Please enter a zipcode and a country code!");
       }
       else{
           let arr = input.split(",");
           this.findCoordByZipcode(arr[0].toUpperCase(), arr[1].toUpperCase());
       }
  },// end searchzip function

};

//Weather search
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });


  //Zipcode search
  document
    .querySelector(".searchzip button").addEventListener("click", function () {
      zipcode.searchzip();
    });

    document
      .querySelector(".search-bar-zip")
      .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
          zipcode.searchzip();
        }
      });


weather.fetchWeather("London");

