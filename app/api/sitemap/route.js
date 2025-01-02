"use server";

import { domain } from "@/app/commondata";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import { Cachedblogs } from "@/app/_serveractions/Getcachedata";
import { categorylist, cities } from "@/app/commondata";

// Utility functions
const xmlEscape = (str) =>
  str
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const urlEncode = (str) => encodeURIComponent(str).replace(/%20/g, "-");

const baseurl = {
  loc: `${domain}`,
  lastmod: new Date().toISOString(),
  changefreq: "weekly",
  priority: "1.0",
};

// Generate city-specific URLs
const generateCityUrls = (cities) =>
  cities.map((city) => ({
    loc: `${domain}?location=${urlEncode(city)}`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: "1.0",
  }));

// Generate category and subcategory URLs
const generateCategoryUrls = (cities, categorylist) => {
  const urls = [];
  cities.forEach((city) => {
    Object.entries(categorylist).forEach(([categoryKey, categoryData]) => {
      // Add category URL
      urls.push({
        loc: `${domain}/${urlEncode(categoryKey)}?location=${urlEncode(city)}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: "0.8",
      });

      // Add subcategory URLs
      categoryData.subcat.forEach((subcat) => {
        urls.push({
          loc: `${domain}/${urlEncode(categoryKey)}/${urlEncode(
            subcat.name
          )}?location=${urlEncode(city)}`,
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: "0.8",
        });
      });
    });
  });
  return urls;
};

// Generate product URLs
const generateProductUrls = (products, domain, today) =>
  products.flatMap((product) =>
    product?.colorpalets.map((color, index) => ({
      loc: `${domain}/${urlEncode(product.category)}/${urlEncode(
        product.subcat
      )}/${product._id}?color=${index}`,
      lastmod: today.toISOString(),
      changefreq: "weekly",
      priority: "0.8",
      image: color?.images[0],
      name: product?.name,
    }))
  );

// generate blogs urls
const generateblogsurls = (blogs, domain, today) =>
  blogs.map((blog) => ({
    loc: `${domain}/Blogs/${urlEncode(blog._id)}`,
    lastmod: today.toISOString(),
    changefreq: "weekly",
    priority: "0.6",
  }));

export async function GET() {
  try {
    const allproducts = await Cachedproducts();
    const allblogs = await Cachedblogs();
    const today = new Date();

    // Generate all URLs
    const cityUrls = generateCityUrls(cities);
    const categoryUrls = generateCategoryUrls(cities, categorylist);
    const productUrls = generateProductUrls(allproducts, domain, today);
    const blogsUrls = generateblogsurls(allblogs, domain, today);

    const allUrls = [
      baseurl,
      ...cityUrls,
      ...categoryUrls,
      ...productUrls,
      ...blogsUrls,
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
          ? `
      <image:image>
        <image:loc>${xmlEscape(url.image)}</image:loc>
        <image:caption>${xmlEscape(url.name)}</image:caption>
        <image:title>${xmlEscape(url.name)}</image:title>
      </image:image>
      `
          : ""
      }
    </url>
  `
    )
    .join("")}
</urlset>`;

    // Return sitemap as response
    return new Response(sitemap, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
