"use server";
import {
  domain,
  categorylist,
  cities,
  citiesAndLocations,
  direactsearchlist,
} from "@/app/commondata";
import { Cachedproducts, Cachedblogs } from "@/app/_serveractions/Getcachedata";

// Utility functions
const xmlEscape = (str) =>
  str
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const today = new Date().toISOString();

// Generate URLs
const generateCityUrls = () =>
  ["Buy", "Rent"].flatMap((store) =>
    citiesAndLocations.map((city) => ({
      loc: `${domain}/${city}/${store}`,
      lastmod: today,
      changefreq: "daily",
      priority: "1.0",
    }))
  );

const generateCategoryUrls = () =>
  cities.flatMap((city) =>
    ["Buy", "Rent"].flatMap((store) =>
      Object.entries(categorylist).flatMap(([categoryname, category]) => [
        {
          loc: `${domain}/${city}/${store}/${categoryname}`,
          lastmod: today,
          changefreq: "daily",
          priority: "0.9",
          image: `${domain}${category.image}` || "",
          name: categoryname || "",
        },
        ...category.subcat.map((subcategory) => ({
          loc: `${domain}/${city}/${store}/${categoryname}/${subcategory.name}`,
          lastmod: today,
          changefreq: "daily",
          priority: "0.8",
          image: `${domain}${subcategory?.image}` || "",
          name: subcategory?.name || "",
        })),
      ])
    )
  );

const generateProductUrls = (products) =>
  cities.flatMap((city) =>
    products.flatMap((product) => {
      if (product.availablefor === "Both") {
        return ["Buy", "Rent"].map((store) => ({
          loc: `${domain}/${city}/${store}/${product.category}/${product.subcat}/${product._id}`,
          lastmod: today,
          changefreq: "daily",
          priority: "0.7",
          image: product.images?.[0] || "",
          name: product.name || "",
        }));
      }

      return [
        {
          loc: `${domain}/${city}/${
            product.availablefor === "Rent" ? "Rent" : "Buy"
          }/${product.category}/${product.subcat}/${product._id}`,
          lastmod: today,
          changefreq: "daily",
          priority: "0.7",
          image: product.images?.[0] || "",
          name: product.name || "",
        },
      ];
    })
  );

const generateBlogUrls = (blogs) =>
  blogs.map((blog) => ({
    loc: `${domain}/Blogs/${blog._id}`,
    lastmod: today,
    changefreq: "daily",
    priority: "0.6",
  }));

const generateDireactsearchUrls = () =>
  cities.flatMap((city) =>
    ["Buy", "Rent"].flatMap((store) =>
      direactsearchlist.map((item) => ({
        loc: `${domain}/${city}/${store}${item?.link}`,
        lastmod: today,
        changefreq: "daily",
        priority: "0.9",
        image: `${domain}${item?.image}` || "",
        name: item?.name || "",
      }))
    )
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
