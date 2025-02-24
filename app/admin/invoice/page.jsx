import React from "react";
import { mail, mobile, address } from "@/app/commondata";

async function InvoiceComponent({ searchParams }) {
  const data = (await searchParams)?.data;
  const {
    orderNumber,
    paymentMethod,
    status,
    userdata,
    products,
    totalPrice,
    createdAt,
  } = JSON.parse(data);

  return (
    <div
      className="relative max-w-4xl mx-auto p-8 my-10 print:my-0 border"
      contentEditable="true"
    >
      {/* logo */}
      <img
        src="/logo&ui/3dlogo.png"
        alt="site logo"
        className="absolute top-5 left-5 h-4 md:h-9"
      />
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-700">Invoice</h1>
        <p className="text-sm text-gray-500">
          Invoice No: {generateInvoiceNumber()}
        </p>
        <p className="text-sm text-gray-500">Date: {formatDate()}</p>
      </div>

      {/* Seller & Buyer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8 mb-8">
        {/* Seller Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">Rentbean</h2>
          <div className="mt-2 not- text-gray-600">
            {address}
            <br />
            {/* GSTIN/UIN: {localdata.seller.gstin} */}
            {/* <br /> */}
            State Name: Haryana, Code: 06
            <br />
            Contact: {mobile}
            <br />
            Email: {mail}
          </div>
        </div>

        {/* Buyer Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">Bill To</h2>
          <div className="mt-2 not- text-gray-600">
            {userdata?.username}
            <br />
            {userdata?.address}
            <br />
            Phone: {userdata?.phonenum}
            <br />
            Email: {userdata?.email}
            <br />
            State Name: Haryana, Code: 06
          </div>
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
              <th className="border px-4 py-2 text-center text-gray-600">
                Quantity
              </th>
              <th className="border px-4 py-2 text-center text-gray-600">
                Rate
              </th>
              <th className="border px-4 py-2 text-center text-gray-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="relative bg-white">
                <td className="border px-4 py-3 text-gray-700">{item?.name}</td>
                <td className="border px-4 py-3 text-right text-gray-600">
                  {item?.quantity}
                </td>
                <td className="border px-4 py-3 text-right text-gray-600">
                  ₹{parseInt(100, 10).toLocaleString("en-IN")}
                </td>
                <td className="border px-4 py-3 text-right text-gray-600">
                  ₹{parseInt(100, 10).toLocaleString("en-IN")}
                </td>
                <button className="absolute top-0 left-full bg-red-500 text-white px-2 py-1 print:hidden">
                  x
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="bg-bg1 px-5 py-1 mt-5 shadow-md print:hidden">
          Add more
        </button>
      </div>

      {/* Totals & Tax */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-sm  text-gray-500">
            Amount Chargeable (in words):
          </p>
          <p className="font-semibold text-gray-700">
            {numberToWordsINR(totalPrice)}
          </p>
        </div>
        <div className="text-right">
          {/* <p className="font-semibold text-gray-700">
            IGST: ₹
            {parseInt(localdata.totals.igst, 10).toLocaleString("en-IN")}
          </p> */}
          <p className="text-xl font-bold text-gray-800">
            Total: ₹{parseInt(totalPrice, 10).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Bank Details</h3>
        <p className="text-gray-600">Bank Name: State Bank of India</p>
        <p className="text-gray-600">A/c No: 33985498679</p>
        <p className="text-gray-600">
          Branch & IFS Code: SECTOR 4 GURGAON & sbin0016019
        </p>
      </div>

      {/* Footer */}
      <div className="text-right">
        <p className="font-semibold text-gray-700">for Rentbean</p>
        <p className="text-gray-500">Authorised Signatory</p>
      </div>

      <p className="text-center mt-8 text-sm text-gray-400 ">
        This is a Computer Generated Invoice
      </p>
    </div>
  );
}

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
      let words = "";
      let power = 0;

      while (n > 0) {
        const remainder = n % 1000;
        if (remainder !== 0) {
          words =
            convertToWords(remainder) + " " + thousands[power] + " " + words;
        }
        n = Math.floor(n / 1000);
        power++;
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

  if (num === 0) return "Zero Rupees Only";
  if (num < 0) return "Minus " + numberToWordsINR(-num);

  const { rupees, paise } = splitNumber(num);
  return inWords(rupees, paise);
}

export default InvoiceComponent;
