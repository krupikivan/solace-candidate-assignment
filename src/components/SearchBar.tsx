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
    <div>
      <p>Search</p>
      <p>
        Searching for: <span id="search-term">{searchTerm}</span>
      </p>
      <input
        type="text"
        value={searchTerm}
        style={{ border: '1px solid black' }}
        onChange={handleSearchChange}
      />
      <button onClick={handleReset}>Reset Search</button>
    </div>
  );
}
