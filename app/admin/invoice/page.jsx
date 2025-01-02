import React from "react";
import { mail, mobile, address } from "@/app/commondata";
import { cookies } from "next/headers";

const InvoiceComponent = () => {
  // Extracted Invoice Data
  const invoiceData = {
    invoiceNumber: generateInvoiceNumber(),
    date: formatDate(),
    seller: {
      name: "Adorefurnix",
      address: address,
      gstin: "06EFNPS9216E1Z2",
      state: "Haryana",
      stateCode: "06",
      contact: mobile,
      email: mail,
    },
    buyer: {
      name: "Test User",
      address: "Test Address",
      phone: "9999999999 (Test Mobile Number)",
      email: "Testuser@gmail.com",
      state: "Haryana",
      stateCode: "06",
    },
    items: [
      {
        description: "Test Product Name",
        quantity: "1 PCS",
        rate: "13346",
        amount: "13346",
      },
    ],
    totals: {
      amountInWords: numberToWordsINR(15749.0),
      igst: "2402.00",
      total: "15748.00",
    },
    bankDetails: {
      bankName: "State Bank of India",
      accountNumber: "33985498679",
      branch: "SECTOR 4 GURGAON",
      ifsc: "sbin0016019",
    },
  };

  if (!cookies().get("admintoken"))
    return (
      <div className="h-screen grid place-content-center text-white">
        invalid user{" "}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 my-10" contentEditable="true">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-700">Tax Invoice</h1>
        <p className="text-sm text-gray-500">
          Invoice No: {invoiceData.invoiceNumber}
        </p>
        <p className="text-sm text-gray-500">Date: {invoiceData.date}</p>
      </div>

      {/* Seller & Buyer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8 mb-8">
        {/* Seller Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {invoiceData.seller.name}
          </h2>
          <address className="mt-2 not- text-gray-600">
            {invoiceData.seller.address}
            <br />
            GSTIN/UIN: {invoiceData.seller.gstin}
            <br />
            State Name: {invoiceData.seller.state}, Code:{" "}
            {invoiceData.seller.stateCode}
            <br />
            Contact: {invoiceData.seller.contact}
            <br />
            Email:{" "}
            <a
              href={`mailto:${invoiceData.seller.email}`}
              className="text-blue-500"
            >
              {invoiceData.seller.email}
            </a>
          </address>
        </div>

        {/* Buyer Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">Bill To</h2>
          <address className="mt-2 not- text-gray-600">
            {invoiceData.buyer.name}
            <br />
            {invoiceData.buyer.address}
            <br />
            Phone: {invoiceData.buyer.phone}
            <br />
            Email:{" "}
            <a
              href={`mailto:${invoiceData.buyer.email}`}
              className="text-blue-500"
            >
              {invoiceData.buyer.email}
            </a>
            <br />
            State Name: {invoiceData.buyer.state}, Code:{" "}
            {invoiceData.buyer.stateCode}
          </address>
        </div>
      </div>

      {/* Goods Table */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          Itemized Details
        </h3>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-left text-gray-600">
                Description of Goods
              </th>
              <th className="border px-4 py-2 text-right text-gray-600">
                Quantity
              </th>
              <th className="border px-4 py-2 text-right text-gray-600">
                Rate
              </th>
              <th className="border px-4 py-2 text-right text-gray-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="border px-4 py-3 text-gray-700">
                  {item.description}
                </td>
                <td className="border px-4 py-3 text-right text-gray-600">
                  {item.quantity}
                </td>
                <td className="border px-4 py-3 text-right text-gray-600">
                  ₹{parseInt(item.rate, 10).toLocaleString("en-IN")}
                </td>
                <td className="border px-4 py-3 text-right text-gray-600">
                  ₹{parseInt(item.amount, 10).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals & Tax */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-sm  text-gray-500">
            Amount Chargeable (in words):
          </p>
          <p className="font-semibold text-gray-700">
            {invoiceData.totals.amountInWords}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-700">
            IGST: ₹
            {parseInt(invoiceData.totals.igst, 10).toLocaleString("en-IN")}
          </p>
          <p className="text-xl font-bold text-gray-800">
            Total: ₹
            {parseInt(invoiceData.totals.total, 10).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Bank Details</h3>
        <p className="text-gray-600">
          Bank Name: {invoiceData.bankDetails.bankName}
        </p>
        <p className="text-gray-600">
          A/c No: {invoiceData.bankDetails.accountNumber}
        </p>
        <p className="text-gray-600">
          Branch & IFS Code: {invoiceData.bankDetails.branch} &{" "}
          {invoiceData.bankDetails.ifsc}
        </p>
      </div>

      {/* Footer */}
      <div className="text-right">
        <p className="font-semibold text-gray-700">
          for {invoiceData.seller.name}
        </p>
        <p className="text-gray-500">Authorised Signatory</p>
      </div>

      <p className="text-center mt-8 text-sm text-gray-400 ">
        This is a Computer Generated Invoice
      </p>
    </div>
  );
};

function formatDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Get the day and ensure two digits
  const month = months[today.getMonth()]; // Get the abbreviated month
  const year = String(today.getFullYear()).slice(-2); // Get the last two digits of the year

  return `${day}-${month}-${year}`;
}

function generateInvoiceNumber() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits for the month
  const day = String(today.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000); // Adding randomness for uniqueness

  return `INV-${year}${month}${day}-${random}`;
}

function numberToWordsINR(num) {
  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const thousands = ["", "Thousand", "Lakh", "Crore"];

  function convertToWords(n) {
    if (n === 0) return "";
    else if (n < 20) return belowTwenty[n] + " ";
    else if (n < 100)
      return tens[Math.floor(n / 10)] + " " + convertToWords(n % 10);
    else if (n < 1000)
      return (
        belowTwenty[Math.floor(n / 100)] + " Hundred " + convertToWords(n % 100)
      );
    else {
      const crore = Math.floor(n / 10000000);
      const lakh = Math.floor((n % 10000000) / 100000);
      const thousand = Math.floor((n % 100000) / 1000);
      const hundred = Math.floor((n % 1000) / 100);
      const ten = Math.floor((n % 100) / 10);
      const unit = n % 10;

      let words = "";

      if (crore > 0) {
        words += convertToWords(crore) + " Crore ";
      }
      if (lakh > 0) {
        words += convertToWords(lakh) + " Lakh ";
      }
      if (thousand > 0) {
        words += convertToWords(thousand) + " Thousand ";
      }
      if (hundred > 0) {
        words += convertToWords(hundred) + " Hundred ";
      }
      if (ten > 0) {
        words += convertToWords(ten) + " ";
      }
      if (unit > 0) {
        words += convertToWords(unit);
      }

      return words.trim();
    }
  }

  function splitNumber(num) {
    const rupees = Math.floor(num);
    const paise = Math.round((num - rupees) * 100);
    return { rupees, paise };
  }

  function inWords(rupees, paise) {
    let wordAmount = "";

    if (rupees > 0) {
      wordAmount += "INR " + convertToWords(rupees).trim() + " ";
    }
    if (paise > 0) {
      wordAmount += "and " + convertToWords(paise).trim() + " Paise ";
    }

    return wordAmount.trim() + " Only";
  }

  const { rupees, paise } = splitNumber(num);
  return inWords(rupees, paise);
}

export default InvoiceComponent;
