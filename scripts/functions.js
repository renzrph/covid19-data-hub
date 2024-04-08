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
  if (inputElement.value.trim() === "") {
    return alert("Enter a country name.");
  }

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

const showStats = async () => {
  try {
    const country = inputElement.value;
    let url = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
    const result = await getData(url);
    handleSuccessfulFetch(result);
    console.log(result);
  } catch (error) {
    handleFetchError();
    console.error(error);
  }
};

// Event Listeners
getDataBtn.addEventListener("click", showLoaders);

clearDataBtn.addEventListener("click", clearData);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showLoaders();
  }
});

// Input validation letters only
inputElement.addEventListener("input", () => {
  const lettersOnly = /^[A-Za-z]+$/;
  const inputValue = inputElement.value;

  if (!inputValue.match(lettersOnly)) {
    inputElement.value = inputValue.replace(/[^A-Za-z]/g, "");
  }
});
