//Creating lists
const getPhysicalCurrencies = async () => {
    const physCurr = await fetch('./physical_currency_list.csv');
    const physText = await physCurr.text();
    const physArr = physText.split('\r\n').splice(1);
    const physData = physArr.map( item => item.split(','));
    physData.pop();
    
    return physData;
}
const getDigitalCurrencies = async () => {
    const digCurr = await fetch('./digital_currency_list.csv');
    const digText = await digCurr.text();
    const digArr = digText.split('\r\n').splice(1);
    const digData = digArr.map( item => item.split(','));
    digData.pop();
    return digData;
}
const physicalCurrenciesList = getPhysicalCurrencies().then(item => console.log(item));
const digitalCurrenciesList = getDigitalCurrencies();

let digitalInputs = document.querySelectorAll('.digital-input');
let physicalInputs = document.querySelectorAll('.physical-input');

digitalInputs.forEach( item => {
    autocomplete({
        input: item,
        fetch: function(text, update) {
            text = text.toLowerCase();
            // you can also use AJAX requests instead of preloaded data
            var suggestions = digitalCurrenciesList.filter(n => n[1].toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item[0];
        }
    })
});
physicalInputs.forEach( item => {
    // console.log(item);
    autocomplete({
        input: item,
        fetch: function(text, update) {
            text = text.toLowerCase();
            // you can also use AJAX requests instead of preloaded data
            var suggestions = physicalCurrenciesList.filter(n => n[1].toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item[0];
        }
    })
});





// Adding api call to button
let btn = document.querySelector('.search-btn');
const search = async (e) => {
    e.preventDefault();
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;
    if (to in digData & from in physData)
    {
        //Need to add better error handeling
        alert("Invalid API Call.")
    }
    
    
    let response = await fetch(`/api/${from}-${to}`);
    let results = await response.json();


    let exchPrice = results['Realtime Currency Exchange Rate']["5. Exchange Rate"];
    text = exchPrice || "Unable to get data at this time.";
    if (text != undefined)
    {
        text = `The current exchange rate for these currencies is ${text}.`
    }
    document.querySelector('.results').innerHTML = text;
}

btn.addEventListener('click', search);