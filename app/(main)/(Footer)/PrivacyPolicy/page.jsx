import React from "react";
import { mail } from "@/app/commondata";

function page() {
  return (
    <div id="content" className="container mx-auto p-4">
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div id="primary" className="p-6">
          <main id="main">
            <article className="prose lg:prose-xl mx-auto">
              <header className="mb-6">
                <h1 className="text-3xl font-bold mb-4" itemprop="headline">
                  Privacy Policy
                </h1>
              </header>

              <div className="entry-content" itemprop="text">
                <p>
                  <strong>Adorefurnix</strong> is a proprietorship owned by{" "}
                  <strong>Vishal</strong>. We use the highest security standards
                  to ensure our customers&apos; secure online transactions. As the data
                  controller, we are responsible for securing your data and are
                  committed to practicing advanced firewall technology for order
                  processes.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Respecting Your Privacy
                </h3>
                <p>
                  Adorefurnix is committed to respecting your privacy. Therefore,
                  we set the highest ethical standards to protect your sensitive
                  information.
                </p>
                <p>
                  We value the trust you have placed in us; please read the
                  document regarding our privacy policy. If you have any queries
                  about our privacy policy, please contact our Customer Support.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Type of information we collect
                </h3>
                <ol className="list-decimal list-inside pl-5">
                  <li>
                    We may collect your contact details, such as your name,
                    email address, phone number, postal address, and delivery
                    address (if different).
                  </li>
                  <li>
                    We may require your banking details such as credit card
                    number, cardholder name, expiration date, and CVV or other
                    details necessary for Internet banking.
                  </li>
                  <li>
                    We will collect your session and log-in information, which
                    includes your IP address, operating system, browser type,
                    browser language, date, and time of request.
                  </li>
                  <li>
                    We will also collect sign-in information for third-party
                    accounts shared on our website such as Facebook, Twitter,
                    Pinterest, etc.
                  </li>
                  <li>
                    We shall ask for email communication from any user, for
                    product inquiries, order and transaction details, for any
                    complaints, and disputes, etc.
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  How we use or share it
                </h3>
                <p>
                  We conduct our business in an ethical manner; hence we collect
                  the personal information of our users or customers only to
                  cater to the best products and services at {mail}. We do not
                  sell, trade, share, or transfer your information to any third
                  parties.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  User Consent
                </h3>
                <p>
                  When you access the website or fill in your details to buy the
                  products or services offered at the website, Adorefurnix will
                  accept it as your consent to the privacy policy. For users
                  who are not comfortable with the clauses and conditions to
                  share their personally identifiable information, it is
                  requested to abort the use of the website. We also provide an
                  opt-out option to our registered users to unsubscribe from all
                  non-essential emails and communication from us and our
                  partners.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  More Information
                </h3>
                <p>
                  In case you have any questions regarding our privacy
                  practices, feel free to contact our Customer Support.
                </p>

                <p className=" mt-4">
                  Note: The privacy policy of {mail} may be subject to change at
                  any time to include or exclude clauses; thus, users are
                  requested to visit this page in a timely manner to stay aware
                  of the changes. The above privacy policy does not apply to our
                  affiliates, partners, and any third party associated with us;
                  for further interaction, kindly review the privacy statement
                  of the respective.
                </p>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

export default page;
