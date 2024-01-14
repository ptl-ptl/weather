function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      alt="weather-icon"
      class="weather-app-icon"
    />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "67b3fe199e6a5df80a44a5o53t65b217";
  let urlApi = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(urlApi).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function getForecast(city) {
  let apiKey = "67b3fe199e6a5df80a44a5o53t65b217";
  let urlApi = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(urlApi).then(displayForecast);
}
function displayForecast(response) {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-icon">
        <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
        alt="weather-icon"
        width="60"
        />
      </div>
      <div class="weather-forecast-temperatures">
      <span class="forecast-temp-max">18°</span>
      <span class="forecast-temp-min">12°</span>
      </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Paris");

/*  <div class="weather-forecast">
          <div class="row">
            <div class="col-2">
              <div class="weather-forecast-date">Thu</div>
              <div class="weather-forecast-icon">
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                  alt="weather-icon"
                  width="60"
                />
              </div>
              <div class="weather-forecast-temperatures">
                <span class="forecast-temp-max">18°</span>
                <span class="forecast-temp-min">12°</span>
              </div>
            </div>
          </div>
        </div>
*/
