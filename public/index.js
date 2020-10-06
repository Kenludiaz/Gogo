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

btn.addEventListener('click', search);