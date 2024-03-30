const getDataBtn = document.querySelector(".get-data-button");
const clearDataBtn = document.querySelector(".clear-data-button");
const inputElement = document.getElementById("input");
const activeCases = document.querySelector(".active-cases");
const newCases = document.querySelector(".new-cases");
const recoveredCases = document.querySelector(".recovered-cases");
const totalCases = document.querySelector(".total-cases");
const totalDeaths = document.querySelector(".total-deaths");
const totalTests = document.querySelector(".total-tests");
const countryName = document.querySelector(".country-name");
const population = document.querySelector(".population");
const errorMessage = document.querySelector(".error-message");
const cases = document.querySelectorAll(".cases");
const loaders = document.querySelectorAll(".loader");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "17b1f86227msh93f8dc5215801b7p1896a2jsn1a24efa1a709",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  },
};

/* ---------- Helper Functions ---------- */
const getData = async (url) => {
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
  return result;
};

const clearData = () => {
  countryName.innerHTML = "";
  population.innerHTML = "";
  activeCases.innerHTML = "";
  newCases.innerHTML = "";
  recoveredCases.innerHTML = "";
  totalCases.innerHTML = "";
  totalDeaths.innerHTML = "";
  totalTests.innerHTML = "";
  errorMessage.style.display = "none";
};

const showLoaders = () => {
  clearData();
  loaders.forEach((loader) => {
    loader.style.display = "block";
  });
  setTimeout(() => {
    loaders.forEach((loader) => {
      loader.style.display = "none";
    });
    showStats();
  }, 2000);
};

const displayData = (element, value) => {
  if (typeof value === "number" || typeof value === "string") {
    element.innerHTML = value.toLocaleString();
  } else {
    element.innerHTML = "Data not available";
  }
};

const handleSuccessfulFetch = (result) => {
  if (result && result.response) {
    let data = result.response[0];
    countryName.innerHTML = `Country: ${data.country}`;
    population.innerHTML = `Populaton: ${data.population.toLocaleString()}`;

    /* Checks if the data is a Number, String or Null. */
    displayData(activeCases, data.cases.active);
    displayData(newCases, data.cases.new);
    displayData(recoveredCases, data.cases.recovered);
    displayData(totalCases, data.cases.total);
    displayData(totalDeaths, data.deaths.total);
    displayData(totalTests, data.tests.total);

    errorMessage.style.display = "none";
    inputElement.value = "";
  }
};

const handleFetchError = () => {
  countryName.innerHTML = "Invalid Country Name";
  population.innerHTML = `Data not available`;
  activeCases.innerHTML = "Data not available";
  newCases.innerHTML = "Data not available";
  errorMessage.style.display = "block";
  recoveredCases.innerHTML = "Data not available";
  totalCases.innerHTML = "Data not available";
  totalDeaths.innerHTML = "Data not available";
  totalTests.innerHTML = "Data not available";
  inputElement.value = "";
};

const showStats = () => {
  const country = inputElement.value;
  let url = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;

  getData(url)
    .then((result) => {
      handleSuccessfulFetch(result);
      console.log(result);
    })
    .catch((error) => {
      handleFetchError();
      console.error(error);
    });
};

// Event Listeners
getDataBtn.addEventListener("click", showLoaders);

clearDataBtn.addEventListener("click", clearData);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showLoaders();
  }
});
