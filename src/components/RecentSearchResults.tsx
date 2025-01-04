"use clinet";

import { History } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const RecentSearchResults = ({
  onRecentSearchItemClick,
  recentSearches,
}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const arrowKeyNavigation = (event: any) => {
      if (event.key == "ArrowDown") {
        const newIndex = (selectedIndex + 1) % recentSearches.length;
        setSelectedIndex(newIndex);
      } else if (event.key == "ArrowUp") {
        let newIndex =
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
    <div className="flex flex-col w-full absolute bg-accent top-full right-0 rounded-xl mt-1 py-4">
      {recentSearches.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className={`flex gap-1 items-center hover:bg-white w-full px-2 ${
              selectedIndex === index && "bg-white"
            }`}
            onMouseDown={() => onRecentSearchItemClick(item)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white transition-none"
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
