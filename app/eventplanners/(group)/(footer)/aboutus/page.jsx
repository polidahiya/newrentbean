import React from "react";
import { media } from "@/app/eventplanners/commondata";

const AboutUs = () => {
  return (
    <div className="text">
      <h1 className="-translate-y-16 text-white">About Us</h1>

      <p>
        <strong>Events.rentbean</strong> is a one-stop destination for all your
        event planning needs. Operated by <strong>RentBean India</strong>, we
        specialize in curating unforgettable experiences for every occasion —
        from grand <strong>weddings</strong> and joyous{" "}
        <strong>birthday celebrations</strong> to professional{" "}
        <strong>corporate events</strong> and vibrant{" "}
        <strong>festival gatherings</strong>.
      </p>

      <p>
        We understand that every event is unique, and that’s why we offer a
        comprehensive range of services and rentals including:
      </p>
      <ul>
        <li>Event furniture and decor</li>
        <li>Sound systems and lighting setups</li>
        <li>Stage and seating arrangements</li>
        <li>Theme-based decorations</li>
        <li>Customized planning for special occasions</li>
      </ul>

      <p>
        Our mission is to make event planning simple, seamless, and stress-free.
        Whether you{"'"}re hosting an intimate gathering or a large-scale
        celebration, our team of event specialists will ensure everything is
        planned and executed to perfection.
      </p>

      <p>
        We pride ourselves on professionalism, creativity, and a client-first
        approach. With years of experience in the industry, our goal is to turn
        your vision into a memorable reality.
      </p>

      <p>
        <strong>Contact us</strong> today and let’s start planning your next
        event!
      </p>
      <p>
        <strong>Email:</strong> {media?.email}
      </p>
      <p>
        <strong>Phone:</strong> {media?.phone}
      </p>
    </div>
  );
};

export default AboutUs;
