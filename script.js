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

const handleSuccessfulFetch = (result) => {
  if (result && result.response) {
    let data = result.response[0];
    countryName.innerHTML = `Country: ${data.country}`;
    population.innerHTML = `Populaton: ${data.population.toLocaleString()}`;

    /* Checks if the data is a Number or Null. */
    typeof data.cases.active === "number" ||
    typeof data.cases.active === "string"
      ? (activeCases.innerHTML = data.cases.active.toLocaleString())
      : (activeCases.innerHTML = "Data not available");
    typeof data.cases.new === "number" || typeof data.cases.new === "string"
      ? (newCases.innerHTML = data.cases.new.toLocaleString())
      : (newCases.innerHTML = "Data not available");
    typeof data.cases.recovered === "number" ||
    typeof data.cases.recovered === "string"
      ? (recoveredCases.innerHTML = data.cases.recovered.toLocaleString())
      : (recoveredCases.innerHTML = "Data not available");
    typeof data.cases.total === "number" || typeof data.cases.total === "string"
      ? (totalCases.innerHTML = data.cases.total.toLocaleString())
      : (totalCases.innerHTML = "Data not available");
    typeof data.deaths.total === "number" ||
    typeof data.deaths.total === "string"
      ? (totalDeaths.innerHTML = data.deaths.total.toLocaleString())
      : (totalDeaths.innerHTML = "Data not available");
    typeof data.tests.total === "number" || typeof data.tests.total === "string"
      ? (totalTests.innerHTML = data.tests.total.toLocaleString())
      : (totalTests.innerHTML = "Data not available");

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
