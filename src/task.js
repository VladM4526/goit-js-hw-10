import { fetchBreeds, fetchCatByBreed } from './api-cat.js';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'slim-select/dist/slimselect.css';

const selectorsSearch = {
    select: document.querySelector('.breed-select'),
    tagOption: document.querySelector("option"),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    div : document.querySelector('.cat-info')
}

selectorsSearch.loader.classList.add("loader-hidden");
selectorsSearch.select.setAttribute("id", "slim-select");
selectorsSearch.select.addEventListener("change", onSearchImagesSelect);
selectorsSearch.tagOption.setAttribute('selected', 'selected');
selectorsSearch.tagOption.setAttribute('disabled', 'disabled');
selectorsSearch.tagOption.textContent = 'Please selected cat';

function onSearchImagesSelect(evt) {
    selectorsSearch.loader.classList.remove("loader-hidden");
    selectorsSearch.div.innerHTML = "";
    fetchCatByBreed(evt.target.value)
        .then((response) => {
            onSelectSearchCard(response.data[0].breeds[0], response.data[0]);
            selectorsSearch.loader.classList.add("loader-hidden");
        }).catch((error) => {
            Notify.failure('Error getting data. Please try again later.', {
                position: 'right-top',
                timeout: 3000,
            });
    })
}
fetchBreeds().then((response) => {
   
    onSelectOptions(response.data)
    new SlimSelect({
        select: '#slim-select'
    });
});

function onSelectOptions(arr) {
    return arr.forEach(({name, id}) => {
        const markUpOption = `<option value="${id}">${name}</option>`;
        selectorsSearch.select.insertAdjacentHTML('beforeend', markUpOption);
    });
      
};

function onSelectSearchCard({name, description, temperament}, {url}) {
    const markUpCard = `
    <img src="${url}" alt="${name}" width="460px"/>
    <div class="descrp-card">
    <p class="title-card">${name}</p>
    <p class="description">${description}</p>
    <p class="temerament">${temperament}</p>
    </div>`;
    
    selectorsSearch.div.innerHTML = markUpCard;
}