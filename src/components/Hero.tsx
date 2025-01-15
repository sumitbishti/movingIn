import { data } from "@/data/hero_data";
import ImageCard from "./ImageCard";

// optimize image loading
// add list virtualization/windowing
// add smooth loading of content (animation/pagination)
// add infinite scrolling
// add skeleton rendering
// fetch the card data from real api
// add caching if possible

export default function Hero() {
  return (
    <section className="bg-background text-foreground py-12 px-6 mt-20">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <ImageCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
