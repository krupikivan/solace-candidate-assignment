import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Advocate } from '@/types/advocate';
import { advocatesApi } from './advocatesApi';

interface AdvocatesState {
  advocates: Advocate[];
  filteredAdvocates: Advocate[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const initialState: AdvocatesState = {
  advocates: [],
  filteredAdvocates: [],
  searchTerm: '',
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};

// Async thunk to fetch advocates
export const fetchAdvocates = createAsyncThunk(
  'advocates/fetchAdvocates',
  async (page: number = 1) => {
    const response = await advocatesApi.getAdvocates(page, 10);
    return response;
  }
);

const advocatesSlice = createSlice({
  name: 'advocates',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;

      if (action.payload === '') {
        state.filteredAdvocates = state.advocates;
      } else {
        state.filteredAdvocates = state.advocates.filter((advocate) => {
          const searchLower = action.payload.toLowerCase();
          return (
            advocate.firstName.toLowerCase().includes(searchLower) ||
            advocate.lastName.toLowerCase().includes(searchLower) ||
            advocate.city.toLowerCase().includes(searchLower) ||
            advocate.degree.toLowerCase().includes(searchLower) ||
            advocate.specialties.some(s => s.toLowerCase().includes(searchLower)) ||
            advocate.yearsOfExperience.toLowerCase().includes(searchLower)
          );
        });
      }
    },
    resetSearch: (state) => {
      state.searchTerm = '';
      state.filteredAdvocates = state.advocates;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvocates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvocates.fulfilled, (state, action) => {
        state.loading = false;
        state.advocates = action.payload.data;
        state.filteredAdvocates = action.payload.data;
        state.currentPage = action.payload.page;
        state.pageSize = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAdvocates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch advocates';
      });
  },
});

export const { setSearchTerm, resetSearch, setPage } = advocatesSlice.actions;
export default advocatesSlice.reducer;
