import axios from 'axios';

const API_KEY = '4f5bb813ac89f5b80d59faf20e0e0065';
const baseURL = 'https://api.themoviedb.org/3/';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchTrendingMovies = async () => {
  const target = `${baseURL}trending/movie/day?api_key=${API_KEY}`;
  const response = await axios.get(target);
  return response.data.results;
};

export const fetchMoviesByQuery = async query => {
  const target = `${baseURL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
  const response = await axios.get(target);
  return response.data.results;
};

export const fetchMovieDetails = async id => {
  const target = `${baseURL}movie/${id}?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(target);
  return response.data;
};

export const fetchMovieCast = async id => {
  const target = `${baseURL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(target);
  return response.data.cast;
};

export const fetchMovieReviews = async id => {
  const target = `${baseURL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  const response = await axios.get(target);
  return response.data.results;
};

const api = {
  fetchTrendingMovies,
  fetchMoviesByQuery,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};

export default api;
