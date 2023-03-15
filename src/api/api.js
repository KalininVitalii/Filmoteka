// import axios from 'axios';

// axios.defaults.baseURL = 'http://api.themoviedb.org/3/';
// const API_KEY = '6f3a72a470b06bab99f8d69f54b4e2d3';
// const END_POINT = 'trending/movie/day';

// export const fetchApi = page => {
//   return axios(END_POINT, {
//     params: {
//       page,
//       api_key: API_KEY,
//     },
//   });
// };

import axios from 'axios';

// Set the base URL for all API requests
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// Set the API key that will be used for all requests
const API_KEY = '6f3a72a470b06bab99f8d69f54b4e2d3';

// Export a function that fetches trending movies with the given page number
export const getMovies = page => {
  return axios.get('trending/movie/day', {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });
};
