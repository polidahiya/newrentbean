"use client";
import React, { useState } from "react";

function Contactform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setDate("");
      setDetails("");
      setSubmitted(false);
    }, 2000);
  };
  return (
    <section id="booking" className="py-16 px-5 lg:px-0">
      <h2 className="text-4xl font-bold text-center text-white my-5">
        Let{"'"}s Plan Your Event!
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        {submitted && (
          <p className="text-green-600 mb-4 text-center">
            Thank you for your inquiry! We{"'"}ll get back to you soon.
          </p>
        )}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-gray-700 font-semibold mb-2 bg-white"
          >
            Preferred Event Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="details"
            className="block text-gray-700 font-semibold mb-2"
          >
            Event Details
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Tell us about your vision (theme, number of guests, etc.)"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-eventtheme text-white py-3 rounded-lg"
        >
          Submit Inquiry
        </button>
      </form>
    </section>
  );
}

export default Contactform;
