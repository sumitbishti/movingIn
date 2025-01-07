"use client";

import { Search, X, Filter } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import RecentSearchResults from "./RecentSearchResults";

type SearchResult = {
  id: number;
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  let recentSearches =
    JSON.parse(localStorage.getItem("recentSearches") || "[]") || [];
  recentSearches = recentSearches.slice(0, Math.min(10, recentSearches.length));

  // fetch search result based on the search term
  // set up a temp server that returns the required data
  // apply caching
  const fetchSearchResults = useCallback(async () => {
    try {
      console.log(`Fetch Api called for : ${searchTerm}`);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      console.log(`error in fetching data for: ${searchTerm}`);
      return [];
    }
  }, [searchTerm]);

  const saveSearchTermOnBrowser = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    const prevSearches = [...recentSearches];
    prevSearches.unshift(searchTerm);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(prevSearches.slice(0, 10))
    );
  };

  // debouncing the fetch
  useEffect(() => {
    let timer = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, fetchSearchResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    setSearchTerm(searchValue);
    setShowRecentSearches(searchValue === "");
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;
    saveSearchTermOnBrowser(searchTerm);
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
        setShowRecentSearches(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative border-0 border-accent w-[600px] h-[50px] rounded-full flex items-center bg-secondary">
      <Search className="cursor-pointer h-[25px] w-[25px] m-4 flex-shrink-0" />

      {/* shows recent searches */}
      {showRecentSearches && recentSearches.length > 0 && (
        <RecentSearchResults
          recentSearches={recentSearches}
          onRecentSearchItemClick={onRecentSearchItemClick}
        />
      )}

      <form className="w-full" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onFocus={() => setShowRecentSearches(!searchTerm)}
          onBlur={() =>
            setTimeout(() => {
              setShowRecentSearches(false);
            }, 200)
          }
          onChange={handleSearchChange}
          placeholder="Search here..."
          className="w-full h-full rounded-full p-3 outline-none bg-secondary"
        />
      </form>

      {searchTerm !== "" && (
        <div className="p-1 rounded-full hover:bg-accent">
          <X
            onClick={() => setSearchTerm("")}
            className="cursor-pointer h-[25px] w-[25px]"
          />
        </div>
      )}

      <Filter className="cursor-pointer h-[25px] w-[25px] m-4 flex-shrink-0" />
    </div>
  );
};

export default SearchBar;
