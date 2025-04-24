import React from "react";
import { media } from "@/app/eventplanners/commondata";

const page = () => {
  return (
    <div className="text">
      <h1 className="-translate-y-16 text-white">Privacy Policy</h1>
      <p>
        This Privacy Policy outlines how RentBean India collects, uses, and
        safeguards your information on Events.rentbean.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Name, contact details, address, and ID proof.</li>
        <li>Payment and billing information.</li>
        <li>Technical data such as cookies, IP address, and usage behavior.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To manage bookings, deliveries, and payments.</li>
        <li>To communicate updates, promotions, and service notifications.</li>
        <li>To analyze website performance and user behavior.</li>
      </ul>

      <h2>3. Data Sharing</h2>
      <p>
        We do not sell or share your data with unauthorized third parties. Your
        data may be shared only with logistics partners or service providers to
        fulfill your order.
      </p>

      <h2>4. Data Protection</h2>
      <p>
        Your data is stored securely with encryption and access controls in
        place. You can contact us for data access, correction, or deletion.
      </p>

      <h2>5. Cookies</h2>
      <p>
        We use cookies to personalize user experience. You can manage cookie
        settings in your browser.
      </p>

      <h2>6. Changes to Policy</h2>
      <p>
        This policy may be updated. Continued use of the platform indicates
        acceptance of any changes.
      </p>

      <p>
        <strong>Contact:</strong> {media?.email}
      </p>
    </div>
  );
};

export default page;
