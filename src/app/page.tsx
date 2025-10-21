"use client";

import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAdvocates, searchAdvocates, setPage } from "@/features/advocates/advocatesSlice";
import AdvocatesTable from "@/components/AdvocatesTable";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    advocates,
    loading,
    error,
    currentPage,
    totalPages,
    total,
    searchTerm
  } = useAppSelector((state) => state.advocates);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchAdvocates({ search: searchTerm, page: currentPage }));
    } else {
      dispatch(fetchAdvocates(currentPage));
    }
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setPage(page));
  }, [dispatch]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-solace-dark mb-2">
          Solace Advocates
        </h1>
        <p className="text-solace-gray-600">
          Find experienced healthcare advocates to support your Medicare needs
        </p>
      </header>

      <SearchBar />

      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <AdvocatesTable
          advocates={advocates}
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
