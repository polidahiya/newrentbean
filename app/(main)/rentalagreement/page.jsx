import React from "react";

const page = () => {
  return (
    <div className="text my-10 max-w-4xl mx-auto px-5">
      <h1 className="text-theme">RentBean India – Comprehensive Rental Agreement</h1>

      <p>Date of Agreement: __//20___</p>

      <h2>1. Parties Involved</h2>

      <p>
        <strong>Lessor/Owner:</strong>
        <br />
        RentBean India (A registered partnership firm)
        <br />
        Website: www.rentbean.in
        <br />
        Address: ______________________
        <br />
        ______________________
        <br />
        _________
        <br />
        Contact: _______________________
        <br />
        Authorized Representative: _______________________
      </p>

      <p>
        <strong>Lessee/Tenant (Customer):</strong>
        <br />
        Name: _______________________________________
        <br />
        Address: _______________________________________
        <br />
        Contact: _______________________
        <br />
        Email: _______________________
        <br />
        ID Proof (Aadhaar/Passport/PAN): _______________________
      </p>

      <hr />

      <h2>2. Rental Details</h2>
      <p>
        Rented Item(s): ___________________________ (e.g., Refrigerator, Sofa
        Set, Laptop, Treadmill, etc.)
        <br />
        Rental Duration: From __//20___ to __//20___
        <br />
        Monthly Rent: Rs. ________
        <br />
        Security Deposit: Rs. ________ (Refundable as per terms)
      </p>

      <hr />

      <h2>3. Terms and Conditions</h2>
      <ol>
        <li>
          Eligibility: Lessee must be 18 years or older with valid ID/address
          proof.
        </li>
        <li>
          Rental Ownership: All rented items remain the property of RentBean
          India or its vendors.
        </li>
        <li>
          Delivery & Pickup: RentBean India will handle delivery and pickup.
          Items must be returned in original condition.
        </li>
        <li>
          Usage: Use only for personal, non-commercial purposes unless otherwise
          agreed. Subletting is not allowed.
        </li>
        <li>
          Maintenance: Do not attempt repairs. Damage due to misuse will be
          charged to the lessee.
        </li>
        <li>
          Rent Payment: Monthly rent must be paid in advance through
          rentbean.in.
        </li>
        <li>
          Security Deposit: Refundable upon item return in good condition.
          Deductions will be made for any damage/loss.
        </li>
        <li>
          Cancellations: Cancellations before delivery incur processing fees.
          Mid-term cancellation may be billed proportionally.
        </li>
        <li>
          Termination: Requires 7-day notice. Early termination may involve
          adjusted charges.
        </li>
        <li>
          Loss/Theft: Must be reported immediately. Lessee may be liable for
          current market value.
        </li>
        <li>
          Force Majeure: RentBean India is not liable for delays or
          non-performance due to uncontrollable events.
        </li>
        <li>
          Jurisdiction: All legal matters fall under the courts of Gurgaon,
          Haryana.
        </li>
        <li>
          Governing Law: This agreement is governed by Indian Contract Law and
          IT Act, 2000.
        </li>
        <li>
          Digital Acceptance: Clicking {'"'}I Agree{'"'} or completing the transaction
          on rentbean.in constitutes legal acceptance.
        </li>
      </ol>

      <hr />

      <h2>4. Acknowledgement</h2>
      <p>
        By proceeding with a rental on rentbean.in, I confirm that I have read,
        understood, and agree to the terms of this Rental Agreement.
      </p>

      <p>
        <strong>Lessee Signature (Digital Acceptance):</strong>
        <br />
        Name: ____________________
        <br />
        Date: __//20___
      </p>
    </div>
  );
};

export default page;
