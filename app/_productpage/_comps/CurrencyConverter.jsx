import React from "react";
import { CgArrowsExchangeAlt } from "react-icons/cg";

// Exchange rates and details
const currencies = {
  USD: { name: "United States Dollar", symbol: "$", rate: 0.0121 },
  EUR: { name: "Euro", symbol: "€", rate: 0.0112 },
  JPY: { name: "Japanese Yen", symbol: "¥", rate: 1.76 },
  GBP: { name: "British Pound Sterling", symbol: "£", rate: 0.0097 },
  CHF: { name: "Swiss Franc", symbol: "CHF", rate: 0.0111 },
  AUD: { name: "Australian Dollar", symbol: "A$", rate: 0.0189 },
  CAD: { name: "Canadian Dollar", symbol: "C$", rate: 0.016 },
  CNY: { name: "Chinese Yuan", symbol: "¥", rate: 0.0881 },
  INR: { name: "Indian Rupee", symbol: "₹", rate: 1 },
  KRW: { name: "South Korean Won", symbol: "₩", rate: 15.15 },
  SGD: { name: "Singapore Dollar", symbol: "S$", rate: 0.0162 },
  MXN: { name: "Mexican Peso", symbol: "$", rate: 0.21 },
  RUB: { name: "Russian Ruble", symbol: "₽", rate: 1.22 },
  BRL: { name: "Brazilian Real", symbol: "R$", rate: 0.06 },
  ZAR: { name: "South African Rand", symbol: "R", rate: 0.22 },
};

const CurrencyConverter = ({ priceInINR }) => {
  return (
    <div className="relative group inline-block pl-5">
      {/* Button */}
      <button className="flex items-center gap-2 border border-yellow-500 text-yellow-500 rounded-full focus:outline-none">
        <CgArrowsExchangeAlt size={20} />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-10 w-80 md:w-96 bg-white shadow-lg rounded-md p-5 pointer-events-none group-hover:pointer-events-auto opacity-0  group-hover:opacity-100 transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100 z-20">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          Currency Conversions
        </h2>

        {/* Price in INR */}
        <p className="text-sm text-gray-600 mb-4">
          Price in INR:{" "}
          <span className="font-bold text-gray-900">₹{priceInINR}</span>
        </p>

        {/* Currency Conversion Grid */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(currencies).map(([code, { name, symbol, rate }]) => (
            <div key={code} className="p-2 rounded-lg bg-gray-50" title={name}>
              <span className="block text-xs font-semibold text-gray-800">
                {code}
              </span>
              <span className="block text-sm text-gray-600">
                {symbol}
                {(priceInINR * rate).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400 mt-4 font-light">
          Note: These currency conversions are based on approximate exchange
          rates and may not reflect real-time market fluctuations.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
