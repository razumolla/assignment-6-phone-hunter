
const mainContainer = document.getElementById('main');

const searchButton = () => {
    const input = document.getElementById('input-value');
    const searchText = input.value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayAllPhone(data.data))
}

const displayAllPhone = (phones) => {

    for (const phone of phones) {
        // console.log(phone);

        const div = document.createElement('div');
        div.className = "col-lg-4 col-sm-12 mb-3";
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.phone_name}  </h5>
                    <button onclick="phoneDetails()" class="btn btn-primary">See Details</button>
                </div>
            </div>
        `;
        mainContainer.appendChild(div)
    }
}