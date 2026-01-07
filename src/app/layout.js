import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

/**
 * Global metadata for the entire site
 * This will apply to all pages; individual pages cannot override it
 */
export const metadata = {
  title: "Thakur Realtors",
  description: "Leading Real Estate Solutions for Your Dream Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}