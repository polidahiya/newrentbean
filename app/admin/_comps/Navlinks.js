import { FaDollyFlatbed } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { IoBagAdd } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

export const navLinks = [
  { href: "/admin", label: "Home", logo: <FaHome /> },
  { href: "/admin/Orders/0", label: "Orders", logo: <FaDollyFlatbed /> },
  { href: "/admin/Users", label: "Users", logo: <HiUserGroup /> },
  { href: "/admin/Coupons", label: "Coupons", logo: <RiCoupon3Fill /> },
  { href: "/admin/Blogs", label: "Blogs", logo: <RiBloggerFill /> },
  { href: "/admin/addproducts", label: "Products", logo: <IoBagAdd /> },
  {
    href: "/admin/contactmessages",
    label: "Messages",
    logo: <AiFillMessage />,
  },
  { href: "/admin/settings", label: "Settings", logo: <IoSettingsSharp /> },
];
