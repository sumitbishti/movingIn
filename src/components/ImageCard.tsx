"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ImageCardProps = {
  images: string[];
  title: string;
  desp: string;
  date: string;
  price: number;
  location: string;
};

export default function ImageCard(props: ImageCardProps) {
  const { images, title, desp, date, price, location } = props;

  const VISIBLE_DOTS_LENGTH = 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const dotsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const handleHeartClicked = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTranslateX(0);
  };
  const handlePrevClick = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTranslateX(0);
  };

  useEffect(() => {
    const updateDotsContainerPosition = () => {
      const VISIBLE_DOTS_LENGTH = 5;
      const offset = Math.max(
        0,
        currentIndex - Math.floor(VISIBLE_DOTS_LENGTH / 2)
      );
      const maxOffset = Math.min(offset, images.length - VISIBLE_DOTS_LENGTH);

      if (dotsRef.current) {
        dotsRef.current.style.transform = `translateX(${-maxOffset * 12}px)`;
      }
    };
    const updateDotsSize = () => {
      Array.from(dotsRef.current?.children || []).forEach((dot, index) => {
        if (!(dot instanceof HTMLDivElement)) return;

        const distance = Math.abs(currentIndex - index);
        const halfDistance = Math.floor(VISIBLE_DOTS_LENGTH / 2);
        dot.style.scale = "1";

        if (currentIndex <= halfDistance) {
          if (index === 3) {
            dot.style.scale = "0.9";
          } else if (index === 4) {
            dot.style.scale = "0.8";
          }
        } else if (currentIndex >= images.length - (halfDistance + 1)) {
          if (index === images.length - (VISIBLE_DOTS_LENGTH - 1)) {
            dot.style.scale = "0.9";
          } else if (index === images.length - VISIBLE_DOTS_LENGTH) {
            dot.style.scale = "0.8";
          }
        } else {
          if (distance == 1) {
            dot.style.scale = "0.95";
          } else if (distance == 2) {
            dot.style.scale = "0.8";
          }
        }
      });
    };

    updateDotsContainerPosition();
    updateDotsSize();
  }, [currentIndex, images]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    setStartTime(Date.now());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Add resistance at the edges
    if (
      (currentIndex === 0 && diff > 0) ||
      (currentIndex === images.length - 1 && diff < 0)
    ) {
      setTranslateX(diff * 0.3); // Reduced movement at edges
    } else {
      setTranslateX(diff);
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    const endTime = Date.now();
    const timeElapsed = endTime - startTime;

    // pixels per second
    const velocity = Math.abs(translateX) / timeElapsed;

    const quickSwipeThreshold = imageWidth * 0.001; // 15% of the image swiped
    const normalSwipeThreshold = imageWidth * 0.5; // 50% of the image swiped
    const isQuickSwipe = velocity > 0.01;

    const shouldSwipe = isQuickSwipe
      ? Math.abs(translateX) > quickSwipeThreshold
      : Math.abs(translateX) > normalSwipeThreshold;

    if (shouldSwipe) {
      if (translateX > 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (translateX < 0 && currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
    setTranslateX(0);
  };

  useEffect(() => {
    if (imageRef.current) {
      setImageWidth(imageRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (imageRef.current) {
        setImageWidth(imageRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="relative border-0 flex flex-col gap-3 mb-4 group">
      <CardHeader className="relative overflow-hidden rounded-xl">
        <div
          className="relative flex transform transition-transform duration-300 w-full h-full aspect-1"
          style={{
            transform: `translateX(calc(-${
              currentIndex * 100
            }% + ${translateX}px))`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full relative touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={currentIndex === 0 ? imageRef : null}
            >
              <Image
                src={src}
                alt={title}
                fill={true}
                loading="lazy"
                draggable={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="select-none object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>

        <Heart
          className={`absolute text-background top-2 right-3 transform hover:scale-110 ${
            isHeartClicked && "text-red-500 fill-red-500"
          }`}
          onClick={handleHeartClicked}
        />
        {currentIndex > 0 && (
          <ChevronLeft
            onClick={handlePrevClick}
            className={`absolute opacity-0 group-hover:opacity-100 transition-opacity p-1 left-3 top-1/2 transform -translate-y-1/2 bg-background rounded-full transform hover:scale-110 cursor-pointer`}
          />
        )}
        {currentIndex < images.length - 1 && (
          <ChevronRight
            onClick={handleNextClick}
            className={`absolute opacity-0 group-hover:opacity-100 transition-opacity p-1 right-3 top-1/2 transform -translate-y-1/2 bg-background rounded-full transform hover:scale-110 cursor-pointer`}
          />
        )}

        {/* dots */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60px] h-8 flex items-center overflow-hidden">
          <div
            className="flex justify-center items-center gap-[4px] px-[2px] py-1 transition-transform duration-500"
            ref={dotsRef}
          >
            {images.map((_, index) => {
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
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{desp}</CardDescription>
      </CardContent>

      <CardFooter className="mt-auto flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{location}</span>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <div className="text-sm font-bold mr-2">₹{price}</div>
      </CardFooter>
    </Card>
  );
}
