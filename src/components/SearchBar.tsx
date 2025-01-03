"use client";

import { Search, X, Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RecentSearchResults from "./RecentSearchResults";

type SearchResult = {
  id: number;
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [recentSearchResultsBox, setRecentSearchResultsBox] = useState(false);

  const recentSearches = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  );

  const fetchSearchResults = async () => {
    // fetch search result based on the search term
    // set up a temp server that returns the required data
    console.log("Fetch Api called");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  };

  const saveSearchTermOnDevice = (searchTerm: any) => {
    const searchResults =
      JSON.parse(localStorage.getItem("recentSearches") as string) || [];

    console.log(searchResults);
    const newSearchResults = [...searchResults, searchTerm];
    localStorage.setItem("recentSearches", JSON.stringify(newSearchResults));
  };

  const debounce = (callback: any, delay: any) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(async () => {
      await callback();
    }, delay);
  };

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue === "") setRecentSearchResultsBox(true);
    else setRecentSearchResultsBox(false);

    debounce(fetchSearchResults, 500);
  };

  const onClearSearchTerm = () => {
    setSearchTerm("");
  };
  const onApplyFilters = () => {};

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;
    saveSearchTermOnDevice(searchTerm);
    console.log("searched..");
    inputRef.current?.blur();
  };

  const onRecentSearchItemClick = (item: any) => {
    console.log(item);
    setSearchTerm(item);
    fetchSearchResults();
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setRecentSearchResultsBox(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative border-2 border-accent-foreground w-[600px] h-[60px] rounded-full flex items-center">
      <Search className="cursor-pointer h-[25px] w-[25px] m-4 flex-shrink-0" />

      {/* shows recent searches */}
      {recentSearchResultsBox && recentSearches.length > 0 && (
        <RecentSearchResults
          recentSearches={recentSearches}
          onRecentSearchItemClick={onRecentSearchItemClick}
        />
      )}

      <form action="" className="w-full" onSubmit={onSearchSubmit}>
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onFocus={() => searchTerm === "" && setRecentSearchResultsBox(true)}
          onBlur={() => setRecentSearchResultsBox(false)}
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
