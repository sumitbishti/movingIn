import { History } from "lucide-react";
import { Button } from "./ui/button";

const RecentSearchResults = ({
  onRecentSearchItemClick,
  recentSearches,
}: any) => {
  return (
    <div className="flex flex-col w-full absolute bg-accent top-full right-0 rounded-xl mt-1 py-4">
      {recentSearches.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className="flex gap-1 items-center hover:bg-white w-full px-2"
            onMouseDown={() => onRecentSearchItemClick(item)}
          >
            <Button variant="ghost" size="icon" className="hover:bg-white transition-none">
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
