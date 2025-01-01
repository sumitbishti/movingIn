"use client";

import { Search, X, Filter } from "lucide-react";
import { useRef, useState } from "react";
import RecentSearchResults from "./RecentSearchResults";

type SearchResult = {
  id: number;
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchSearchResults = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  };

  const saveSearchTermOnDevice = (searchTerm: any) => {
    const searchResults = JSON.parse(
      localStorage.getItem("searchResults") as string
    );
    const newSearchResults = [...searchResults, searchTerm];
    localStorage.setItem("searchResults", JSON.stringify(newSearchResults));
  };

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    setSearchTerm(searchValue);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(async () => {
      const data = await fetchSearchResults();
      setSearchResults(data);
      console.log("fetched data");
    }, 300);
  };

  const onClearSearchTerm = () => {
    setSearchTerm("");
  };
  const onApplyFilters = () => {};

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveSearchTermOnDevice(searchTerm);
    console.log("searched..");
    inputRef.current?.blur();
  };

  return (
    <div className="relative border-2 border-accent-foreground w-[600px] h-[60px] rounded-full flex items-center bg-red-100">
      <Search className="cursor-pointer h-[25px] w-[25px] m-4 flex-shrink-0" />

      {/* <RecentSearchResults /> */}

      <form action="" className="w-full" onSubmit={onSearchSubmit}>
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder="Search here..."
          className="w-full h-full rounded-full p-3 outline-none"
        />
      </form>

      {searchTerm !== "" && (
        <div className="p-1 rounded-full hover:bg-accent">
          <X
            onClick={onClearSearchTerm}
            className="cursor-pointer h-[25px] w-[25px]"
          />
        </div>
      )}

      <Filter
        onClick={onApplyFilters}
        className="cursor-pointer h-[25px] w-[25px] m-4 flex-shrink-0"
      />
    </div>
  );
};

export default SearchBar;
