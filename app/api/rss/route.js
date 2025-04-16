"use server";
import { domain } from "@/app/commondata";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";

export async function GET() {
  try {
    const allproducts = await Cachedproducts();
    const today = new Date(); // Get today's date
    const rentdesc = `🚀 Why Buy When You Can Rent? 🏡💼 \nFrom furniture to electronics, fitness gear to party essentials – Rent with ease & save big! Flexible tenures, affordable rates, and hassle-free delivery. Rent now & enjoy!.______________ #RentInsteadOfBuying #SmartRenting #AffordableLiving #FurnitureOnRent #TechOnRent #FitnessOnRent #EventRentals #PartyEssentials #HomeDecorGoals #UpgradeWithoutBuying`;
    const buydesc = `🛍️ Own the Comfort You Deserve! 🪑📦 From stunning furniture to cutting-edge electronics – make it yours for good! No monthly fees, no return hassles. Buy once, enjoy forever. Style your space, your way. Shop now and elevate your lifestyle! #BuyWithConfidence #HomeUpgrades #FurnitureForKeeps #ElectronicsDeals #SmartShopping #OwnYourStyle #OneTimeInvestment #HomeGoals #ForeverYours #AdoreYourSpace`;

    const posts = allproducts.flatMap((product) => {
      if (product.availablefor === "Both")
        return ["Rent", "Buy"].map((store) => ({
          title: product?.name,
          link: `${domain}/Delhi/${store}/${product?.category}/${product?.subcat}/${product?._id}`,
          description: store === "Rent" ? rentdesc : buydesc,
          pubDate: today.toUTCString(), // Convert to proper date string
          imageUrl: product?.images[0],
        }));

      return {
        title: product?.name,
        link: `${domain}/Delhi/${
          product.availablefor === "Rent" ? "Rent" : "Buy"
        }/${product?.category}/${product?.subcat}/${product?._id}`,
        description: product.availablefor === "Rent" ? rentdesc : buydesc,
        pubDate: today.toUTCString(), // Convert to proper date string
        imageUrl: product?.images[0],
      };
    });

    const rssFeed = `
      <?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>Rentbean - Get the best deals on rent</title>
          <link>${domain}</link>
          <description>Rentbean - Get the best deals on rent</description>
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
