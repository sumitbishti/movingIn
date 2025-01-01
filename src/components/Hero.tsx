import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-primary text-primary-foreground py-20 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-xl mb-8">
          Discover amazing features and services tailored just for you.
        </p>
        <Button variant="secondary" size="lg">
          Get Started
        </Button>
      </div>
    </section>
  );
}
