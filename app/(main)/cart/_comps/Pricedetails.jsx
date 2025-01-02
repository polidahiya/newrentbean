import Secureicon from "@/app/_svgs/Secureicon";

function Pricedetails({ cartlength, totalprice, totaldiscount }) {
  const deliverycahrges = cartlength * 200;
  return (
    <div className=" md:min-w-[400px] ">
      <div className="sticky top-[130px] w-full">
        <div className=" w-full bg-white border border-slate-300 ">
          <h2 className="text-[20px] font-bold px-[20px] py-[15px]">
            Order Summary
          </h2>
          <hr />
          <div className="flex flex-col gap-[20px] p-[20px]">
            <div className="flex items-center justify-between  ">
              <span>
                Price {"("}
                {cartlength} {cartlength == 1 ? "item" : "items"}
                {")"}
              </span>
              <span>₹{parseInt(totalprice, 10).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between  ">
              <span>Discount</span>
              <span>
                {" "}
                - ₹{parseInt(totaldiscount, 10).toLocaleString("en-IN")}
                <span className="text-sky-500">{"*"}</span>
              </span>
            </div>
            <div className="flex items-center justify-between  ">
              <span>Delivery Charges</span>
              <span>
                <span className="line-through">
                  ₹{parseInt(deliverycahrges, 10).toLocaleString("en-IN")}
                </span>
                <span className="text-green-600"> Free</span>
              </span>
            </div>
            <hr className="" />
            <div className="flex items-center justify-between  font-bold">
              <span>Total Amount</span>
              <span>
                {" "}
                ₹
                {parseInt(totalprice - totaldiscount, 10).toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
            <hr className="" />
            <p className=" text-green-500 font-bold text-center">
              You will save{" "}
              <span>
                ₹
                {parseInt(totaldiscount + deliverycahrges, 10).toLocaleString(
                  "en-IN"
                )}
              </span>{" "}
              on this order
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[10px] mt-[30px] pb-[30px] md:pb-0 px-[10px]">
          <Secureicon />
          <span>
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Pricedetails;
