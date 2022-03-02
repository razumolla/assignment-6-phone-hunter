
const mainContainer = document.getElementById('main');
const details = document.getElementById('details');

const searchButton = () => {
    const input = document.getElementById('input-value');
    const searchText = input.value;

    const error = document.getElementById('error');
    if (searchText == '') {
        error.innerText = 'Please input your phone name !!';
        mainContainer.innerHTML = ''; // phones clear for wrong input
        details.innerHTML = ''; //details clear for wrong input
    }
    else {
        mainContainer.innerHTML = ''; //old phones clear for new search
        details.innerHTML = ''; //details clear for new search
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
    const first20Phone = phones.slice(0, 20) //bonous condition

    for (const phone of first20Phone) {
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
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => showPhonedetails(data.data))
}

const showPhonedetails = (phone) => {

    console.log(phone);
    const div = document.createElement('div')
    details.innerHTML = ''
    div.innerHTML = `
        <div class="card mb-3  mx-auto w-100 border border-success bg-transparent" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h4 class="card-title">Brand: ${phone.brand}  </h4>
                    <h4 class="card-title">Name: ${phone.name}  </h4>
                    <p class="card-title"> <strong>ChipSet: </strong> ${phone.mainFeatures.chipSet}</p>
                    <p class="card-title"> <strong>Display-Size: </strong> ${phone.mainFeatures.displaySize}</p>
                    <p class="card-title"><strong>Memory: </strong> ${phone.mainFeatures.memory} </p
                    <p class="card-title"><strong>Sensor: </strong> ${phone.mainFeatures.sensors} </p
                    <p class="card-title"><strong> Bluetooth: </strong> ${phone.others.Bluetooth} </p
                    <p class="card-title"><strong> GPS: </strong> ${phone.others.GPS} </p
                    <p class="card-title"><strong> NFC: </strong> ${phone.others.NFC} </p
                    <p class="card-title"><strong> Radio: </strong> ${phone.others.Radio} </p
                    <p class="card-title"><strong> USB: </strong> ${phone.others.USB} </p
                    <p class="card-title"><strong> WLAN: </strong> ${phone.others.WLAN} </p
                    <p class="card-title"><strong>Release-Date: </strong> ${phone.releaseDate ? phone.releaseDate : 'No release date found!'}  </h5>
                    </div >
                </div >
            </div >
        </div >
    `;
    details.appendChild(div)
}