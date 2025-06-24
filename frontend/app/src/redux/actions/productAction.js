import axios from 'axios';
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
  PRODUCT_BY_TENANT_REQUEST,
  PRODUCT_BY_TENANT_SUCCESS,
  PRODUCT_BY_TENANT_FAIL,
  PRODUCT_UPDATE_FEATURES_REQUEST,
  PRODUCT_UPDATE_FEATURES_SUCCESS,
  PRODUCT_UPDATE_FEATURES_FAIL,
} from '../constants/productConstant';

// 🌟 API base URL from environment variable or fallback
const apiUrl = process.env.REACT_APP_API_URL || 'https://task1-v3ir.vercel.app';

/**
 * Fetch all products
 */
export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${apiUrl}/api/products`, config);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Fetch products by tenant ID
 */
export const listProductsByTenant = (tenantId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_BY_TENANT_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${apiUrl}/api/products/tenant/${tenantId}`, config);

    dispatch({ type: PRODUCT_BY_TENANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_BY_TENANT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Create a product
 */
export const createProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${apiUrl}/api/products`, productData, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });

    dispatch(listProducts());
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Update a product
 */
export const updateProduct = (id, productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${apiUrl}/api/products/${id}`, productData, config);

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Delete a product
 */
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${apiUrl}/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Get product details
 */
export const getProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${apiUrl}/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Update product features
 */
export const updateProductFeatures = (id, features) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_FEATURES_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${apiUrl}/api/products/${id}/features`, { features }, config);

    dispatch({ type: PRODUCT_UPDATE_FEATURES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FEATURES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
