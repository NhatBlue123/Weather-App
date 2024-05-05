var search = document.querySelector(".search");
var city = document.querySelector(".city");
var country = document.querySelector(".country");
var time = document.querySelector(".time");
var value = document.querySelector(".value");
var shortDesc = document.querySelector(".short-desc");
var visibility = document.querySelector(".visibility span");
var wind = document.querySelector(".wind span");
var sun = document.querySelector(".sun span");
var content = document.querySelector(".content");

var buttonSearch = document.querySelector(".search-button");
function changeBackground(temp) {
  var bodyq = document.querySelector("body");
  var weatherq = document.querySelector(".weather");
  if (temp > 30) {
    bodyq.style.background = `linear-gradient(to top, rgba(0,0,0,0.8),rgba(0,0,0,0.7)), url(hot.jpg) no-repeat center/cover;
      `;
    weatherq.style.background = `url(hot.jpg) no-repeat center/cover;
      `;
  } else if (temp < 10) {
    bodyq.style.background = `linear-gradient(to top, rgba(0,0,0,0.8),rgba(0,0,0,0.7)), url(cold.jpg) no-repeat center/cover`;
    weatherq.style.background = `url(cold.jpg) no-repeat center/cover`;
  } else if (temp >= 20 && temp < 30) {
    bodyq.style.background = `linear-gradient(to top, rgba(0,0,0,0.8),rgba(0,0,0,0.7)), url(warm.jpg) no-repeat center/cover`;
    weatherq.style.background = `url(warm.jpg) no-repeat center/cover`;
  } else if (temp < 20) {
    bodyq.style.background = `linear-gradient(to top, rgba(0,0,0,0.8),rgba(0,0,0,0.7)), url(cool.jpg) no-repeat center/cover`;
    weatherq.style.background = `url(cool.jpg) no-repeat center/cover`;
  }
}

async function changeWeather() {
  let capticalValue = search.value.trim();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capticalValue}&appid=afb79067bb9e0854edd22eeed266c8de`;
  let data = await fetch(apiURL).then((res) => res.json());
  console.log(data);
  if (data.cod == 200) {
    content.classList.remove("hide");
    if (data.name === "Turan") {
      city.innerText = `Da Nang City`;
    }else
    city.innerText = data.name;
    country.innerText = data.sys.country;
    time.innerText = new Date().toLocaleString("vi");
    visibility.innerText = data.visibility + " m";
    wind.innerText = data.wind.speed + "(m/s)";
    sun.innerText = data.main.humidity + "%";
    value.innerHTML = `${(data.main.temp - 273.15).toFixed(0)}<sup>°</sup>C`;
    shortDesc.innerText = data.weather[0].main;
    changeBackground(data.main.temp - 273.15);
  } else {
    content.classList.add("hide");
  }
}
search.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    changeWeather();
  }
});

async function onloadLocation() {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=da nang&appid=afb79067bb9e0854edd22eeed266c8de`;
  let data = await fetch(apiURL).then((res) => res.json());
  city.innerText = `Da Nang City`;
  country.innerText = data.sys.country;
  time.innerText = new Date().toLocaleString("vi");
  visibility.innerText = data.visibility + " m";
  wind.innerText = data.wind.speed + "(m/s)";
  sun.innerText = data.main.humidity + "%";
  value.innerHTML = `${(data.main.temp - 273.15).toFixed(0)}<sup>°</sup>C`;
  shortDesc.innerText = data.weather[0].main;
  changeBackground(data.main.temp - 273.15);
}

buttonSearch.addEventListener('click', ()=>{
  changeWeather();
})