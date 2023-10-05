import { API } from '../config';
import queryString from 'query-string';
import axios from "axios";

export const getProducts = (sortBy) => {
  return axios
    .get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
    .then((response) => {
      return response.data; // Axios automatically parses JSON response
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return axios
    .get(`${API}/categories`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };

  return axios
    .post(`${API}/products/by/search`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const list = (params) => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`${API}/products/search?${query}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
  return axios.post(`${API}/order/create/${userId}`, { order: createOrderData }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error(error);
  });
};