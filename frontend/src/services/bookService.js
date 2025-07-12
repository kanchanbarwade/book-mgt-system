import { BOOK_API } from '../constant/apiconstant';
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = BOOK_API.BOOK;

export const getBooks = async () => {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
};

export const getBookByIsbn = async (isbn) => {
  const res = await axiosInstance.get(`${BASE_URL}/isbn/${isbn}`);
  return res.data;
};

export const addBook = async (book) => {
  const res = await axiosInstance.post(BASE_URL, book);
  return res.data;
};

export const updateBook = async (isbn, book) => {
  const res = await axiosInstance.put(`${BASE_URL}/isbn/${isbn}`, book);
  return res.data;
};

export const deleteBook = async (isbn) => {
  const res = await axiosInstance.delete(`${BASE_URL}/isbn/${isbn}`);
  return res.data;
};
