
const mainContainer = document.getElementById('main');

const searchButton = () => {
    const input = document.getElementById('input-value');
    const searchText = input.value;

    const error = document.getElementById('error');
    if (searchText == '') {
        error.innerText = 'Please input your phone name !!';
        mainContainer.innerHTML = '';
    }
    else {
        mainContainer.innerHTML = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                if (data.status == false) {
                    error.innerText = 'Sorry!! Your phone is not Found'
                }
                else {
                    displayAllPhone(data.data)
                }
            });
        input.value = '';// clear input search text
        error.innerText = ''
    }
}

const displayAllPhone = (phones) => {

    for (const phone of phones) {
        // console.log(phone);

        const div = document.createElement('div');
        div.className = "col-lg-4 col-md-6 col-sm-12 mb-3";
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.phone_name}  </h5>
                    <h5 class="card-title">Brand: ${phone.brand}  </h5>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
                </div>
            </div>
        `;
        mainContainer.appendChild(div)
    }
}

const phoneDetails = (id) => {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => console.log(data.data))
}