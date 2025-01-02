import React from "react";
import { FaLeaf } from "react-icons/fa";

const ProductCare = () => {
  return (
    <div className="px-6 py-8 md:px-12 md:py-10 ">
      <h2 className="flex items-center gap-3 text-2xl font-semibold text-green-600 mb-6">
        <FaLeaf className="text-green-500 w-6 h-6" />
        Product Care Instructions
      </h2>
      <ul className="space-y-4 pl-6">
        <li className="flex items-start text-gray-700">
          <span className="block text-green-500 mr-2">•</span>
          <span>
            <strong>Dust Regularly:</strong> Use a soft, dry cloth to remove dust from surfaces.
          </span>
        </li>
        <li className="flex items-start text-gray-700">
          <span className="block text-green-500 mr-2">•</span>
          <span>
            <strong>Clean Spills Immediately:</strong> Wipe up any spills with a damp cloth to prevent stains.
          </span>
        </li>
        <li className="flex items-start text-gray-700">
          <span className="block text-green-500 mr-2">•</span>
          <span>
            <strong>Avoid Direct Sunlight:</strong> Keep furniture out of direct sunlight to prevent fading.
          </span>
        </li>
        <li className="flex items-start text-gray-700">
          <span className="block text-green-500 mr-2">•</span>
          <span>
            <strong>Use Coasters:</strong> Always use coasters under drinks to protect the surface.
          </span>
        </li>
        <li className="flex items-start text-gray-700">
          <span className="block text-green-500 mr-2">•</span>
          <span>
            <strong>Apply Wood Polish:</strong> For wooden furniture, apply a quality wood polish every 3-6 months.
          </span>
        </li>
      </ul>
      <div className="mt-8">
        <p className="text-gray-600 text-[14px] leading-relaxed ">
          Following these care instructions will help maintain the beauty and
          longevity of your furniture, ensuring it lasts for years to come.
        </p>
      </div>
    </div>
  );
};

export default ProductCare;
