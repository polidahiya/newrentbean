import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { sociallinks } from "@/app/commondata";

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      <header className="relative py-6">
        <div className="container mx-auto text-center">
          <h1 className="aboutusheading font-black text-[10vw] lg:text-[9vw] font-recline">
            Adorefurnix.com
          </h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to Adorefurnix
          </h2>
          <p className="mb-4">
            At Adorefurnix, we are passionate about bringing the beauty and
            warmth of wooden furniture and home decor to your space. Our
            collection features handcrafted pieces made from high-quality,
            sustainably sourced wood, designed to add elegance and functionality
            to your home.
          </p>
          <p className="mb-4">
            Founded in 2018, we pride ourselves on our commitment to quality
            craftsmanship and exceptional customer service. Each piece of
            furniture is carefully designed and crafted by skilled artisans who
            share our dedication to excellence. Whether you&apos;re looking for
            a statement piece or a functional addition to your home, we have
            something to suit every taste and style.
          </p>
          <p className="mb-4">
            We believe that furniture should not only be beautiful but also
            durable and timeless. That&apos;s why we use only the finest
            materials and adhere to rigorous quality standards. Our goal is to
            help you create a home that reflects your personal style and stands
            the test of time.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Our Mission</h3>
          <p className="mb-4">
            Our mission is to provide high-quality, handcrafted wooden furniture
            and home decor that enhances your living space. We strive to offer
            exceptional value and create pieces that you&apos;ll cherish for
            years to come.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Our Vision</h3>
          <p>
            We envision a world where every home is adorned with beautiful,
            sustainable, and thoughtfully designed furniture. Our vision is to
            lead the industry in both innovation and tradition, setting new
            standards for quality and style.
          </p>
        </section>
        <section className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center gap-4">
            <a
              href={sociallinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href={sociallinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href={sociallinks.insta}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Adorefurnix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
