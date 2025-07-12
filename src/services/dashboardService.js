import { BOOK_API } from '../constant/apiconstant';
import axiosInstance from '../utils/axiosInstance';

const BASE_URL = BOOK_API.DASHBOARD;

export const getDashboardStats = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/stats`);
  return res.data;
};
