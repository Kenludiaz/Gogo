let btn = document.querySelector('.search-btn');

const search = (e) => {
    e.preventDefault();

    console.log("Searching");
}

btn.addEventListener('click', search);