/*
=============== 
NAV
===============
*/

const containerSub = document.querySelectorAll('.container-sub');
const btnDown = document.querySelectorAll('.btn-down');

btnDown.forEach(btn => {
    let id;
    btn.addEventListener('click', (e) => {
        id = e.target.getAttribute("data-id")
        containerSub[id].classList.toggle('container-show');
    })
});

/*
=============== 
Data Format
===============
*/
const dataFormatElement = document.querySelectorAll('.dataFormat');

if (dataFormatElement !== null) {
    dataFormatElement.forEach(dataFormat => {
        let df = dataFormat.textContent.split(/[: -]/);
        const newFormatDate = `${df[2]} ${df[1]} ${df[3]}`;
        dataFormat.textContent = newFormatDate
    })
};


/*
=============== 
Data Format
===============
*/

const dataNow = document.getElementById('dataNow');

if (dataNow !== null) {
    const data = new Date().toLocaleString()
    dataNow.innerHTML = data
};

/*
=============== 
CATEGORY TRIM
===============
*/

const categoryTableImgElement = document.querySelectorAll('.category__table-img');

if (categoryTableImgElement !== null) {
    categoryTableImgElement.forEach(categoryTable => {
        let substr = categoryTable.textContent.substr(0, 50);
        categoryTable.textContent = `${substr}...`
    })
};