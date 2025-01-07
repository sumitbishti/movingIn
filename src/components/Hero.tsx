"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { data } from "@/data/hero_data";
import Image from "next/image";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";

// optimize image loading
// add list virtualization/windowing
// add loading animation/pagination
// add infinite scrolling
// add skeleton rendering
// fetch the card data from real api
// add caching if possible

export default function Hero() {
  return (
    <section className="bg-background text-foreground py-12 px-6 mt-20">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <ImageCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

const ImageCard = ({ item }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const dotsRef = useRef<any>(null);
  const VISIBLE_DOTS_LENGTH = 5;

  const handleHeartClicked = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev + 1) % item.images.length);
    console.log(currentIndex);
  };
  const handlePrevClick = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + item.images.length) % item.images.length
    );
    console.log(currentIndex);
  };

  const updateDotsContainerPosition = () => {
    const VISIBLE_DOTS_LENGTH = 5;
    const offset = Math.max(
      0,
      currentIndex - Math.floor(VISIBLE_DOTS_LENGTH / 2)
    );
    const maxOffset = Math.min(
      offset,
      item.images.length - VISIBLE_DOTS_LENGTH
    );
    dotsRef.current.style.transform = `translateX(${-maxOffset * 12}px)`;
  };

  const updateDotsSize = () => {
    Array.from(dotsRef.current.children).forEach((dot: any, index: any) => {
      const distance = Math.abs(currentIndex - index);
      const halfDistance = Math.floor(VISIBLE_DOTS_LENGTH / 2);
      dot.style.scale = "1";

      if (currentIndex <= halfDistance) {
        if (index === 3) {
          dot.style.scale = "0.9";
        } else if (index === 4) {
          dot.style.scale = "0.8";
        }
      } else if (currentIndex >= item.images.length - (halfDistance + 1)) {
        if (index === item.images.length - (VISIBLE_DOTS_LENGTH - 1)) {
          dot.style.scale = "0.9";
          console.log("0.9", index);
        } else if (index === item.images.length - VISIBLE_DOTS_LENGTH) {
          dot.style.scale = "0.8";
          console.log("0.8", index);
        }
      } else {
        if (distance == 1) {
          dot.style.scale = "0.95";
          console.log("0.95", index);
        } else if (distance == 2) {
          dot.style.scale = "0.8";
        }
      }
    });
  };

  useEffect(() => {
    updateDotsContainerPosition();
    updateDotsSize();
  }, [currentIndex]);

  return (
    <Card className="relative border-0 flex flex-col gap-3 mb-4 group">
      <CardHeader className="overflow-hidden rounded-xl">
        <div
          className="flex w-full transform transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {item.images.map((src: any, index: number) => (
            <img
              key={index}
              src={src}
              alt={item.title}
              className="w-full h-60 select-none object-cover"
            />
          ))}
        </div>

        <Heart
          className={`absolute text-background top-2 right-3 transform hover:scale-110 ${
            isHeartClicked && "text-red-500 fill-red-500"
          }`}
          onClick={handleHeartClicked}
        />
        <ChevronLeft
          onClick={handlePrevClick}
          className={`absolute opacity-0 group-hover:opacity-100 transition-opacity p-1 left-3 top-1/3 bg-background rounded-full transform hover:scale-110 ${
            currentIndex <= 0 && "hidden"
          }`}
        />
        <ChevronRight
          onClick={handleNextClick}
          className={`absolute opacity-0 group-hover:opacity-100 transition-opacity p-1 right-3 top-1/3 bg-background rounded-full transform hover:scale-110 ${
            currentIndex === item.images.length - 1 && "hidden"
          }`}
        />

        {/* dots */}
        <div className="absolute top-[200px] left-1/3 bg-red-00 w-[60px] h-8 flex items-center overflow-hidden">
          <div
            className="bg-black-0 flex justify-center items-center gap-[4px] px-[2px] py-1 transition-transform duration-500"
            ref={dotsRef}
          >
            {item.images.map((_: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`h-[8px] w-[8px] bg-background rounded-full transition ${
                    currentIndex === index ? "opacity-100" : "opacity-60"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription className="line-clamp-2">{item.desp}</CardDescription>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{item.location}</span>
          <span className="text-sm text-muted-foreground">{item.date}</span>
        </div>
        <div className="text-sm font-bold mr-2">₹{item.price}</div>
      </CardFooter>
    </Card>
  );
};
