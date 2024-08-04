
import "./globals.css";
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "SocialClubFinder.com",
  description: "Discover and connect with local social clubs in your area. SocialClubfinder helps you find clubs that match your interests, making it easy to join, participate, and build community. Whether you're looking for a sports team, book club, hobby group, or professional network, SocialClubfinder is your gateway to social engagement and enrichment.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

