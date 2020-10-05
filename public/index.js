let btn = document.querySelector('.search-btn');

const search = async (e) => {
    e.preventDefault();
    let search = document.querySelector('.search');
    console.log(search.value);
    let response = await fetch("/api");
    let json = await response.json();
    console.log(json);
}

btn.addEventListener('click', search);