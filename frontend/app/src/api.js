// Set API URL from env or fallback to deployed backend
const apiUrl = process.env.REACT_APP_API_URL || 'https://task1-v3ir.vercel.app';

// Handle API responses
const handleResponse = async (res) => {
  if (!res.ok) {
    let error = 'API request failed';
    try {
      const data = await res.json();
      error = data.message || error;
    } catch {
      // response body is not JSON
    }
    throw new Error(error);
  }
  return res.json();
};

// 🟢 PRODUCTS
export const fetchProducts = () => {
  return fetch(`${apiUrl}/api/products`).then(handleResponse);
};

export const createProduct = (productData) => {
  return fetch(`${apiUrl}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  }).then(handleResponse);
};

export const updateProduct = (id, productData) => {
  return fetch(`${apiUrl}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  }).then(handleResponse);
};

export const deleteProduct = (id) => {
  return fetch(`${apiUrl}/api/products/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
};

// 🟢 AUTH
export const signup = (email, password) => {
  return fetch(`${apiUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const login = (email, password) => {
  return fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

// 🟢 TENANTS
export const fetchTenants = () => {
  return fetch(`${apiUrl}/api/tenants`).then(handleResponse);
};

export const createTenant = (tenantData) => {
  return fetch(`${apiUrl}/api/tenants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenantData),
  }).then(handleResponse);
};

export const updateTenant = (id, tenantData) => {
  return fetch(`${apiUrl}/api/tenants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenantData),
  }).then(handleResponse);
};

export const deleteTenant = (id) => {
  return fetch(`${apiUrl}/api/tenants/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
};
