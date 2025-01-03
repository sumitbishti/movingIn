import { History } from "lucide-react";
import { Button } from "./ui/button";

const recentResults = ["sumit bisht", "shoes", "clothes for me"];

// test commit

const RecentSearchResults = ({ onRecentSearchItemClick }: any) => {
  return (
    <div className="flex flex-col w-full absolute bg-orange-100 top-full right-0 rounded-xl mt-1 py-4">
      {recentResults.map((item, index) => {
        return (
          <div
            key={index}
            className="flex gap-2 items-center hover:bg-accent w-full"
            onMouseDown={() => onRecentSearchItemClick(item)}
          >
            <Button variant="ghost" size="icon">
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
