import axios from 'axios';
import md5 from 'md5';

export const API_URL = `https://api.valantis.store:41000/`;
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

  // api.interceptors.response.use(
  //   (response) => {
  //     //если все ок, то пропускаем
  //     return response;
  //   },
  //   async function (error) {
  //     const originalRequest = error.config;
  //     if (error.response.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       return api(originalRequest);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return api;
};
