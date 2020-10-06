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
    
    const physCurr = await fetch('./physical');
    const physCurrJson = await physCurr.json();
    
    const digCurr = await fetch('./digital');
    const digCurrJson = await digCurr.json();
    
    const data = {...digCurr, ...physCurr};
    const table = data.split(',');
    
    console.log(table);
    
}

btn.addEventListener('click', generateList);