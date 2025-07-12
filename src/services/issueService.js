import { BOOK_API } from '../constant/apiconstant';
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = BOOK_API.ISSUES;

export const issueBook = async (isbn, userEmail) => {
  const res = await axiosInstance.post(`${BASE_URL}/issue`, { isbn, userEmail });
  return res;
};

export const getIssuedBooks = async () => {
  const res = await axiosInstance.get(`${BASE_URL}`);
  return res.data;
};

export const returnBook = async (issueId) => {
  const res = await axiosInstance.put(`${BASE_URL}/return/${issueId}`);
  return res.data;
};