// ShippingPolicy.jsx
import React from "react";
import { mail, mobile } from "@/app/commondata";

const ShippingPolicy = () => {
  return (
    <div id="content" className="container mx-auto p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div id="primary" className="p-6">
          <main id="main">
            <article className="prose lg:prose-xl mx-auto">
              <header className="mb-6">
                <h1 className="text-3xl font-bold mb-4">
                  Shipping Policy - Adorefurnix
                </h1>
              </header>
              <div className="entry-content">
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Adorefurnix is committed to delivering the customer&apos;s order
                  accurately, in good condition, and always on time as promised
                  by the website.
                </p>
                <ol className="list-decimal list-inside mb-6 text-lg leading-relaxed text-gray-700">
                  <li>
                    We offer FREE Shipping for all products ordered through our
                    site, if the customer&apos;s delivery location falls under the
                    serviceable city/town and the pin code.
                  </li>
                  <li>
                    Each order may be shipped only to a single destination
                    address specified at the time of payment for that order. If
                    the customer wishes to ship products to different addresses,
                    they need to place multiple orders.
                  </li>
                  <li>
                    We make our best efforts to ship each item in the customer&apos;s
                    order within 15 to 21 working days from the date of order
                    placement. However, in some cases, it may take longer, up to
                    30 working days, as we may have to arrange dispatch from
                    our factory. In the unlikely event that we are not able to
                    ship any order completely within 30 working days, we shall
                    cancel the remaining unshipped part of the order and send
                    an email informing the customer about the same. In such
                    cases, the payment against the unshipped part of the order
                    shall be refunded in the same mode and manner that the
                    customer had made the payment.
                  </li>
                  <li>
                    Our logistics department works on all working days of the
                    week (Monday to Saturday), excluding public holidays.
                  </li>
                  <li>
                    We strive to ship all items in the order together, but this
                    may not be possible in some cases due to product
                    characteristics or availability.
                  </li>
                  <li>
                    If the customer believes that the product is not in good
                    condition, or if the packaging is tampered with or damaged,
                    before accepting delivery of the goods, they are requested
                    to refuse to take delivery of the package and call our
                    Customer Care or send an email to{" "}
                    <a href={mail} className="text-blue-600 hover:underline">
                      {mail}
                    </a>
                    , mentioning their order reference number. Our customer
                    service team shall make our best efforts to ensure that a
                    replacement delivery is made to them at the earliest.
                  </li>
                  <li>
                    Customers may track the shipping status of their orders on
                    the {mail} website, by clicking at the Track Order section.
                  </li>
                  <li>
                    All items will be shipped with an invoice mentioning the
                    price, as per Indian Tax Regulations.
                  </li>
                </ol>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Contact Us
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  If you have any questions about our shipping policy, feel free
                  to reach out to our customer service team at{" "}
                  <a
                    href={`mailto:${mail}`}
                    className="text-blue-600 hover:underline"
                  >
                    {mail}
                  </a>{" "}
                  or contact us at {mobile}.
                </p>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
