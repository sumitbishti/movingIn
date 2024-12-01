import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle, Star, Zap } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Easy to Use",
    description:
      "Our platform is designed with simplicity in mind, making it accessible for everyone.",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: "Top-notch Quality",
    description:
      "We deliver only the highest quality products and services to our customers.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Lightning Fast",
    description:
      "Experience lightning-fast performance with our optimized solutions.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
