const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    console.log(e);
    if (e.keyCode === 13) {
        console.log(searchBox.value);
        getWeatherInfo(searchBox.value);
    }
}

function getWeatherInfo(cityName) {
    const url = `${api.base}?q=${cityName}&units=metric&appid=${api.key}`;
    let promise = fetch(url);
    console.log(promise);

    promise.then((response) => {
        console.log(response);
        return response.json();
    }).then((responseJSON) => {

        console.log(responseJSON)
        if (responseJSON.cod === 200) {
            console.log("all good to update dom");
            displayResults(responseJSON);
        } else {
            alert(responseJSON.message);
        }
    })
        .catch(err => console.error("API Failed", err));

}

function displayResults(responseJSON) {
    console.log("Display to be updated");

    let city = document.querySelector('.city');
    city.innerText = `${responseJSON.name}, ${responseJSON.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(responseJSON.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = responseJSON.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(responseJSON.main.temp_min)}°c / ${Math.round(responseJSON.main.temp_max)}°c`;
}

function dateBuilder(d) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    const DATE_FORMAT_OPTIONS = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: "short",
    }
    return d.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS)
}