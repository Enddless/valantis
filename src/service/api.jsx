import axios from 'axios';
import md5 from 'md5';

export const API_URL = `http://api.valantis.store:40000/`;

export const createAPI = () => {
  const api = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // функция для генерации токена в виде "password__datastamp"
  const generateToken = () => {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const token = md5(`Valantis_${currentDate}`);
    return token;
  };

  // исходящие запросы
  api.interceptors.request.use((config) => {
    const xtoken = generateToken();

    if (xtoken && config.headers) {
      config.headers['X-Auth'] = xtoken;
    }

    return config;
  });

  return api;
};
