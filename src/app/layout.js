import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SocialClubFinder.com",
  description: "Discover and connect with local social clubs in your area. SocialClubfinder helps you find clubs that match your interests, making it easy to join, participate, and build community. Whether you're looking for a sports team, book club, hobby group, or professional network, SocialClubfinder is your gateway to social engagement and enrichment.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
