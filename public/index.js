

//Creating lists

const physCurr = fetch('./physical_currency_list.csv');
const physText = physCurr.text();
const physArr = physText.split('\r\n').splice(1);
const physData = physArr.map( item => item.split(','));
physData.pop();

const digCurr = fetch('./digital_currency_list.csv');
const digText = digCurr.text();
const digArr = digText.split('\r\n').splice(1);
const digData = digArr.map( item => item.split(','));
digData.pop();

const data = [...digData, ...physData];

const currencyList = document.querySelectorAll('.currencyList');


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


function chooseAutoComplete() {
    //See if either field is filled
    //if so make the other field a phys auto complete
    digField = currencyList.findIndex(x => x in digData);

    if (currencyList.every(x => x.value == null)) {
        currencyList.forEach( item => item.addEventListener('input', fillBothList));
    }
    else if(digField >= 0) {
        let otherIndex;
        if (digField == 0) {
            otherIndex = 1;
        }
        else {
            otherIndex = 0;
        }
        currencyList[otherIndex].removeEventListener('input', fillBothList);
        currencyList[otherIndex].addEventListener('input', fillPhysList);
    }
}
currencyList.forEach( item => item.addEventListener('input', chooseAutoComplete));





const checkInput = (currencyList) => {
    if (currencyList.every( item => {
        item.value in digData
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

// currencyList.forEach(item => item.addEventListener('onchange', checkInput(currencyList)));




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