"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAdvocates } from "@/features/advocates/advocatesSlice";
import AdvocatesTable from "@/components/AdvocatesTable";
import SearchBar from "@/components/SearchBar";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function Home() {
  const dispatch = useAppDispatch();
  const { filteredAdvocates, loading, error } = useAppSelector(
    (state) => state.advocates
  );

  useEffect(() => {
    dispatch(fetchAdvocates());
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
      {!loading && !error && <AdvocatesTable advocates={filteredAdvocates} />}
    </div>
  );
}
