import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Kh9WSFokXK8KsoQmOoH1fQQRCMb8P3LgVE4UQdx27mkfmyQoUC6OLU5xbhachuU8";

const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_BREEDS = 'breeds';
const END_POINT_SEARCH = 'images/search';

export function fetchBreeds() {
    return axios.get(`${BASE_URL}${END_POINT_BREEDS}`);    
};
export function fetchCatByBreed(breedId) {
    const url = `${BASE_URL}${END_POINT_SEARCH}?breed_ids='${breedId}'`
    console.log(url);
    return axios.get(`${BASE_URL}${END_POINT_SEARCH}?breed_ids=${breedId}`);
}