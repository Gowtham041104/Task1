// src/api.js

const apiUrl = process.env.REACT_APP_API_URL || 'https://task1-v3ir.vercel.app';

// Helper to handle response
const handleResponse = async (res) => {
  if (!res.ok) {
    let error = 'API request failed';
    try {
      const data = await res.json();
      error = data.message || error;
    } catch {
      // not JSON
    }
    throw new Error(error);
  }
  return res.json();
};

// Helper to get auth headers
const authHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  if (userInfo.token) {
    return { Authorization: `Bearer ${userInfo.token}` };
  }
  return {};
};

// 🟢 Fetch products
export const fetchProducts = () => {
  return fetch(`${apiUrl}/api/products`, {
    headers: { ...authHeader() }
  }).then(handleResponse);
};

// 🟢 Login
export const login = (email, password) => {
  return fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

// 🟢 Signup
export const signup = (email, password) => {
  return fetch(`${apiUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

// 🟢 Create product
export const createProduct = (productData) => {
  return fetch(`${apiUrl}/api/products`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(productData),
  }).then(handleResponse);
};

// 🟢 Update product
export const updateProduct = (id, productData) => {
  return fetch(`${apiUrl}/api/products/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(productData),
  }).then(handleResponse);
};

// 🟢 Delete product
export const deleteProduct = (id) => {
  return fetch(`${apiUrl}/api/products/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() }
  }).then(handleResponse);
};
// 🟢 Fetch all tenants
export const fetchTenants = () => {
  return fetch(`${apiUrl}/api/tenants`, {
    headers: { ...authHeader() }
  }).then(handleResponse);
};

// 🟢 Create tenant
export const createTenant = (tenantData) => {
  return fetch(`${apiUrl}/api/tenants`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(tenantData),
  }).then(handleResponse);
};

// 🟢 Update tenant
export const updateTenant = (id, tenantData) => {
  return fetch(`${apiUrl}/api/tenants/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(tenantData),
  }).then(handleResponse);
};

// 🟢 Delete tenant
export const deleteTenant = (id) => {
  return fetch(`${apiUrl}/api/tenants/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() }
  }).then(handleResponse);
};

// 🟢 Get tenant details
export const getTenantDetails = (id) => {
  return fetch(`${apiUrl}/api/tenants/${id}`, {
    headers: { ...authHeader() }
  }).then(handleResponse);
};
