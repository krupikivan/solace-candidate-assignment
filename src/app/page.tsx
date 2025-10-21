"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAdvocates } from "@/features/advocates/advocatesSlice";
import AdvocatesTable from "@/components/AdvocatesTable";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const dispatch = useAppDispatch();
  const { filteredAdvocates, loading, error } = useAppSelector(
    (state) => state.advocates
  );

  useEffect(() => {
    console.log("fetching advocates...");
    dispatch(fetchAdvocates());
  }, [dispatch]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchBar />
      <br />
      <br />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <AdvocatesTable advocates={filteredAdvocates} />}
    </main>
  );
}
