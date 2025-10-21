import axios from 'axios';
import { Advocate } from '@/types/advocate';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const advocatesApi = {
  getAdvocates: async (): Promise<Advocate[]> => {
    const response = await apiClient.get<{ data: Advocate[] }>('/advocates');
    return response.data.data;
  },
};
