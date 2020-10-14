

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
    // console.log(currencyList);
    
    //Create elements based on data
    //Append them to both elements on currencyList
const generateList = async () => {
    physData.forEach(element => {
        let optionFrom = document.createElement('option');
        optionFrom.value = element[0];
        optionFrom.innerHTML = `${element[0]}, ${element[1]}`;
        currencyList[0].appendChild(optionFrom);
    });

    digData.forEach( element => {
        let optionTo = document.createElement('option');
        optionTo.value = element[0];
        optionTo.innerHTML = `${element[0]}, ${element[1]}`;
        currencyList[1].appendChild(optionTo);

    });
    
}

generateList().catch(e => console.log(e));

const changeList = async () => {
    let from = document.querySelector('#currencyTypeFrom');
    let to = document.querySelector('#currencyTypeTo');

    if (from.value == "digital") {
        digData.forEach(element => {
            let optionFrom = document.createElement('option');
            optionFrom.value = element[0];
            optionFrom.innerHTML = `${element[0]}, ${element[1]}`;
            currencyList[0].appendChild(optionFrom);
        });
    }
    else if (from.value == "physical") {
        physData.forEach(element => {
            let optionFrom = document.createElement('option');
            optionFrom.value = element[0];
            optionFrom.innerHTML = `${element[0]}, ${element[1]}`;
            currencyList[0].appendChild(optionFrom);
        });
    }
    else if (to.value == "digital") {
        digData.forEach(element => {
            let optionFrom = document.createElement('option');
            optionFrom.value = element[0];
            optionFrom.innerHTML = `${element[0]}, ${element[1]}`;
            currencyList[1].appendChild(optionFrom);
        });
    }
    else if (to.value == "physical") {
        physData.forEach(element => {
            let optionFrom = document.createElement('option');
            optionFrom.value = element[0];
            optionFrom.innerHTML = `${element[0]}, ${element[1]}`;
            currencyList[1].appendChild(optionFrom);
        });
    }
}

let currencyTypeFrom = document.addEventListener('input', changeList);
let currencyTypeTo = document.addEventListener('input', changeList);






// Adding api call to button
let btn = document.querySelector('.search-btn');
const search = async (e) => {
    e.preventDefault();
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;
    // console.log(`${to}, ${from}`);
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