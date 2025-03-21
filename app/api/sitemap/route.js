"use server";
import { domain, categorylist, cities } from "@/app/commondata";
import { Cachedproducts, Cachedblogs } from "@/app/_serveractions/Getcachedata";
import { direactsearchlist } from "@/app/commondata";
const citiesAndLocations = [
  "Gurgaon",
  "Faridabad",
  "Sonipat",
  "Panipat",
  "Karnal",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Meerut",
  "Bulandshahr",
  "Alwar",
  "Bharatpur",
  "Rohtak",
  "Rewari",
  "Jhajjar",
  "Bhiwadi",
  "Mathura",
  "Agra",
  "Hapur",
  "Muzaffarnagar",
  "Baghpat",
  "Palwal",
  "Dharuhera",
  "Shamli",
  "Etawah",
  "Firozabad",
  "Rampur",
  "Moradabad",
  "Bareilly",
  "Gajraula",
  "Sambhal",
  "Najibabad",
  "Kotputli",
  "Behror",
  "Fatehabad",
  "Kurukshetra",
  "Kaithal",
  "Pilibhit",
  "Hardoi",
  "Deoband",
  "Badaun",
  "Saharanpur",
  "Charkhi Dadri",
  "Mandi Dabwali",
  "Sirsa",
  "Narnaul",
  "Jind",
  "Hisar",
  "Ambala",
  "Yamunanagar",
  "Bhiwani",
  "Fatehpur",
  "Kasganj",
  "Hathras",
  "Dausa",
  "Tonk",
  "Jhunjhunu",
  "Chomu",
  "Shahjahanpur",
  "Unnao",
  "Kanpur",
  "Lucknow",
  "Connaught Place",
  "Chandni Chowk",
  "Karol Bagh",
  "Lajpat Nagar",
  "Saket",
  "Hauz Khas",
  "Dwarka",
  "Rohini",
  "Pitampura",
  "Vasant Kunj",
  "Greater Kailash",
  "Rajouri Garden",
  "Mayur Vihar",
  "South Extension",
  "Defence Colony",
  "Shahdara",
  "Janakpuri",
  "Kalkaji",
  "Okhla",
  "Green Park",
  "Punjabi Bagh",
  "Sarojini Nagar",
  "Jor Bagh",
  "Khan Market",
  "Preet Vihar",
  "Nehru Place",
  "Uttam Nagar",
  "Tilak Nagar",
  "Indirapuram"
];


// Utility functions
const xmlEscape = (str) =>
  str
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const urlEncode = (str) =>
  encodeURIComponent(str)
    .replace(/%20/g, "-")
    .replace(/%2F/g, "/")
    .replace(/%26/g, "&"); // Preserve slashes

const today = new Date().toISOString();

// Generate URLs
const generateCityUrls = () =>
  citiesAndLocations.map((city) => ({
    loc: `${domain}/${urlEncode(city)}`,
    lastmod: today,
    changefreq: "daily",
    priority: "1.0",
  }));

const generateCategoryUrls = () =>
  cities.flatMap((city) =>
    Object.entries(categorylist).flatMap(([category, { subcat }]) => [
      {
        loc: `${domain}/${urlEncode(city)}/${urlEncode(category)}`,
        lastmod: today,
        changefreq: "daily",
        priority: "1.0",
        image: category.image || "",
        name: category || "",
      },
      ...subcat.map((subcategory) => ({
        loc: `${domain}/${urlEncode(city)}/${urlEncode(category)}/${urlEncode(
          subcategory.name
        )}`,
        lastmod: today,
        changefreq: "daily",
        priority: "1.0",
        image: subcategory?.image || "",
        name: subcategory?.name || "",
      })),
    ])
  );

const generateProductUrls = (products) =>
  cities.flatMap((city) =>
    products.flatMap((product) => ({
      loc: `${domain}/${urlEncode(city)}/${urlEncode(
        product.category
      )}/${urlEncode(product.subcat)}/${urlEncode(product._id)}`,
      lastmod: today,
      changefreq: "daily",
      priority: "1.0",
      image: product.images?.[0] || "",
      name: product.name || "",
    }))
  );

const generateBlogUrls = (blogs) =>
  blogs.map((blog) => ({
    loc: `${domain}/Blogs/${urlEncode(blog._id)}`,
    lastmod: today,
    changefreq: "daily",
    priority: "1.0",
  }));

const generateDireactsearchUrls = () =>
  cities.flatMap((city) =>
    direactsearchlist.map((item) => ({
      loc: `${domain}/${urlEncode(city)}${item?.link}`,
      lastmod: today,
      changefreq: "daily",
      priority: "1.0",
      image: `${domain}${item?.image}` || "",
      name: item?.name || "",
    }))
  );

export async function GET() {
  try {
    // Fetch data in parallel
    const [allproducts, allblogs] = await Promise.all([
      Cachedproducts(),
      Cachedblogs(),
    ]);

    // Generate all URLs
    const allUrls = [
      {
        loc: domain,
        lastmod: today,
        changefreq: "daily",
        priority: "1.0",
      },
      ...generateCityUrls(),
      ...generateCategoryUrls(),
      ...generateProductUrls(allproducts),
      ...generateBlogUrls(allblogs),
      ...generateDireactsearchUrls(),
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>${xmlEscape(url.loc)}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
      ${
        url.image
          ? `<image:image>
        <image:loc>${xmlEscape(url.image)}</image:loc>
        <image:caption>${xmlEscape(url.name)}</image:caption>
        <image:title>${xmlEscape(url.name)}</image:title>
      </image:image>`
          : ""
      }
    </url>`
    )
    .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    return new Response(
      `<error><message>Failed to generate sitemap</message></error>`,
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
}
