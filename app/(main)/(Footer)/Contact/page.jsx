import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { mail, mobile, address } from "@/app/commondata";
import ContactForm from "./Form";
import { cookies } from "next/headers";

const page = () => {
  let userdata = cookies().get("userdata")?.value;
  if (userdata) userdata = JSON.parse(userdata);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-4xl flex items-start flex-col lg:flex-row gap-[20px] w-full ">
        <ContactCard />
        <ContactForm userdata={userdata} />
      </div>
    </div>
  );
};

const ContactCard = () => {
  return (
    <div className="lg:sticky lg:top-[158px] bg-white w-full shadow-lg rounded-xl p-8 border border-gray-200">
      <h2 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h2>
      <p className="text-gray-700 mb-8">
        Feel free to reach out to us through this form. We&apos;ll get back to
        you as soon as possible!
      </p>
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Our Contact Details
        </h3>
        <div className="flex flex-col space-y-4 text-gray-600">
          <div className="flex items-center space-x-3 text-[14px]">
            <FaEnvelope className="text-cyan-400 text-xl" />
            <p>
              <strong>Email:</strong> {mail}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[14px]">
            <FaPhone className="text-cyan-400 text-xl" />
            <p>
              <strong>Phone:</strong> {mobile}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[14px]">
            <FaMapMarkerAlt className="text-cyan-400 text-xl" />
            <p>
              <strong>Address:</strong> {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
