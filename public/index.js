let btn = document.querySelector('.search-btn');

const search = async (e) => {
    console.log(to , "  ", from);
    e.preventDefault();
    let from = document.querySelector('#from').value;
    let to = document.querySelector('#to').value;

    let response = await fetch(`/api/${from}/${to}`);
    let json = await response.json();
    console.log(json);
}



//Creating lists

const generateList = async () => {
    
    const physCurr = await fetch('./physical_currency_list.csv');
    const physText = await physCurr.text();
    const physArr = physText.split('\r\n').splice(1);
    const physData = physArr.map( item => item.split(','));
    // console.log(physData);

    const digCurr = await fetch('./digital_currency_list.csv');
    const digText = await digCurr.text();
    const digArr = digText.split('\r\n').splice(1);
    const digData = digArr.map( item => item.split(','));
    // console.log(digCurrArr);

    const data = [...digData, ...physData];
    data.pop();
    
    const currencyList = document.querySelectorAll('.currencyList');
    // console.log(currencyList);

    //Create elements based on data
    //Append them to both elements on currencyList
    data.forEach(element => {
        let option = document.createElement('option');
        option.value = element[1];
        option.innerHTML = `${element[0]}, ${element[1]}`;
        let optionTwo = document.createElement('option');
        optionTwo.value = element[1];
        optionTwo.innerHTML = `${element[0]}, ${element[1]}`;
        currencyList[0].appendChild(option);
        currencyList[1].appendChild(optionTwo);
    });

}

generateList().catch(e => console.log(e));