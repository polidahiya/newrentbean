import React from "react";
import { mail } from "@/app/commondata";

function page() {
  return (
    <div className="p-[10px] md:p-[40px]">
      <h1 className="text-center text-[25px] text-theme font-bold font-recline">
        Privacy Policy
      </h1>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">
        1. Information We Collect
      </h2>
      <p className="text-[14px]  ">
        We collect and store the following types of information when you
        interact with our website:
      </p>
      <ul>
        <li className="list-disc text-[14px] ml-[20px]">
          Personal Information: This may include your name, email address,
          postal address, and phone number when you provide it to us during
          account creation, rental booking, or through any other form of
          communication.
        </li>
        <li className="list-disc text-[14px] ml-[20px]">
          Browsing Information: We may collect non-personal information such as
          your IP address, browser type, referring website, pages viewed, and
          the duration of your visit. This information helps us improve our
          website and services.
        </li>
        <li className="list-disc text-[14px] ml-[20px]">
          Cart Data: We utilize the browser&#39;s local storage to store data
          related to your shopping cart, such as selected rental products and
          preferences. This enables a smoother user experience and helps you
          resume your shopping session later.
        </li>
      </ul>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">2. Use of Information</h2>
      <p className="text-[14px]  ">
        We use the collected information for the following purposes:
      </p>
      <ul>
        <li className="list-disc text-[14px] ml-[20px]">
          Providing Services: To process your rental bookings, communicate with
          you regarding your orders, and provide customer support.
        </li>
        <li className="list-disc text-[14px] ml-[20px]">
          Improving User Experience: To personalize your experience on our
          website, offer tailored recommendations, and enhance the usability of
          our platform.
        </li>
        <li className="list-disc text-[14px] ml-[20px]">
          Marketing Communications: With your consent, we may send promotional
          emails or newsletters about our products, services, and special
          offers. You can opt-out of these communications at any time.
        </li>
      </ul>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">3. Data Security</h2>
      <p className="text-[14px]  ">
        We take reasonable measures to protect your personal information from
        unauthorized access, alteration, disclosure, or destruction. This
        includes using encryption, secure socket layer (SSL) technology, and
        regularly updating our security practices.
      </p>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">4. Data Sharing</h2>
      <p className="text-[14px]  ">
        We do not sell, trade, or rent your personal information to third
        parties. However, we may share your data with trusted service providers
        who assist us in operating our website, conducting business, or
        servicing you, as long as those parties agree to keep this information
        confidential.
      </p>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">5. Legal Compliance</h2>
      <p className="text-[14px]  ">
        We may disclose your information when required by law or in response to
        lawful requests by public authorities, including to meet national
        security or law enforcement requirements.
      </p>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">6. Consent</h2>
      <p className="text-[14px]  ">
        By using our website and providing your personal information, you
        consent to the collection, use, and storage of your data as described in
        this Privacy Policy.
      </p>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">
        7. Changes to this Privacy Policy
      </h2>
      <p className="text-[14px]  ">
        We reserve the right to update or modify this Privacy Policy at any
        time. We will notify you of any changes by posting the updated policy on
        our website with the effective date.
      </p>
      <h2 className="font-bold text-[18px]  mt-5 font-recline">8. Contact Us</h2>
      <p className="text-[14px]  ">
        If you have any questions or concerns regarding this Privacy Policy or
        the handling of your personal information, please contact us at {mail}.
      </p>
    </div>
  );
}

export default page;
