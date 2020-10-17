

//Creating lists

const physCurr = await fetch('./physical_currency_list.csv');
const physText = await physCurr.text();
const physArr = physText.split('\r\n').splice(1);
const physData = physArr.map( item => item.split(','));
physData.pop();

const digCurr = await fetch('./digital_currency_list.csv');
const digText = await digCurr.text();
const digArr = digText.split('\r\n').splice(1);
const digData = digArr.map( item => item.split(','));
digData.pop();

const data = [...digData, ...physData];

const currencyList = document.querySelectorAll('.currencyList');


/* I want users to type either a physical or digital currency
    If it is a digital then he can only select a physical currency
    1- start with having both list on both fields
    1.5- If a text field is complete scan to see if it is digital,
        if digital then filter the other text field
    2- Put an onchange event handeler to see if both are digital currencies
    3-if they are put an error message

*/

const fillBothList = () => {
    autoComplete({
        input: this,
        fetch: function (text, update) {
            text = text.toLowerCase();

            let suggestions = data.filter( n => n[1].toLowerCase().startsWith(text));
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item.label;
        }
    })
}

const fillPhysList = () => {
    autoComplete({
        input: this,
        fetch: function (text, update) {
            text = text.toLowerCase();

            let suggestions = physData.filter( n => n[1].toLowerCase().startsWith(text));
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item.label;
        }
    })
}



const checkInput = (currencyList) => {
    if (currencyList.every( item => {
        item in digData
    }))
    {
        errorTxt = "[Error] Unable to convert two digital currencies.";
        const span = document.createElement('span');
        span.innerText = errorTxt;
        span.color = "Red";
        currencyList[1].borderBottom = "Red solid 5px";
        currencyList.appendChild(span);
    }
}

currencyList.forEach(item => item.addEventListener('onchange', checkInput(currencyList)));




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
    text = exchPrice || "Invalid API Call, please select two physical currencies or one digital and one physical.";
    if (text != undefined)
    {
        text = `The current exchange rate for these currencies is ${text}.`
    }
    document.querySelector('.results').innerHTML = text;
}

btn.addEventListener('click', search);