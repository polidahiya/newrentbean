import Link from "next/link";
import React from "react";
import Image from "next/image";
import { RiStarSLine } from "react-icons/ri";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  // FaPaypal,
  FaGooglePay,
  // FaApplePay,
} from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
// import { IoMdCash } from "react-icons/io";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa6";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { sociallinks } from "../commondata";
import { FaSitemap } from "react-icons/fa";
import PWAInstallPrompt from "./Pwapromot";
import { IoShieldHalf } from "react-icons/io5";

// import ThemeSwitcher from "./Switchtheme";

function Footer() {
  const list1 = [
    { name: "About Us", link: "/About" },
    { name: "Blogs", link: "/Blogs" },
    { name: "Contact Us", link: "/Contact" },
    { name: "Shipping Policy", link: "/ShippingPolicy" },
    { name: "Privacy Policy", link: "/PrivacyPolicy" },
    { name: "Return and Refunds", link: "/ReturnandRefunds" },
    { name: "Terms & Conditions", link: "/Terms&Conditions" },
  ];
  const list2 = [
    { name: "Living Room", link: "/Living_Room" },
    { name: "Bedroom", link: "/Bedroom" },
    { name: "Storage", link: "/Storage" },
    { name: "Bar Furniture", link: "/Bar_Furniture" },
    { name: "Office Furniture", link: "/Office_Furniture" },
    { name: "Home Decor & More", link: "/Home_Decor_&_More" },
    { name: "More", link: "/#categories" },
  ];
  return (
    <footer className="bg-bg1 px-[30px] md:px-[50px] p-[20px] pt-[30px] lg:pt-[20px] text-[14px]">
      <section className=" flex gap-[50px] flex-col md:flex-row">
        <div className="flex-1 flex flex-col items-start">
          <Image
            src="/logo&ui/3dlogo.png"
            alt="logo image"
            width={200}
            height={52}
            className="h-[40px] w-auto"
          ></Image>
          <p className="mt-[30px]  mb-[20px] text-justify">
            Our mission is to provide high-quality, handcrafted wooden furniture
            and home decor that enhances your living space. We strive to offer
            exceptional value and create pieces that you&apos;ll cherish for
            years to come.
          </p>
          <Socialfollow />
        </div>
        {/*  */}
        <div className="flex flex-col flex-1  items-start">
          <Heading heading="Quick links" />
          <div className="flex flex-col gap-[10px] items-start">
            {list1.map((item, i) => (
              <Links key={i} name={item.name} link={item.link} />
            ))}
          </div>
        </div>
        {/*  */}
        <div className="flex flex-col flex-1  items-start">
          <Heading heading="Categories" />
          <div className="flex flex-col gap-[10px] items-start">
            {list2.map((item, i) => (
              <div key={i} className="flex items-center gap-[5px]">
                <Links key={i} name={item.name} link={item.link} />
                {i == list2.length - 1 && (
                  <MdOutlineArrowRightAlt className="" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />
      <section className="flex items-center justify-between flex-col-reverse lg:flex-row">
        <p className=" text-[12px] flex-1 mt-[10px] lg:mt-0">
          &copy; {new Date().getFullYear()}{" "}
          <strong className="font-bold">Rentbean.com</strong>. All rights
          reserved.
        </p>
        <div className="h-full flex flex-1 items-center justify-center flex-wrap gap-[20px] text-[12px]">
          <Link href="/Sitemap" className="flex items-center gap-1">
            <FaSitemap className="text-yellow-500" />
            Site map
          </Link>
          <PWAInstallPrompt />
          <Protectedbygoogle />
          {/* <ThemeSwitcher /> */}
        </div>
        <div className="flex flex-1 items-center justify-end gap-[10px]">
          <FaCcVisa size={15} title="Visa" />
          <FaCcMastercard size={15} title="MasterCard" />
          <FaCcAmex size={15} title="American Express" />
          {/* <FaPaypal size={15} title="PayPal" /> */}
          <FaGooglePay size={30} title="Google Pay" />
          {/* <FaApplePay size={30} title="Apple Pay" /> */}
          <AiFillBank size={15} title="Net Banking" />
          {/* <IoMdCash size={15} title="Cash on Delivery" /> */}
          <SiPaytm size={30} title="Paytm Wallet" />
          <SiPhonepe size={15} title="PhonePe" />
        </div>
      </section>
    </footer>
  );
}

function Heading({ heading }) {
  return (
    <h3 className="relative font-bold text-[20px] mb-[30px]">
      {heading}
      <span className="w-[120%] h-[2px] absolute bottom-[-5px] left-0 block bg-theme"></span>
    </h3>
  );
}

function Links({ name, link }) {
  return (
    <Link href={link} className="relative group">
      {name}
      <span className="w-0 h-[2px] absolute bottom-0 left-0 block bg-theme lg:group-hover:w-[calc(100%+20px)] duration-200"></span>
    </Link>
  );
}

const Protectedbygoogle = () => (
  <div className="group relative flex items-center gap-1 cursor-pointer">
    <IoShieldHalf className="text-yellow-500" />
    Protected by Google
    <p className="w-56 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-white rounded-lg p-2 text-black text-center hidden group-hover:block">
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        className="text-cyan-500 hover:underline"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        className="text-cyan-500 hover:underline"
      >
        Terms of Service
      </a>{" "}
      apply.
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 aspect-square bg-white rotate-45"></span>
    </p>
  </div>
);

function Socialfollow() {
  const social = [
    {
      title: "Facebook.com",
      link: sociallinks.facebook,
      logo: (
        <FaFacebook className="text-[20px] lg:group-hover:translate-y-1 duration-300" />
      ),
      qrcode: "/faceboo.svg",
    },
    {
      title: "X.com",
      link: sociallinks.twitter,
      logo: (
        <RiTwitterXFill className="text-[20px] lg:group-hover:translate-y-1 duration-300" />
      ),
      qrcode: "/x.com.svg",
    },
    {
      title: "Instagram.com",
      link: sociallinks.insta,
      logo: (
        <RiInstagramFill className="text-[20px] lg:group-hover:translate-y-1 duration-300" />
      ),
      qrcode: "/instagram.svg",
    },
    {
      title: "Pinterest.com",
      link: sociallinks.pinterest,
      logo: (
        <FaPinterestP className="text-[20px] lg:group-hover:translate-y-1 duration-300" />
      ),
      qrcode: "/pinterest.svg",
    },
  ];

  return (
    <div className="w-full flex items-center gap-5 mt-auto">
      <p className="text-[16px] font-bold">Socials:</p>
      {social.map((item, i) => (
        <Link
          key={i}
          href={item.link}
          className="group relative"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${item.title}`}
        >
          {/* Tooltip */}
          <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-gray-700 rounded-lg px-5 py-1 opacity-0 text-sm lg:group-hover:opacity-100 lg:group-hover:-top-10 pointer-events-none duration-500">
            <span className="bg-theme text-transparent bg-clip-text font-semibold">
              {item.title}
            </span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 rotate-45 aspect-square block bg-white"></span>
          </p>

          {/* Icon */}
          {item.logo}
        </Link>
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-[5px] lg:gap-[20px] w-full h-px mt-[50px] mb-[20px] bg-[linear-gradient(90deg,transparent,#cbd5e1,transparent)]"></div>
  );
}

export default Footer;
