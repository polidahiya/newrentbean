import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaBlog,
  FaShoppingCart,
  FaSignInAlt,
  FaCouch,
  FaBed,
  FaUtensils,
  FaTable,
  FaWarehouse,
  FaWineBottle,
  FaBook,
  FaLaptopHouse,
  FaInfoCircle,
  FaPhoneAlt,
  FaShippingFast,
  FaUserShield,
  FaUndo,
  FaFileContract,
  FaHeart,
} from "react-icons/fa";

const SiteMap = () => {
  const mainPages = [
    { loc: "/", label: "Home", icon: <FaHome /> },
    { loc: "/Blogs", label: "Blogs", icon: <FaBlog /> },
    { loc: "/cart", label: "Cart", icon: <FaShoppingCart /> },
    { loc: "/loginlogout", label: "Login/Logout", icon: <FaSignInAlt /> },
  ];

  const furnitureCategories = [
    { loc: "/Living_Room", label: "Living Room", icon: <FaCouch /> },
    { loc: "/Bedroom", label: "Bedroom", icon: <FaBed /> },
    { loc: "/Dining", label: "Dining", icon: <FaUtensils /> },
    { loc: "/Tables", label: "Tables", icon: <FaTable /> },
    { loc: "/Storage", label: "Storage", icon: <FaWarehouse /> },
    { loc: "/Bar_Furniture", label: "Bar Furniture", icon: <FaWineBottle /> },
    {
      loc: "/Study_and_Bookshelf",
      label: "Study and Bookshelf",
      icon: <FaBook />,
    },
    {
      loc: "/Office_Furniture",
      label: "Office Furniture",
      icon: <FaLaptopHouse />,
    },
    {
      loc: "/Home_Decor_&_More",
      label: "Home Decor & More",
      icon: <FaCouch />,
    },
  ];

  const policiesAndOthers = [
    { loc: "/About", label: "About", icon: <FaInfoCircle /> },
    { loc: "/Contact", label: "Contact", icon: <FaPhoneAlt /> },
    {
      loc: "/ShippingPolicy",
      label: "Shipping Policy",
      icon: <FaShippingFast />,
    },
    { loc: "/PrivacyPolicy", label: "Privacy Policy", icon: <FaUserShield /> },
    { loc: "/ReturnandRefunds", label: "Return & Refunds", icon: <FaUndo /> },
    {
      loc: "/Terms&Conditions",
      label: "Terms & Conditions",
      icon: <FaFileContract />,
    },
    { loc: "/orderdetails", label: "Order Details", icon: <FaFileContract /> },
    { loc: "/likedproducts", label: "Liked Products", icon: <FaHeart /> },
  ];

  const Section = ({ title, links }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold  mb-4">{title}</h2>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.loc}
              className="flex items-center p-4 text-lg font-medium bg-gray-50 rounded-lg shadow hover:bg-gray-100 hover:text-sky-500 transition-colors"
            >
              <span className="mr-3 text-xl text-sky-500">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center font-recline  mb-8">
        Site Map
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Section title="Main Pages" links={mainPages} />
        <Section title="Furniture Categories" links={furnitureCategories} />
        <Section title="Policies & Others" links={policiesAndOthers} />
      </div>
    </div>
  );
};

export default SiteMap;
