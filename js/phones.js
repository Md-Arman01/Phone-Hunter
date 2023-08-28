function phonesData(searchPhone) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
    .then((response) => response.json())
    .then((json) => data(json));
}

function data(json) {
  let phones = json.data;
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  console.log(phones.length);
  const showBtn = document.getElementById("show-btn");
  if (phones.length > 50) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }
  phones = phones.slice(0, 50);

  phones.forEach((element) => {
    // console.log(element.slug)
    const cardDiv = document.createElement("div");
    cardDiv.classList = `card bg-base-100 shadow-xl`;
    cardDiv.innerHTML = `
        <figure class="px-10 pt-10">
                      <img src="${element.image}" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${element.phone_name}</h2>
                      <p>Brand : ${element.brand}</p>
                      <div class="card-actions">
                        <button onclick="showDetailsBtn('${element.slug}'),my_modal_5.showModal()" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
    cardContainer.appendChild(cardDiv);
  });

  loadingToggleCall(false);
}
function phoneSearch() {
  loadingToggleCall(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  phonesData(searchText);
}
function loadingToggleCall(isLoading) {
  const loadingToggle = document.getElementById("loading-toggle");
  if (isLoading) {
    loadingToggle.classList.remove("hidden");
  } else {
    loadingToggle.classList.add("hidden");
  }
}
const showDetailsBtn = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((response) => response.json())
    .then((details) => model(details));

  function model(details) {
    let modelDetails = details;
    console.log(modelDetails);

    // image
    const modelImage = document.getElementById("model-image");
    modelImage.innerHTML = `
    <img src="${modelDetails.data.image}" alt="Shoes" class="rounded-xl" />
    `;
    // name
    const modelName = document.getElementById("model-name");
    modelName.innerText = modelDetails.data.name;
    // strong
    const modelStorage = document.getElementById("model-storage");
    modelStorage.innerText = modelDetails.data.mainFeatures.storage;
    // Display
    const modelDisplay = document.getElementById("model-display");
    modelDisplay.innerText = modelDetails.data.mainFeatures.displaySize;
    // Chipset
    const modelChipset = document.getElementById("model-chipset");
    modelChipset.innerText = modelDetails.data.mainFeatures.chipSet;
    // Memory
    const modelMemory = document.getElementById("model-memory");
    modelMemory.innerText = modelDetails.data.mainFeatures.memory;
    // Slug
    const modelSlug = document.getElementById("model-slug");
    modelSlug.innerText = modelDetails.data.slug;
    // Release
    const modelRelease = document.getElementById("model-release");
    modelRelease.innerText = modelDetails.data.releaseDate;
    // Brand
    const modelBrand = document.getElementById("model-brand");
    modelBrand.innerText = modelDetails.data.brand;
    // Gps
    const modelGps = document.getElementById("model-gps");
    modelGps.innerText = modelDetails.data.others.GPS;
  }
};

// phonesData();
