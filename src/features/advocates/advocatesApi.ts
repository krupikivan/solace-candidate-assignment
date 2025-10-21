import axios from 'axios';
import { Advocate } from '@/types/advocate';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PaginatedAdvocatesResponse {
  data: Advocate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const advocatesApi = {
  getAdvocates: async (page: number = 1, limit: number = 10, search?: string): Promise<PaginatedAdvocatesResponse> => {
    const response = await apiClient.get<PaginatedAdvocatesResponse>('/advocates', {
      params: { page, limit, search },
    });
    return response.data;
  },
};
