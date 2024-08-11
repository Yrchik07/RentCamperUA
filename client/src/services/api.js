import axiosInstance from '../api/axiosConfig';

export const fetchAdverts = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/adverts?_page=${page}&_limit=4`);
    return response.data;
  } catch (error) {
    console.error('Error fetching adverts:', error);
    throw error;
  }
};
