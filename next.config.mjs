/** @type {import('next').NextConfig} */

const redirects = {
  "/Furniture/Beds/67a88b18a1ffaa422456899b":
    "/Noida/Rent/Furniture/Beds/67a88b18a1ffaa422456899b",

  "/Search/Fitness_and_Gym": "/Delhi/Rent/Health-&-Fitness/Fitness-Machines",

  "/Search/Electronic": "/Delhi/Rent/Electronic",

  "/Event%20&%20Parties/Event-&-Parties": "/Delhi/Rent/Event-&-Parties",

  "/Ghaziabad/Furniture/Bed/bed4": "/Ghaziabad/Rent/Furniture/Beds",

  "/Ghaziabad/Electronics/Projector/projector1": "/Delhi/Rent",

  "/Gurgaon/Electronics/Laptop/laptop1": "/Gurgaon/Rent/Electronic/Laptops",

  "/Electronic/Electronic": "/Delhi/Rent/Electronic",

  "/Gurgaon/Others/Baby_Carrier/babycarrier1": "/Gurgaon/Rent/Others/Baby-Care",

  "/Health%20&%20Fitness/Fitness_and_Gym": "/Delhi/Rent/Health-&-Fitness",

  "/Delhi/Others/Baby_Car_Seats/babycarseat1":
    "/Delhi/Rent/Others/Baby-Care/67a78a526bc874a1dec69593",

  "/Event%20&%20Parties/Party%20Items":
    "/Delhi/Rent/Event-&-Parties/Party-Items",

  "/cancelationandreturnpolicy/Event-&-Parties": "/Delhi/Rent/Event-&-Parties",

  "/Event%20&%20Parties/Fitness_and_Gym": "/Delhi/Rent/Health-&-Fitness",

  "/aboutus/Health-&-Fitness": "/Delhi/Rent/Health-&-Fitness",

  "/Health%20&%20Fitness/Health-&-Fitness/Fitness-Machines":
    "/Delhi/Rent/Health-&-Fitness/Fitness-Machines",

  "/null/:path*": "/Delhi/Rent/:path*",

  "/:location/:category(Health-&-Fitness|Electronic|Furniture|Event-&-Parties|Others)/:path*":
    "/:location/Rent/:category/:path*",

  "/:category(Health-&-Fitness|Electronic|Furniture|Event-&-Parties|Others)/:path*":
    "/Delhi/Rent/:category/:path*",

  "/:location/Event_and_Parties/:path*":
    "/:location/Rent/Event-&-Parties/:path*",

  "/:location/Fitness_and_Gym/:path*":
    "/:location/Rent/Health-&-Fitness/Fitness-Machines/:path*",

  "/:location/Electronics/:path*": "/:location/Rent/Electronic/:path*",

  "/:location/Furniture/Bed/:path*": "/:location/Rent/Furniture/Beds/:path*",

  "/:location/Furniture/Bookshelf/:path*":
    "/:location/Rent/Furniture/Bookshelves/:path*",

  "/:location/Furniture/Sofa/:path*": "/:location/Rent/Furniture/Sofas/:path*",

  "/:location/Furniture/Centre_Table/:path*":
    "/:location/Rent/Furniture/Center-Tables/:path*",

  "/:location/Furniture/Study_Table/:path*":
    "/:location/Rent/Furniture/Study-Tables/:path*",

  "/:location/Furniture/Study_Table/:path*":
    "/:location/Rent/Furniture/Study-Tables/:path*",

  "/:file(parameters.yaml|parameters.json|parameters.ini|.env|config|database.php|security.php|mailjet.env|mailchimp.env|sendgrid_keys.json)":
    "/Delhi/Rent",
};

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    qualities: [20, 50, 75, 100],
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
  async redirects() {
    const staticRedirects = Object.entries(redirects).map(
      ([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })
    );

    const dynamicRedirects = [
      {
        source: "/Search",
        has: [
          {
            type: "query",
            key: "query",
          },
        ],
        destination: "/Delhi/Search?query=:query",
        permanent: true,
      },
    ];

    return [...staticRedirects, ...dynamicRedirects];
  },
};

export default nextConfig;
