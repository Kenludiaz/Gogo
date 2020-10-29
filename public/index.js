//Creating lists
let physicalCurrenciesList = [];
let digitalCurrenciesList = [];

const getPhysicalCurrencies = async (physicalCurrenciesList) => {
  const physCurr = await fetch("./physical_currency_list.csv");
  const physText = await physCurr.text();
  const physArr = physText.split("\r\n").splice(1);
  const physData = physArr.map((item) => item.split(","));
  physData.pop();
  physData.forEach((item) => {
    physicalCurrenciesList.push({
      value: item[0],
      label: item[1],
    });
  });
  return physData;
};

const getDigitalCurrencies = async (digitalCurrenciesList) => {
  const digCurr = await fetch("./digital_currency_list.csv");
  const digText = await digCurr.text();
  const digArr = digText.split("\r\n").splice(1);
  const digData = digArr.map((item) => item.split(","));
  digData.pop();
  digData.forEach((item) => {
    digitalCurrenciesList.push({
      value: item[0],
      label: item[1],
    });
  });
  return digData;
};
getDigitalCurrencies(digitalCurrenciesList).catch((e) => console.log(e));
getPhysicalCurrencies(physicalCurrenciesList).catch((e) => console.log(e));
// console.log(physicalCurrenciesList, digitalCurrenciesList);

let digitalInputs = document.querySelectorAll(".digitalCurrencyInput");
let physicalInputs = document.querySelectorAll(".physicalCurrencyInput");
// console.log(digitalInputs, physicalInputs);

digitalInputs.forEach((inputElement) => {
  autocomplete({
    input: inputElement,
    fetch: function (text, update) {
      text = text.toLowerCase();
      var suggestions = digitalCurrenciesList.filter((n) =>
        n.label.toLowerCase().startsWith(text)
      );
      update(suggestions);
    },
    onSelect: function (item) {
      inputElement.value = item.value;
    },
  });
});

physicalInputs.forEach((inputElement) => {
  autocomplete({
    input: inputElement,
    fetch: function (text, update) {
      text = text.toLowerCase();
      var suggestions = physicalCurrenciesList.filter((n) =>
        n.label.toLowerCase().startsWith(text)
      );
      update(suggestions);
    },
    onSelect: function (item) {
      inputElement.value = item.value;
    },
  });
});

// Adding api call to button
let btn = document.querySelectorAll(".form__btn");
const search = async (e) => {
  console.log(e.target);
  e.preventDefault();
  let from = e.target.form[0].value;
  let to = e.target.form[1].value;

  let response = await fetch(`/api/${from}-${to}`);
  let results = await response.json();
  console.log(results);
  let exchPrice =
    results["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    let text = exchPrice || "Unable to get data at this time.";
  if (text != undefined) {
    text = `The current exchange rate from ${from} to ${to} is ${text}.`;
  }
  document.querySelector(".results").innerHTML = text;
};

btn.forEach(item => item.addEventListener("click", search))
