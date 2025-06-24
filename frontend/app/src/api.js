// src/api.js (or wherever you want to place this)

const apiUrl = process.env.REACT_APP_API_URL || '';

// Helper to handle response
const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API request failed');
  }
  return res.json();
};

// 🟢 Fetch products
export const fetchProducts = () => {
  return fetch(`${apiUrl}/api/products`)
    .then(handleResponse);
};

// 🟢 Login
export const login = (email, password) => {
  return fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  .then(handleResponse);
};

// 🟢 Signup
export const signup = (email, password) => {
  return fetch(`${apiUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  .then(handleResponse);
};

// 🟢 Create product
export const createProduct = (productData) => {
  return fetch(`${apiUrl}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })
  .then(handleResponse);
};

// 🟢 Update product
export const updateProduct = (id, productData) => {
  return fetch(`${apiUrl}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })
  .then(handleResponse);
};

// 🟢 Delete product
export const deleteProduct = (id) => {
  return fetch(`${apiUrl}/api/products/${id}`, {
    method: 'DELETE'
  })
  .then(handleResponse);
};

// 🟢 Fetch all tenants
export const fetchTenants = () => {
  return fetch(`${apiUrl}/api/tenants`)
    .then(handleResponse);
};

// 🟢 Create tenant
export const createTenant = (tenantData) => {
  return fetch(`${apiUrl}/api/tenants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenantData),
  }).then(handleResponse);
};

// 🟢 Update tenant
export const updateTenant = (id, tenantData) => {
  return fetch(`${apiUrl}/api/tenants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenantData),
  }).then(handleResponse);
};

// 🟢 Delete tenant
export const deleteTenant = (id) => {
  return fetch(`${apiUrl}/api/tenants/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
};

// 🟢 Get tenant by ID (optional helper)
export const fetchTenantById = (id) => {
  return fetch(`${apiUrl}/api/tenants/${id}`)
    .then(handleResponse);
};

// (existing product + auth helpers below)
// ...
