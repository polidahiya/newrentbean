import React from "react";
import Link from "next/link";
import Imagescomp from "./_comps/Imagescomp";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import { categorylist, domain } from "@/app/commondata";
import { notFound } from "next/navigation";
import Promices from "@/app/_components/Homepage/Promices";
import { cookies } from "next/headers";
import Similarproducts from "./_comps/Similarproducts";
import { RxChevronRight } from "react-icons/rx";
import FAQSection from "@/app/_components/Faq";
import { AiOutlineHome } from "react-icons/ai";
import Details from "./_comps/Details";
import { mail } from "@/app/commondata";
import Productdesc from "./_comps/Productdesc";

async function Productpage({ category, subcat, productid }) {
  const token = cookies()?.get("token")?.value;
  const userdata = cookies()?.get("userdata")?.value;
  const parsedUserData = userdata ? JSON.parse(userdata) : null;
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
          <Imagescomp filteredproducts={filteredProduct} token={token} />
          <Details filteredProduct={filteredProduct} />
        </header>
        <Productdesc description={filteredProduct?.desc} />
        <Similarproducts
          allproducts={allproducts}
          category={category}
          subcat={subcat}
          productid={productid}
        />

        <FAQSection
          faqlist={[
            {
              question: "How can I place an order?",
              answer: [
                "Browse our website and add desired items to your cart.",
                "Follow the checkout process to enter shipping and payment details.",
              ],
            },
            {
              question: "What payment methods do you accept?",
              answer: [
                "We accept major cards (Credit/Debit), Credit Card EMI, Debit Cardless EMI, Net Banking, Wallet, UPI, and PayU.",
                "All transactions are secure and convenient.",
              ],
            },
            {
              question: "What does the furniture warranty cover?",
              answer: [
                "1-year structural warranty.",
                "5-year warranty against termites and borers.",
                "Covers manufacturing defects and workmanship issues.",
                "Ensures protection against termite/borer damage.",
              ],
            },
            {
              question: "What should I do if I receive a damaged item?",
              answer: [
                "Contact customer support within 24 hours of receiving the damaged item.",
                "Provide photos of the damage for quick assistance.",
                "We will arrange a replacement or rectification promptly.",
              ],
            },
            {
              question: "Is assembly/installation service available?",
              answer: [
                "Assembly services are not included with our products at this time.",
              ],
            },
            {
              question: "Can I track my order?",
              answer: [
                "Once your order is shipped, you will receive a confirmation email with a tracking link.",
                "Use the tracking link to check your order’s progress.",
              ],
            },
            {
              question: "Can I modify or cancel my order after placing it?",
              answer: [
                "You can cancel your order within 24 hours of placing it.",
                "After this period, the order cannot be canceled.",
                "If the product does not meet specifications, report the issue immediately.",
                `For more details, contact customer care or email us at <a href="mailto:${mail}" target="_blank" class="text-blue-500 hover:underline">${mail}</a>.`,
                "Products purchased on discount or during sales cannot be canceled.",
              ],
            },
            {
              question: "Do you offer bulk or wholesale pricing?",
              answer: [
                "Yes, we offer bulk and wholesale pricing for large orders.",
                "Contact our sales team via the Contact Us page for a personalized quote.",
              ],
            },
          ]}
        />
        <Promices />
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      {/* edit button */}
      {parsedUserData?.usertype == "admin" && (
        <Link
          href={`/admin/addproducts?id=${filteredProduct?._id}`}
          className="fixed bottom-14 lg:bottom-5 left-1/2 -translate-x-1/2 bg-theme text-white px-5 py-1 rounded-full z-10"
        >
          Edit
        </Link>
      )}
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
