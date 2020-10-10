let btn = document.querySelector('.search-btn');

const search = async (e) => {
    e.preventDefault();
    let search = document.querySelector('.search');
    let to = document.querySelector('.search').value;
    // console.log(search.value);

    let from = search.value;
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
    console.log(physData);

    const digCurr = await fetch('./digital_currency_list.csv');
    const digText = await digCurr.text();
    const digArr = digText.split('\r\n').splice(1);
    const digData = digArr.map( item => item.split(','));
    // console.log(digCurrArr);

    const data = [...digData, ...physData];
    const table = data
    
    
    
}

generateList();