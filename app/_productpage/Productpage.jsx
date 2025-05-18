import React from "react";
import Link from "next/link";
import ImagesComp from "./_comps/Imagescomp";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import { categorylist, domain, mail } from "@/app/commondata";
import { notFound } from "next/navigation";
import Promices from "@/app/_components/Homepage/Promices";
import { cookies } from "next/headers";
import Similarproducts from "./_comps/Similarproducts";
import FAQSection from "@/app/_components/Faq";
import Details from "./_comps/Details";
import Productdesc from "./_comps/Productdesc";
import Alongwith from "./_comps/Alongwith";
import Breadcrumbs from "../_components/Breadcrumbs";

async function Productpage({
  category,
  subcat,
  productid,
  location,
  store,
  isrentalstore,
}) {
  const allcookies = await cookies();
  const token = allcookies?.get("token")?.value;
  const userdata = allcookies?.get("userdata")?.value;
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

  const tenure =
    filteredProduct?.prices?.Default[
      filteredProduct?.prices?.Default.length - 1
    ];
  const instancerent = Math.floor(tenure?.price / tenure?.time);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: filteredProduct.name,
    image: filteredProduct.images?.[0] || "",

    description: filteredProduct.desc?.[0] || "Rent flexibly with - @Rentbean",

    sku: store + filteredProduct?.sku,
    productID: filteredProduct?._id + "_" + store,
    category: filteredProduct?.category,

    brand: {
      "@type": "Brand",
      name: filteredProduct?.brand || "Rentbean",
    },

    offers: {
      "@type": "Offer",
      url: `${domain}/${location}/${store}/${filteredProduct.category}/${filteredProduct.subcat}/${filteredProduct._id}`,
      priceCurrency: "INR",
      price: parseInt(
        isrentalstore ? instancerent : filteredProduct?.buyprice,
        10
      ),
      availability: filteredProduct.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Rentbean",
      },
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "10",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <article>
        <div className="pl-16 md:pl-24 lg:pl-10 mt-2 md:mt-4 bg-white text-theme text-sm ">
          <Breadcrumbs
            list={[
              { name: category, link: `/${location}/${store}/${category}` },
              {
                name: subcat,
                link: `/${location}/${store}/${category}/${subcat}`,
              },
            ]}
            currentroute={filteredProduct?.name}
            location={location}
          />
        </div>
        <header className="flex flex-col lg:flex-row items-start px-1 md:px-10 py-2  gap-5">
          <ImagesComp filteredproducts={filteredProduct} token={token} />
          <Details
            filteredProduct={filteredProduct}
            location={location}
            store={store}
            isrentalstore={isrentalstore}
          />
        </header>
        {filteredProduct?.alongwith?.length > 0 && (
          <Alongwith alongwith={filteredProduct?.alongwith} />
        )}
        <Productdesc description={filteredProduct?.desc} />
        <Similarproducts
          allproducts={allproducts}
          category={category}
          subcat={subcat}
          productid={productid}
          location={location}
          store={store}
          isrentalstore={isrentalstore}
        />
        <div className="mt-5">
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
                  "We accept major cards (Credit/Debit), Credit Card EMI, Debit Cardless EMI, Net Banking, Wallet, UPI.",
                  "All transactions are secure and convenient.",
                ],
              },
              {
                question: "Is there a security deposit?",
                answer: [
                  "Some items may require a refundable security deposit, which will be returned after the product is returned in good condition.",
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
                question: "How long does delivery take?",
                answer: [
                  "Delivery times vary based on location and availability, usually delivers within 1 or 2 days after KYC.",
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
                question: "Can I extend my rental period?",
                answer: [
                  "Yes, you can extend your rental by contacting us before the rental duration ends. Additional charges may apply.",
                ],
              },
            ]}
          />
        </div>
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
          prefetch={false}
          className="fixed bottom-20 lg:bottom-5 left-1/2 -translate-x-1/2 bg-theme text-white px-5 py-1 rounded-full z-10"
        >
          Edit
        </Link>
      )}
    </>
  );
}

export default Productpage;
