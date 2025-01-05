"use server";
import { domain } from "@/app/commondata";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";

export async function GET() {
  try {
    const allproducts = await Cachedproducts();
    const today = new Date(); // Get today's date

    const posts = allproducts.flatMap((item) => {
      return item?.colorpalets.map((color, j) => ({
        title: item?.name,
        link: `${domain}/${item?.category}/${item?.subcat}/${item?._id}?color=${j}`,
        description:
          "Dimensions: " +
          item?.Dimensions +
          "_______________ Discover the best solid wood furniture in India. Shop Sheesham wood furniture, dining tables, sofas, and more online at affordable prices.______________ #furnituredesign #homedecor #interiordesign #furnitureinspo #furnituregoals #furnitureaddict #furniturelovers #modernfurniture #luxuryfurniture #customfurniture",
        pubDate: today.toUTCString(), // Convert to proper date string
        imageUrl: color?.images[0],
      }));
    });

    const rssFeed = `
      <?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>Rentbean - Get Solid Wood Furniture at best price</title>
          <link>${domain}</link>
          <description>Discover the best solid wood furniture in India. Shop Sheesham wood furniture, dining tables, sofas, and more online at affordable prices.</description>
          <language>en-us</language>
          ${posts
            .map(
              (post) => `
            <item>
              <title><![CDATA[${post.title}]]></title>
              <link><![CDATA[${post.link}]]></link>
              <description><![CDATA[${post.description}]]></description>
              <pubDate>${post.pubDate}</pubDate>
              <enclosure url="${post.imageUrl}"/>
            </item>
          `
            )
            .join("")}
        </channel>
      </rss>
    `.trim();

    return new Response(rssFeed, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
