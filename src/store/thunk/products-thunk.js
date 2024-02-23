import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../service/api';

// ********** get ids product **********
export const fetchIDSProducts = createAsyncThunk(
  'products/IDSproducts',
  async ({ dataParams }, { extra: api }) => {
    const { data } = await api.post(API_URL, dataParams);

    return data;
  }
);

// ********** get products **********
export const fetchProducts = createAsyncThunk(
  'products/products',
  async ({ dataProdParams }, { extra: api }) => {
    const { data } = await api.post(API_URL, dataProdParams);

    return data;
  }
);

// ********** get ids by filters **********
export const getbyfilters = createAsyncThunk(
  'products/getbyfilters',
  async ({ dataParams }, { extra: api }) => {
    const { data } = await api.post(API_URL, dataParams);

    return data;
  }
);
