// import RedditDiscussions from "@/components/RedditDiscussions";
// import { data } from "@/data/blind_discussions";

import { Metadata } from "next";
import WhatsAppForm from "@/components/WhatsAppForm";

export const metadata: Metadata = {
  title: "Special Offer!",
  description: "Check out our amazing product with great discounts",
  openGraph: {
    title: "Special Offer!",
    description: "Check out our amazing product with great discounts",
    images: [
      {
        url: "https://images.unsplash.com/photo-1682687220866-c856f566f1bd", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Special offer preview",
      },
    ],
    siteName: "Move In",
    type: "website",
  },
};

export default function About() {
  return <WhatsAppForm />;
}
