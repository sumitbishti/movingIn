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
        url: "https://movein-neon.vercel.app/images/pexels-1.jpg",
        width: 1200,
        height: 630,
        alt: "Special offer preview",
      },
    ],
    url: "https://movein-neon.vercel.app/about", // Add explicit URL
    siteName: "Move In",
    type: "website",
    locale: "en_US", // Add locale
  },
  // Add Twitter card metadata for better sharing
  twitter: {
    card: "summary_large_image",
    title: "Special Offer!",
    description: "Check out our amazing product with great discounts",
    images: ["https://movein-neon.vercel.app/images/pexels-1.jpg"],
  },
};

export default function About() {
  return <WhatsAppForm />;
}