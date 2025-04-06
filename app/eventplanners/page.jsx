import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa6";
import Events from "./Events";
import Footer from "./Footer";
import Testimonials from "./Testimonials";
import Trusties from "./_comps/Trusties";

export default function page() {
  return (
    <div className="">
      <div className="relative min-h-screen w-full">
        <nav className="relative flex justify-between  px-20 py-5 w-full text-white">
          <div className="text-xl font-semibold">LOGO</div>
          <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm flex items-center gap-10">
            <li>Contact us</li>
            <li>Contact us</li>
            <li>Contact us</li>
            <li>Contact us</li>
            <li>Contact us</li>
          </ul>
          <div className="">
            <button className="border border-white rounded-full px-5 py-2 hover:bg-white hover:text-theme cursor-pointer">
              Book now!
            </button>
          </div>
        </nav>
        <Trusties />
        <div className="absolute top-1/2 -translate-y-1/2 right-24 flex flex-col items-center">
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-white"></div>
          <div className="flex flex-col gap-5 text-white text-xl">
            <Link
              href={"/"}
              className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
            >
              <FaFacebook />
            </Link>
            <Link
              href={"/"}
              className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
            >
              <RiInstagramFill />
            </Link>
            <Link
              href={"/"}
              className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
            >
              <RiTwitterXFill />
            </Link>
            <Link
              href={"/"}
              className="border border-white border-opacity-50 rounded-full p-1 hover:bg-white hover:text-theme"
            >
              <FaPinterestP />
            </Link>
          </div>
          <div className="w-px h-20 bg-gradient-to-b from-white to-transparent"></div>
        </div>
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="https://media.istockphoto.com/id/1482061269/video/fun-party-friends-celebrating-new-years-eve-dancing-throwing-confetti-enjoying-glamorous.jpg?s=640x640&k=20&c=AOMMFJg1tnfVuzdE-fhTb6TMW_73CcbFI1Z7oWurT5U="
          />
          <source
            media="(min-width: 601px) and (max-width: 1024px)"
            srcSet="https://media.istockphoto.com/id/1482061269/video/fun-party-friends-celebrating-new-years-eve-dancing-throwing-confetti-enjoying-glamorous.jpg?s=640x640&k=20&c=AOMMFJg1tnfVuzdE-fhTb6TMW_73CcbFI1Z7oWurT5U="
          />
          <source
            media="(min-width: 1025px)"
            srcSet="https://media.istockphoto.com/id/1482061269/video/fun-party-friends-celebrating-new-years-eve-dancing-throwing-confetti-enjoying-glamorous.jpg?s=640x640&k=20&c=AOMMFJg1tnfVuzdE-fhTb6TMW_73CcbFI1Z7oWurT5U="
          />
          <img
            src="https://media.istockphoto.com/id/1482061269/video/fun-party-friends-celebrating-new-years-eve-dancing-throwing-confetti-enjoying-glamorous.jpg?s=640x640&k=20&c=AOMMFJg1tnfVuzdE-fhTb6TMW_73CcbFI1Z7oWurT5U="
            alt="Responsive Image"
            className="absolute  inset-0 h-full w-full object-cover -z-10"
          />
        </picture>
        {/* 
        <video
          controls={false}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 h-full w-full object-cover -z-10"
        >
          <source
            src="/eventplanners/Wedding_Listicle_Instagram_Reel_production_story_25959_9_16_1686297576278_SD2.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source
            src="/eventplanners/Wedding_Listicle_Instagram_Reel_production_story_25959_1_1_1687861309698_SD2.mp4"
            type="video/mp4"
            media="(min-width: 601px) and (max-width: 1024px)"
          />
          <source
            src="/eventplanners/Wedding_Listicle_Instagram_Reel_production_story_25959_16_9_1687860939448_SD2.mp4"
            type="video/mp4"
            media="(min-width: 1025px)"
          />
          Your browser does not support the video tag.
        </video> */}
      </div>
      <div className="px-10 mt-20">
        <Events />
      </div>
      <div className="px-10 mt-20">
        <Testimonials />
      </div>
      <div className="px-10 mt-20 text">
        <section>
          <h1>Professional Event Planning Services in Delhi & NCR</h1>
          <p>
            Welcome to our premier event planning company, your trusted partner
            in organizing unforgettable experiences across Delhi and the NCR
            region. Whether it{"'"}s a birthday celebration, wedding, corporate
            event, private party, school function, or a grand New Year’s Eve
            bash, we specialize in crafting tailored and memorable occasions.
          </p>

          <p>
            We proudly serve all major locations in Delhi and NCR, including:
            Delhi, Noida, Gurugram (Gurgaon), Faridabad, Ghaziabad, and Greater
            Noida.
          </p>

          <p>
            Our commitment to excellence has earned the trust of renowned
            companies like Airtel, IBM, HSBC, Wynk Music, Pizza Hut, Reebok, and
            The Lalit. Their continued association with us speaks volumes about
            our professionalism, creativity, and flawless execution.
          </p>

          <p>
            Let us bring your vision to life with seamless coordination,
            thematic decor, curated entertainment, and end-to-end event
            management. Get in touch today and make your next event truly
            extraordinary!
          </p>
        </section>
      </div>

      <div className="px-10 mt-20">
        <Footer />
      </div>
    </div>
  );
}
