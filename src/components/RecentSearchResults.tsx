"use clinet";

import { History } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { RecentSearchItem } from "./SearchBar";

type RecentSearchResultsProps = {
  onRecentSearchItemClick: (item: RecentSearchItem) => void;
  recentSearches: [string];
};

const RecentSearchResults = ({
  onRecentSearchItemClick,
  recentSearches,
}: RecentSearchResultsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const arrowKeyNavigation = (event: KeyboardEvent) => {
      if (event.key == "ArrowDown") {
        const newIndex = (selectedIndex + 1) % recentSearches.length;
        setSelectedIndex(newIndex);
      } else if (event.key == "ArrowUp") {
        const newIndex =
          selectedIndex <= 0 ? recentSearches.length - 1 : selectedIndex - 1;
        setSelectedIndex(newIndex);
      } else if (event.key == "Enter") {
        onRecentSearchItemClick(recentSearches[selectedIndex]);
      }
      console.log(selectedIndex);
    };

    window.addEventListener("keydown", arrowKeyNavigation);
    return () => window.removeEventListener("keydown", arrowKeyNavigation);
  }, [selectedIndex, recentSearches, onRecentSearchItemClick]);

  return (
    <div className="flex flex-col w-full absolute bg-primary-foreground top-full right-0 rounded-xl mt-1 py-4">
      {recentSearches.map((item: RecentSearchItem, index: number) => {
        return (
          <div
            key={index}
            className={`flex gap-1 items-center hover:bg-secondary w-full px-2 ${
              selectedIndex === index && "bg-accent"
            }`}
            onMouseDown={() => onRecentSearchItemClick(item)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-foreground transition-none"
            >
              <History />
            </Button>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default RecentSearchResults;
