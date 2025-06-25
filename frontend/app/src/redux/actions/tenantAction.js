import {
  TENANT_LIST_REQUEST,
  TENANT_LIST_SUCCESS,
  TENANT_LIST_FAIL,
  TENANT_CREATE_REQUEST,
  TENANT_CREATE_SUCCESS,
  TENANT_CREATE_FAIL,
  TENANT_UPDATE_REQUEST,
  TENANT_UPDATE_SUCCESS,
  TENANT_UPDATE_FAIL,
  TENANT_DELETE_REQUEST,
  TENANT_DELETE_SUCCESS,
  TENANT_DELETE_FAIL,
  TENANT_DETAILS_REQUEST,
  TENANT_DETAILS_SUCCESS,
  TENANT_DETAILS_FAIL,
} from '../constants/tenantConstant';

import {
  fetchTenants,
  createTenant as apiCreateTenant,
  updateTenant as apiUpdateTenant,
  deleteTenant as apiDeleteTenant,
  getTenantDetails as apiGetTenantDetails,
} from '../../api';  // adjust path if needed

// List tenants
export const listTenants = () => async (dispatch) => {
  try {
    dispatch({ type: TENANT_LIST_REQUEST });
    const data = await fetchTenants();
    dispatch({ type: TENANT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TENANT_LIST_FAIL, payload: error.message });
  }
};

// Create tenant
export const createTenant = (tenantData) => async (dispatch) => {
  try {
    dispatch({ type: TENANT_CREATE_REQUEST });
    const data = await apiCreateTenant(tenantData);
    dispatch({ type: TENANT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TENANT_CREATE_FAIL, payload: error.message });
  }
};

// Update tenant
export const updateTenant = (id, tenantData) => async (dispatch) => {
  try {
    dispatch({ type: TENANT_UPDATE_REQUEST });
    const data = await apiUpdateTenant(id, tenantData);
    dispatch({ type: TENANT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TENANT_UPDATE_FAIL, payload: error.message });
  }
};

// Delete tenant
export const deleteTenant = (id) => async (dispatch) => {
  try {
    dispatch({ type: TENANT_DELETE_REQUEST });
    await apiDeleteTenant(id);
    dispatch({ type: TENANT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: TENANT_DELETE_FAIL, payload: error.message });
  }
};

// Get tenant details
export const getTenantDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TENANT_DETAILS_REQUEST });
    const data = await apiGetTenantDetails(id);
    dispatch({ type: TENANT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TENANT_DETAILS_FAIL, payload: error.message });
  }
};
