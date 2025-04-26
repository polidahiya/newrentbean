import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col px-5 md:px-10">
      <header className="relative py-6">
        <div className="container mx-auto text-center">
          <h1 className="aboutusheading font-black text-[10vw] lg:text-[9vw] font-recline">
            Rentbean.in
          </h1>
        </div>
      </header>
      <div className="flex justify-center">
        <p className="text-center max-w-[900px] italic text-[10px] md:text-base">
          Welcome to Rentbean.in, your ultimate destination for hassle-free
          rentals of fitness equipment, electronics, furniture, and more.
          Founded in 2016, Rentbean.in is dedicated to simplifying your renting
          experience, making it convenient, affordable, and enjoyable.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-black  mt-2 font-recline">
          Our Story:
        </h2>
        <p className="text-sm ">
          Since our inception in 2016, Rentbean.in has been committed to
          revolutionizing the way people access the items they need without the
          burden of ownership. Our journey began with a vision to provide a
          platform where convenience meets affordability, and we continue to
          uphold this commitment every day.
        </p>
        <h2 className="text-lg font-black  mt-2 font-recline">
          What We Offer:
        </h2>
        <p className="text-sm ">
          Wide Variety: Explore our diverse selection of high-quality products
          from top brands, carefully curated to cater to your needs.
        </p>
        <h2 className="text-lg font-black  mt-2 font-recline">
          Convenience:
        </h2>
        <p className="text-sm ">
          Rent what you need, when you need it, without the hassles of storage,
          maintenance, or upfront costs. Enjoy flexible rental options tailored
          to your schedule and preferences.
        </p>
        <h2 className="text-lg font-black  mt-2 font-recline">
          Quality Assurance:
        </h2>
        <p className="text-sm ">
          All our rental items undergo thorough inspections to ensure they meet
          our stringent standards of quality and reliability, giving you peace
          of mind with every rental.
        </p>
        <h2 className="text-lg font-black  mt-2 font-recline">
          Our Commitment:
        </h2>
        <p className="text-sm ">
          At Rentbean.in, we prioritize customer satisfaction above all else.
          Our dedicated team is here to provide you with exceptional service and
          support throughout your renting journey. Whether you&#39;re renting
          for personal use, events, or business purposes, we&#39;re committed to
          exceeding your expectations at every turn.
        </p>
        <h2 className="text-lg font-black  mt-2 font-recline">
          Get Started Today:
        </h2>
        <p className="text-sm ">
          Join the Rentbean.in community today and experience the freedom of
          renting. Browse our extensive catalog, select your items, and enjoy
          the convenience of temporary ownership without the long-term
          commitment. Let Rentbean.in be your trusted partner in making renting
          easy and accessible for everyone. Thank you for choosing Rentbean.in
          for all your rental needs. Here&#39;s to a simpler, more convenient
          way of living!
        </p>
      </div>
      <footer className="bg-gray-900 text-white py-4 mt-5">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Rentbean.in All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
