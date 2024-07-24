import "./style.css"

const favouriteCities = [];

const searchbar = document.getElementById("searchinput");
const searchbtn = document.getElementById("searchbtn");
const preview = document.querySelector(".citypreviewtab");
const favcities = document.getElementById("favcities");
const favtemplate = document.getElementById("favcity");
const addButton = document.querySelector("#addbtn");

let cityTemp;
    
addButton.addEventListener("click", () => addToFavourites(cityTemp.resolvedAddress));
searchbtn.addEventListener("click", searchCity);


function searchCity()   {
    getCityPreview(searchbar.value);
}


// fetch the data from the visualcrossing api
function getCityPreview(city) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=FPJQGAQ7L3H2B3KQXACV5SLKN&contentType=json`, { mode: "cors" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            createPreviewCard(data);

        })
        .catch(error => {
            console.error("Error fetching data from weather API: ", error);
        });
}




function createPreviewCard(city) {
    cityTemp = city;

    document.querySelector(".cityname").textContent = city.resolvedAddress;
    document.querySelector(".condition").textContent = city.currentConditions.conditions;
    document.querySelector(".temp").textContent = city.currentConditions.temp + "°";
    document.querySelector(".mintemp").textContent = city.days[0].tempmin + "°";
    document.querySelector(".maxtemp").textContent = city.days[0].tempmax + "°";
    document.querySelector(".humidity").textContent = city.currentConditions.humidity + "%";
    document.querySelector(".precipitation").textContent = city.currentConditions.precipprob + "%";

    
    
    
    preview.style.display = "flex";
    addButton.style.display = "flex";
}

function addToFavourites(city) {
    if (!favouriteCities.includes(city)) {
        favouriteCities.push(city);
        refreshPage();
    } else {
        console.log(`${city} è già nei preferiti.`);
    }
}

function refreshPage() {
        favcities.innerHTML = "";
        favouriteCities.forEach(city => getFavCities(city));
}

function createFavCard(city) {
    const favCard = favtemplate.content.cloneNode(true);

    favCard.querySelector(".cityname").textContent = city.resolvedAddress;
    favCard.querySelector(".condition").textContent = city.currentConditions.conditions;
    favCard.querySelector(".temp").textContent = city.currentConditions.temp + "°";
    favCard.querySelector(".mintemp").textContent = city.days[0].tempmin + "°";
    favCard.querySelector(".maxtemp").textContent = city.days[0].tempmax + "°";
    favCard.querySelector(".humidity").textContent = city.currentConditions.humidity + "%";
    favCard.querySelector(".precipitation").textContent = city.currentConditions.precipprob + "%";
    
    favCard.querySelector(".roundbtn").addEventListener("click", () => removeFromFavs(city.resolvedAddress));

    favcities.appendChild(favCard);
}


function getFavCities(city) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=current&key=FPJQGAQ7L3H2B3KQXACV5SLKN&contentType=json`, { mode: "cors" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            createFavCard(data);
        })
        .catch(error => {
            console.error("Error fetching data from weather API: ", error);
        });
}

function removeFromFavs(city) {
    const index = favouriteCities.findIndex(cty => cty === city);
    favouriteCities.splice(index, 1);
    console.log(favouriteCities)
    refreshPage();
}