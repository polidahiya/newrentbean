"use client";
import React from "react";

export default function IndiaTravelLanding() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.easemytrip.com/media/Blog/India/636992327688898040/636992327688898040tDeelE.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Explore Incredible India
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            From the Himalayas to Kerala backwaters, discover the beauty,
            culture, and adventure that India has to offer.
          </p>
          <button className="mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white text-lg shadow-lg">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Taj Mahal, Agra",
              img: "https://images.unsplash.com/photo-1548013146-72479768bada",
            },
            {
              name: "Jaipur, Rajasthan",
              img: "https://tourtravelling.com/wp-content/uploads/2018/03/Rajasthan-1.jpg",
            },
            {
              name: "Kerala Backwaters",
              img: "https://upload.wikimedia.org/wikipedia/commons/2/27/Houseboats_at_Kerala_Backwaters.jpg",
            },
          ].map((place, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={place.img}
                alt={place.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Exclusive Travel Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Golden Triangle Tour",
              price: "₹25,000",
              desc: "Delhi → Agra → Jaipur in 6 days",
            },
            {
              title: "Himalayan Adventure",
              price: "₹40,000",
              desc: "Manali, Leh & Ladakh trekking experience",
            },
            {
              title: "Kerala Luxury Escape",
              price: "₹35,000",
              desc: "Houseboat, Ayurveda & beaches",
            },
          ].map((pkg, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
              <p className="text-gray-600 mb-4">{pkg.desc}</p>
              <p className="text-orange-500 font-semibold">
                {pkg.price} / person
              </p>
              <button className="mt-4 px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white text-sm">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Amit Sharma",
              review:
                "Best trip ever! The Golden Triangle tour was perfectly planned.",
            },
            {
              name: "Sophia Thomas",
              review: "Kerala backwaters were magical, highly recommend!",
            },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="italic text-gray-700">“{t.review}”</p>
              <h4 className="mt-4 font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
