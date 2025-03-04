/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary images
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com", // Cloudinary images
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // GitHub-hosted images
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" }, // Prevents clickjacking
          { key: "X-Content-Type-Options", value: "nosniff" }, // Blocks MIME sniffing
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // Protects referrer info
        ],
      },
    ];
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "res.cloudinary.com",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//     ],
//   },
// };

// export default nextConfig;
