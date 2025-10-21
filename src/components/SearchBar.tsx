'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSearchTerm, resetSearch } from '@/features/advocates/advocatesSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.advocates.searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleReset = () => {
    dispatch(resetSearch());
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
          value={searchTerm}
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
