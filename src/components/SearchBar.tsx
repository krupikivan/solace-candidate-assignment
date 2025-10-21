'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { searchAdvocates, fetchAdvocates, setSearchTerm } from '@/features/advocates/advocatesSlice';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.advocates.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm.trim()) {
        dispatch(searchAdvocates({ search: localSearchTerm, page: 1 }));
      } else if (localSearchTerm === '') {
        dispatch(fetchAdvocates(1));
      }
      dispatch(setSearchTerm(localSearchTerm));
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setLocalSearchTerm('');
    dispatch(setSearchTerm(''));
    dispatch(fetchAdvocates(1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label htmlFor="advocate-search" className="block text-solace-dark font-semibold text-lg mb-2">
          Search Advocates
        </label>
        {searchTerm && (
          <p className="text-sm text-solace-gray-600">
            Searching for: <span id="search-term" className="font-medium text-solace-blue">{searchTerm}</span>
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <input
          id="advocate-search"
          type="text"
          value={localSearchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, city, degree, or specialty..."
          className="flex-1 px-4 py-2 border border-solace-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solace-blue focus:border-transparent transition-all"
        />
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-solace-blue text-white font-medium rounded-md hover:bg-solace-blue-dark transition-colors duration-150 shadow-sm hover:shadow-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
