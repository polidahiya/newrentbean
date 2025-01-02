import React from "react";
import { mail, mobile } from "@/app/commondata";

const page = () => {
  return (
    <div id="content" className="container mx-auto p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div id="primary" className="p-6">
          <main id="main">
            <article className="prose lg:prose-xl mx-auto">
              <header className="mb-6">
                <h1 className="text-3xl font-bold mb-4">
                  Return and Refunds {"–"} Adorefurnix
                </h1>
              </header>
              <div className="entry-content">
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  How to cancel an order placed on Adorefurnix?
                </p>
                <ul className="list-disc list-inside mb-6 pl-5 space-y-2 text-gray-700">
                  <li>
                    Cancellation within 24 hours: You can cancel your order
                    within 24 hours of placing it. After this period, the order
                    cannot be canceled.
                  </li>
                  <li>
                    Cancellation in case of wrong product: If the product does
                    not comply with the specifications as per your original
                    order, raise the issue immediately & report it to us.
                  </li>
                  <li>
                    For more details, please get in touch with us on our
                    customer care number or write to us at{" "}
                    <a
                      href={"mailto:" + mail}
                      className="text-blue-600 hover:underline"
                    >
                      {mail}
                    </a>
                  </li>
                  <li>
                    Products purchased on discount or during sale cannot be
                    canceled.
                  </li>
                  <li>
                    We provide a full refund on our products if canceled within
                    24 hours of purchase, subject to a specific time frame.
                    Please note that taxes and processing fees may be deducted
                    from the refund in some cases.
                  </li>
                </ul>
                <p className="font-semibold text-xl text-gray-800 mb-4">
                  Return & Refund:
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  At Adorefurnix, we take great care in delivering high-quality
                  furniture to our valued customers. Our goal is to ensure your
                  complete satisfaction with your purchase.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Refunds:
                  <br />
                  We regret to inform you that we do not offer refunds on any of
                  our products. We are confident in the quality and
                  craftsmanship of our furniture, and we believe that you will
                  be pleased with your purchase. However, if you encounter any
                  major damages to your furniture due to manufacturing defects,
                  please follow our Replacement Policy below.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Replacement Policy:
                  <br />
                  In the event of major damages occurring during transit or due
                  to manufacturing defects, we offer a Replacement Policy. If
                  you receive a damaged item, please follow these steps:
                </p>
                <ol className="list-decimal list-inside mb-6 pl-5 space-y-2 text-gray-700">
                  <li>
                    Contact our Customer Support team within 24 hours of
                    receiving the damaged item. You can reach us at {mobile}.
                  </li>
                  <li>
                    Provide clear photographs and a detailed description of the
                    damage to our support team.
                  </li>
                  <li>
                    Our team will review your case and, if eligible, arrange for
                    a replacement of the damaged furniture piece. We will strive
                    to provide you with the same product or an equivalent,
                    depending on availability.
                  </li>
                </ol>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Please note that our Replacement Policy covers major damages
                  and manufacturing defects only. We reserve the right to
                  determine the eligibility of a replacement based on the
                  provided information and photographic evidence.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Minor Damages:
                  <br />
                  For minor damages that may occur during transit, we can
                  arrange for a qualified vendor to repair and rectify the minor
                  damages. Please contact our Customer Support team for further
                  assistance.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  If you have any questions or need assistance with a damaged
                  product, please don{"’"}t hesitate to contact our Customer
                  Support team.
                </p>
                <p className="font-semibold text-xl text-gray-800 mb-4">
                  Warranties:
                </p>
                <ul className="list-disc list-inside mb-6 pl-5 space-y-2 text-gray-700">
                  <li>
                    The product comes with a 1-year structural warranty and a
                    5-year warranty against termites and borers.
                  </li>
                  <li>
                    This limited warranty does not apply to:
                    <ul className="list-disc list-inside pl-5 text-gray-700">
                      <li>
                        Small cuts, scratches or damage during the cleaning
                        process
                      </li>
                      <li>
                        Damage caused by the incorrect installation of a product
                      </li>
                      <li>Cracks during the random displacement</li>
                      <li>
                        Product kept in contact with direct sunlight and water,
                        resulting in decaying of wood
                      </li>
                    </ul>
                  </li>
                  <li>
                    With time, solid woods may develop minor cracks called
                    checks, which are not considered faults and are not covered
                    by the warranty as these checks do not affect the
                    product&apos;s lifespan.
                  </li>
                  <li>
                    As per industry standards, unevenness up to 5 mm can occur
                    due to differences in surfaces and floor levels. In such
                    cases, there is no warranty.
                  </li>
                  <li>
                    There is no warranty on upholstery/coverings/cushion covers.
                  </li>
                </ul>
                <p className="font-semibold text-xl text-gray-800 mb-4">
                  Delivery:
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Our support and delivery team will be in coordination with you
                  for a hassle-free delivery process.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Free delivery and COD is only applicable for Delhi NCR Orders.
                  Our delivery partner shall only deliver the product to the
                  ground floor in the absence of a service lift in your
                  apartment (if applicable).
                </p>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
