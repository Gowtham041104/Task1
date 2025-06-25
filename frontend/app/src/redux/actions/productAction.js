import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstant';

import {
  fetchProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from '../../api';  // adjust path if needed

// List products
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const data = await fetchProducts();
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// Create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const data = await apiCreateProduct(productData);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.message });
  }
};

// Update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    const data = await apiUpdateProduct(id, productData);
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await apiDeleteProduct(id);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

// Get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch product details');
    const data = await res.json();
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};
