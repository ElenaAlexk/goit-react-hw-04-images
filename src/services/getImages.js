import axios from 'axios';

export const getImages = async (query, page) => {
  const respons = await axios.get('https://pixabay.com/api/', {
    method: 'get',
    params: {
      key: '33659808-72e4fba519044bf5ffbd61554',
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return respons.data;
};
