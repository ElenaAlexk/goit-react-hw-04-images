const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33659808-72e4fba519044bf5ffbd61554';

export const getImages = (searchText, page = 1) => {
  const params = new URLSearchParams({
    q: searchText,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  return fetch(`${BASE_URL}?${params}`);
};
