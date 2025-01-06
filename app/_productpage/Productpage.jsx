import React from "react";
import Link from "next/link";
import Imagescomp from "./_comps/Imagescomp";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import { categorylist, domain } from "@/app/commondata";
import { notFound } from "next/navigation";
import Promices from "@/app/_components/Homepage/Promices";
import { cookies } from "next/headers";
import ProductCare from "./_comps/Productcare";
import Similarproducts from "./_comps/Similarproducts";
import { RxChevronRight } from "react-icons/rx";
import Bestselling from "../_components/Homepage/Bestselling";
import Newarrival from "../_components/Homepage/Newarrival";
import FAQSection from "@/app/_components/Faq";
import { AiOutlineHome } from "react-icons/ai";
import Details from "./_comps/Details";

async function Productpage({ category, subcat, productid }) {
  const token = cookies()?.get("token")?.value;
  const allproducts = await Cachedproducts();

  // Validate category, subcategory, and product existence
  if (
    !categorylist[category] ||
    !categorylist[category].subcat.some((item) => item.name === subcat) ||
    !allproducts.some((item) => item._id === productid)
  ) {
    notFound();
  }

  const filteredProduct = allproducts.find((item) => item._id === productid);
  console.log(filteredProduct);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: filteredProduct.name,
    image: filteredProduct?.images[0],
    description: filteredProduct.desc[0] || "Solid wood furniture - @Rentbean",
    sku: filteredProduct?.sku,
    brand: {
      "@type": "Brand",
      name: "Rentbean",
    },
    offers: {
      "@type": "Offer",
      url: `${domain}/${filteredProduct.category}/${filteredProduct.subcat}/${filteredProduct._id}`, // Dynamically adds the product URL
      priceCurrency: "INR",
      price: parseInt(filteredProduct.price, 10).toLocaleString("en-IN"),
      availability: filteredProduct.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: filteredProduct.rating,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <article>
        <Breadcrumbs
          category={category}
          subcat={subcat}
          productName={filteredProduct.name}
        />
        <header className="flex flex-col lg:flex-row items-start px-1 md:px-10 py-2 gap-5">
          <div className="flex-[2] lg:sticky lg:top-[130px]">
            <Imagescomp filteredproducts={filteredProduct} token={token} />
          </div>
          <Details filteredProduct={filteredProduct}/>
        </header>
        <ProductCare />
        <Similarproducts
          allproducts={allproducts}
          category={category}
          subcat={subcat}
          productid={productid}
        />
        {/* <div className="mt-10 lg:mt-20">
          <Bestselling products={allproducts} />
        </div>
        <div className="mt-10 lg:mt-20">
          <Newarrival products={allproducts} />
        </div> */}
        <FAQSection />
        <Promices />
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </>
  );
}

const Breadcrumbs = ({ category, subcat, productName }) => (
  <div className="pl-16 lg:pl-10 mt-5 bg-white text-theme flex items-center gap-[3px] text-[#87878] text-sm whitespace-nowrap cursor-pointer">
    <Link
      className="lg:hover:text-cyan-500 flex items-center justify-center gap-1"
      href="/"
    >
      <AiOutlineHome className="inline-block" />
      Home
    </Link>
    <RxChevronRight className="min-w-3" />
    <Link
      className="lg:hover:text-cyan-500"
      href={`/${category}`.replace(/-/g, " ")}
    >
      {category}
    </Link>
    <RxChevronRight className="min-w-3" />
    <Link
      className="lg:hover:text-cyan-500"
      href={`/${category}/${subcat}`.replace(/-/g, " ")}
    >
      {subcat}
    </Link>
    <RxChevronRight className="min-w-3" />
    <span className="text-ellipsis overflow-hidden">{productName}</span>
  </div>
);

export default Productpage;
