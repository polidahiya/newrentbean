"use client";
import { useState } from "react";
import { Sendmessage } from "@/app/_serveractions/Contactmessages";
import { AppContextfn } from "@/app/Context";
import Recaptcha from "@/app/_components/_helperfunctions/Recaptcha";
import { event } from "nextjs-google-analytics";

export default function ContactForm({ userdata }) {
  const { setmessagefn } = AppContextfn();

  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: userdata?.username ? userdata?.username : "",
    subject: "",
    email: userdata?.email ? userdata?.email : "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    Recaptcha(
      async () => {
        const res = await Sendmessage(formData);
        setloading(false);
        setmessagefn(res.message);
        if (res.status == 200) {
          setFormData({
            name: userdata?.username ? userdata?.username : "",
            subject: "",
            email: userdata?.email ? userdata?.email : "",
            message: "",
          });
        }
      },
      () => {
        setloading(false);
        setmessagefn("Something went wrong!");
      }
    );
  };

  return (
    <div className="bg-white  shadow-lg rounded-xl w-full p-8 border border-gray-200 ">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Send Us a Message
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-sm"
            required
            placeholder="Your Name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-sm"
            required
            placeholder="Your Email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-sm"
            required
            placeholder="Enter subject here"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className="block w-full max-h-96 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-sm"
            required
            placeholder="Type your message here!"
          ></textarea>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-[10px] w-full bg-theme text-white py-3 px-4 rounded-lg shadow-sm hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          onClick={() => {
            event("button_click", {
              category: "User Interaction",
              label: "Use send help message",
              value: 1,
            });
          }}
        >
          {loading && (
            <div className="h-[20px] aspect-square border-[2px] border-l-0 border-t-0 rounded-full border-white animate-spin duration-200"></div>
          )}
          Send Message
        </button>
      </form>
    </div>
  );
}
