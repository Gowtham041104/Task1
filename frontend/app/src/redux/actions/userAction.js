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

// Your API URL
const apiUrl = process.env.REACT_APP_API_URL || 'https://task1-v3ir.vercel.app';

/**
 * User login action
 */
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { 
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${apiUrl}/api/auth/login`, 
      { email, password }, 
      config
    );

    dispatch({ 
      type: USER_LOGIN_SUCCESS, 
      payload: data 
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || 
              error.message ||
              'Login failed. Please try again.',
    });
  }
};

/**
 * User registration action
 */
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${apiUrl}/api/auth/signup`,
      { username, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response?.data?.message ||
        error.message ||
        'Registration failed',
    });
  }
};

/**
 * User logout action
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
};

// Alias
export const signup = register;
