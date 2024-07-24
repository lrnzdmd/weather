



const city = "roma";

const cityData = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=2BQ6Q849MVJELRWVMFGEMZRR6&contentType=json`, { mode: "cors" })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response error: " + response.statusText);
        }
        return response.json();
    }).catch(error => {
        console.error("Error fetching data from weather API: ",error);
    });

console.log(cityData);