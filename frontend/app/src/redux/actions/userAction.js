import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants';

// Get API base URL from env or fallback
const API_URL = process.env.REACT_APP_API_URL || 'https://task1-v3ir.vercel.app';

/**
 * User login action
 * @param {string} email 
 * @param {string} password 
 */
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `${API_URL}/api/auth/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.',
    });
  }
};

/**
 * User registration action
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 */
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `${API_URL}/api/auth/signup`,
      { username, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); // auto-login after register

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Registration failed. Please try again.',
    });
  }
};

/**
 * User logout action
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');

  dispatch({ type: USER_LOGOUT });
};

// For backward compatibility
export const signup = register;
