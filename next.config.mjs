/** @type {import('next').NextConfig} */

const redirects = {
  "/Furniture/Beds/67a88b18a1ffaa422456899b":
    "/Noida/Furniture/Beds/67a88b18a1ffaa422456899b",
  "/Search/Fitness_and_Gym": "/Delhi/Health-&-Fitness/Fitness-Machines",
  "/Search/Electronic": "/Delhi/Electronic",
  "/Event%20&%20Parties/Event-&-Parties": "/Delhi/Event-&-Parties",
  "/Search/Electronic/Laptops": "/Delhi/Electronic/Laptops",
  "/Ghaziabad/Furniture/Bed/bed4": "/Ghaziabad/Furniture/Beds",
  "/Ghaziabad/Electronics/Projector/projector1": "/",
  "/Gurgaon/Electronics/Laptop/laptop1": "/Gurgaon/Electronic/Laptops",
  "/Electronic/Electronic": "/Delhi/Electronic",
  "/Gurgaon/Others/Baby_Carrier/babycarrier1": "/Gurgaon/Others/Baby-Care",
  "/Health%20&%20Fitness/Fitness_and_Gym": "/Delhi/Health-&-Fitness",
  "/Delhi/Others/Baby_Car_Seats/babycarseat1":
    "/Delhi/Others/Baby-Care/67a78a526bc874a1dec69593",
  "/Event%20&%20Parties/Party%20Items": "/Delhi/Event-&-Parties/Party-Items",
  "/cancelationandreturnpolicy/Event-&-Parties": "/Delhi/Event-&-Parties",
  "/Event%20&%20Parties/Fitness_and_Gym": "/Delhi/Health-&-Fitness",
  "/aboutus/Health-&-Fitness": "/Delhi/Health-&-Fitness",
  "/Health%20&%20Fitness/Health-&-Fitness/Fitness-Machines":
    "/Delhi/Health-&-Fitness/Fitness-Machines",
  "/Search/Electronics": "/Delhi/Electronic",
  
  "/null/:path*": "/Delhi/:path*",
  "/:category(Health-&-Fitness|Electronic|Furniture|Event-&-Parties|Others)/:path*":
    "/Delhi/:category/:path*",
  "/:location*/Event_and_Parties/:path*": "/:location*/Event-&-Parties",
  "/:location*/Fitness_and_Gym/:path*":
    "/:location*/Health-&-Fitness/Fitness-Machines",
  "/:location*/Electronics/:path*": "/:location*/Electronic",
  "/:location*/Electronics/:path*": "/:location*/Electronic",

  "/:location*/Furniture/Bed/:path*": "/:location*/Furniture/Beds",
  "/:location*/Furniture/Bookshelf/:path*": "/:location*/Furniture/Bookshelves",
  "/:location*/Furniture/Sofa/:path*": "/:location*/Furniture/Sofas",
  "/:location*/Furniture/Study_Table/:path*":
    "/:location*/Furniture/Study-Tables",

  "/:file(parameters.yaml|parameters.json|parameters.ini|.env|config|database.php|security.php|mailjet.env|mailchimp.env|sendgrid_keys.json)":
    "/Delhi",
};

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
  async redirects() {
    return Object.entries(redirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: true, // 301 Redirect for SEO
    }));
  },
};

export default nextConfig;
