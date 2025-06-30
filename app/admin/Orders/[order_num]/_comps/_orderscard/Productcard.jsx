import Nextimage from "@/app/_components/Nextimage";
import { months } from "@/app/commondata";

export default function ProductCard({ product, coupon }) {
  if (!product) return null;

  const {
    name,
    isrentalstore,
    quantity,
    tenure,
    buyprice,
    securitydeposit,
    image,
    tenureStart,
  } = product;

  const formattedDate = tenureStart
    ? `${tenureStart?.date} ${months[tenureStart?.month]} ${tenureStart?.year}`
    : "";

  const totalPrice = isrentalstore
    ? tenure?.price * quantity
    : buyprice * quantity;

  // --- Coupon calculation ---
  let discountedPrice = totalPrice;
  if (coupon) {
    const discountValue = parseFloat(coupon.discountValue || 0);
    if (coupon.discountType === "percentage") {
      discountedPrice = totalPrice - (totalPrice * discountValue) / 100;
    } else if (coupon.discountType === "fixed") {
      discountedPrice = totalPrice - discountValue / coupon.share;
    }
  }

  const formattedPrice = `₹${parseInt(discountedPrice, 10).toLocaleString(
    "en-IN"
  )}/-`;
  const originalPriceFormatted = `₹${parseInt(totalPrice, 10).toLocaleString(
    "en-IN"
  )}/-`;

  const formattedDeposit = `₹${parseInt(
    securitydeposit * quantity,
    10
  ).toLocaleString("en-IN")}/-`;

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center border border-gray-100 rounded-lg overflow-hidden shadow-sm">
      {/* Image */}
      <div className="w-full md:h-40 md:w-40">
        <Nextimage
          className="w-full h-full object-cover aspect-square"
          src={image}
          alt={name}
          width={400}
          height={400}
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="sm:w-2/3 w-full p-5 space-y-3 text-gray-800">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {name}
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base">
          <div>
            <span className="font-medium">Type:</span>{" "}
            {isrentalstore ? "For Rent" : "For Sale"}
          </div>

          {isrentalstore && (
            <>
              <div>
                <span className="font-medium">Tenure Start:</span>{" "}
                {formattedDate}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {tenure?.time}{" "}
                {tenure?.type}
              </div>
            </>
          )}

          <div>
            <span className="font-medium">Quantity:</span> {quantity}
          </div>

          <div>
            <span className="font-medium">Price:</span>{" "}
            <span className="text-green-600 font-semibold">
              {formattedPrice}
            </span>
            {coupon && (
              <span className="ml-2 text-gray-500 line-through text-sm">
                {originalPriceFormatted}
              </span>
            )}
          </div>

          {isrentalstore && (
            <div>
              <span className="font-medium">Security Deposit:</span>{" "}
              <span className="text-blue-600 font-semibold">
                {formattedDeposit}
              </span>
            </div>
          )}
        </div>

        {/* Applied Coupon Display */}
        {coupon && (
          <div className="text-sm text-orange-600 font-medium mt-2">
            Coupon <span className="font-bold">{coupon.code}</span> applied:{" "}
            {coupon.discountType === "percentage"
              ? `${coupon.discountValue}% off`
              : `Total ₹${coupon.discountValue} off in ${coupon.share} products @ ₹${coupon.discountValue / coupon.share} per product`}
          </div>
        )}
      </div>
    </div>
  );
}
