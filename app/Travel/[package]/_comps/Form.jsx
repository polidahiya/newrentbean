"use client";
import React, { useState } from "react";
import { mobile } from "@/app/commondata";
import { AppContextfn } from "@/app/Context";

export default function TravelForm() {
  const { setmessagefn } = AppContextfn();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    checkIn: "",
    checkOut: "",
    adults: "",
    children: "",
    category: "Standard",
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreement) {
      setmessagefn("Please agree to the terms");
      return;
    }

    // Format message
    const message = `*Travel Enquiry Form*%0A
Name: ${formData.name}%0A
Mobile: ${formData.mobile}%0A
Email: ${formData.email}%0A
Check-In: ${formData.checkIn}%0A
Check-Out: ${formData.checkOut}%0A
Adults: ${formData.adults}%0A
Children (5-12 yrs): ${formData.children}%0A
Hotel Category: ${formData.category}%0A
Agreement: ${formData.agreement ? "Yes" : "No"}`;

    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/${mobile.replace(/ /g, "")}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-3xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Travel Enquiry Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border-b p-2 outline-none"
          required
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border-b p-2 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b p-2 outline-none"
          required
        />

        <div className="flex gap-4">
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full border-b p-2 outline-none"
            required
          />
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full border-b p-2 outline-none"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            name="adults"
            placeholder="Number of Adults"
            value={formData.adults}
            onChange={handleChange}
            className="w-full border-b p-2 outline-none"
            required
          />
          <input
            type="number"
            name="children"
            placeholder="Children (5-12 yrs)"
            value={formData.children}
            onChange={handleChange}
            className="w-full border-b p-2 outline-none"
          />
        </div>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border-b p-2 outline-none"
        >
          <option value="Standard">Standard</option>
          <option value="Luxury">Luxury</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
            className="w-4 h-4"
          />
          I authorize Rentbean India & its representatives to Call, SMS & Email me
          with reference to my Travel Enquiry. This consent will override any
          registration for DNC / NDNC.
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
