/*SELECTORS*/
const btn = document.querySelector("#btn");


/*Variables*/
const city = []
const key = "3f095d298f2948c182802231210906"
const days = ["3"]

let weather = {
    fetchWeather: () => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${days}&aqi=no&alerts=no`,
        )
            .then((response) => response.json())
            .then((data) => {
                //First day data append
                document.getElementById("city").innerHTML = data.location.name
                document.getElementById("temperature").innerHTML = data.current.temp_c + "°"
                document.getElementById("icon").src = data.current.condition.icon
                document.getElementById("country").innerHTML = "Country: " + data.location.country
                document.getElementById("region").innerHTML = "Region: " + data.location.region
                //Next days data append
                const days = data.forecast.forecastday
                days.forEach(high_temp => {
                    const b = document.querySelector(".next_days");
                    const div = document.createElement("div");

                    const img = document.createElement("img");
                    img.src = high_temp.day.condition.icon

                    const date = document.createElement("h5");
                    date.innerHTML = high_temp.date

                    const maxTemp = document.createElement("h3");
                    maxTemp.innerHTML = high_temp.day.maxtemp_c + "°" + " Max"
                    const minTemp = document.createElement("h3");
                    minTemp.innerHTML = high_temp.day.mintemp_c + "°" + " Min"
                    div.append(img)
                    div.append(date)
                    div.append(maxTemp)
                    div.append(minTemp)
                    b.append(div)
                })
            });

    },
    displayWeather: document.getElementById("btn").addEventListener("click", () => {
        event.preventDefault();
        const value = document.querySelector("#input").value
        city.push(value)
        weather.fetchWeather()
        city.shift()
    })
}




