/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // tells Next.js to generate static HTML
    images: {
      unoptimized: true, // required for static export
    },
  };
  
export default nextConfig; // or module.exports = nextConfig for .js
  