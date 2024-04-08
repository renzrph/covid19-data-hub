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
