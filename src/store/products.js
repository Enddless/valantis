import { createSlice } from '@reduxjs/toolkit';
import { fetchIDSProducts, fetchProducts, getbyfilters } from './thunk/products-thunk';

const initialState = {
  loadingIDS: false,
  loadingProducts: false,
  loadingBrandIDS: false,
  loadingBrand: false,
  productsIDS: [],
  productsData: [],
  filterIDS: [],
  activeFilter: '',
  activeParam: ''
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // activeFilter: (state, action) => {
    //   state.activeFilter = action.payload;
    // },
    // activeParam: (state, action) => {
    //   state.activeParam = action.payload;
    // }
  },
  extraReducers(builder) {
    builder
      // ids
      .addCase(fetchIDSProducts.pending, (state) => {
        state.loadingIDS = true;
      })
      .addCase(fetchIDSProducts.fulfilled, (state, action) => {
        state.loadingIDS = false;
        state.productsIDS = action.payload;
      })
      .addCase(fetchIDSProducts.rejected, (state) => {
        state.loadingIDS = false;
      })
      //   pdoducts
      .addCase(fetchProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.productsData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loadingProducts = false;
      })
      // ids by brand
      .addCase(getbyfilters.pending, (state) => {
        state.loadingBrandIDS = true;
      })
      .addCase(getbyfilters.fulfilled, (state, action) => {
        state.loadingBrandIDS = false;
        state.productsIDS = action.payload;
      })
      .addCase(getbyfilters.rejected, (state) => {
        state.loadingBrandIDS = false;
      });
  }
});

// export const { activeFilter, activeParam } = productsSlice.actions;
