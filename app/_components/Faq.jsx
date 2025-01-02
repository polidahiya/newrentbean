"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { mail } from "../commondata";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "To place an order, simply browse our website and add the desired items to your cart. Follow the easy checkout process to enter your shipping information and payment details.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major cards (Credit/Debit), Credit Card EMI, Debit Cardless EMI, Net Banking, Wallet, UPI, and PayU for secure and convenient transactions.",
    },
    {
      question: "What does the furniture warranty cover?",
      answer:
        "The product comes with a 1-year structural warranty and a 5-year warranty against termites and borers. Our warranty typically covers manufacturing defects and workmanship issues, including termite/borer damage. It ensures that your furniture is free from defects in materials and construction.",
    },
    {
      question: "What should I do if I receive a damaged item?",
      answer:
        "We apologize for the inconvenience. Please contact our customer support team within 24 hours of receiving the damaged item. Provide photos of the damage, and we will promptly assist you with a replacement or rectification.",
    },
    {
      question: "Is assembly/installation service available?",
      answer:
        "Assembly services are not included with our products at this time",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes, once your order is shipped, you will receive a confirmation email with a tracking link. You can use this link to track your order's progress on our website.",
    },
    {
      question: "Can I modify or cancel my order after placing it?",
      answer: `You can cancel your order within 24 hours of placing it. After this period, the order cannot be canceled. If the product does not comply with the specifications as per your original order, raise the issue immediately & report it to us. For more details, please get in touch with us on our customer care number or write to us at <a href="mailto:${mail}" target="_blank" class="text-blue-500 hover:underline">${mail}</a>. Products purchased on discount or during sale cannot be canceled.`,
    },
    {
      question: "Do you offer bulk or wholesale pricing?",
      answer:
        "Yes, we offer bulk and wholesale pricing for larger orders. Please reach out to our sales team through our Contact Us page to discuss your specific needs and receive a personalized quote.",
    },
  ];

  return (
    <div className="px-5 md:px-10 mt-10 lg:mt-20">
      <h3 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions :
      </h3>
      {faqs.map((faq, index) => (
        <Faq key={index} faq={faq} />
      ))}
    </div>
  );
};

const Faq = ({ faq }) => {
  const [activeIndex, setActiveIndex] = useState(false);

  return (
    <div className="border-b mb-4">
      <div
        onClick={() => setActiveIndex(!activeIndex)}
        className="cursor-pointer text-lg font-medium py-3 flex justify-between items-center"
      >
        {faq.question}
        <FaChevronDown
          className={`ml-2 transition-transform duration-300 ${
            activeIndex && "rotate-180"
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          activeIndex ? "max-h-48 md:max-h-28 lg:max-h-24" : "max-h-0"
        }`}
      >
        <div
          className="p-3 text-sm"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      </div>
    </div>
  );
};

export default FAQSection;
