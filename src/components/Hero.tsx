import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { data } from "@/data/hero_data";
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
    <section className="bg-background text-foreground py-20 px-6 border">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <Card key={index} className="relative border-0 flex flex-col gap-3 mb-4 group">
            <CardHeader>
              {/* <div className="relative"> */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover rounded-xl"
                />
                <Heart className="absolute text-white top-2 right-3 transform hover:scale-110" />
                <ChevronLeft className="absolute opacity-0 group-hover:opacity-100 transition-opacity p-1 left-3 top-1/3 bg-white rounded-full transform hover:scale-110" />
                <ChevronRight className="absolute opacity-0 group-hover:opacity-100 transition-opacity p-1 right-3 top-1/3 bg-white rounded-full transform hover:scale-110" />
              {/* </div> */}
            </CardHeader>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {item.desp}
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto flex justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{item.location}</span>
                <span className="text-sm text-muted-foreground">
                  {item.date}
                </span>
              </div>
              <div className="text-sm font-bold mr-2">₹{item.price}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
