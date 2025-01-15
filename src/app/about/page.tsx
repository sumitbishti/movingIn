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
        url: "https://movein-neon.vercel.app/images/pexels-1.jpg", // Replace with your image URL
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
