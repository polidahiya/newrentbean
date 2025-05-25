import { getordershistory } from "@/app/_serveractions/Getordershistory";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { orderstages } from "@/app/commondata";
import Productnotfound from "@/app/_components/Productnotfound";
import Historyproductcard from "./Publicpage";


async function page() {
  const allcookies = await cookies();
  let token = allcookies.get("token");
  if (!token) redirect("/loginlogout");

  const res = await getordershistory();
  const ordershistory = res?.result || [];

  if (ordershistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)] bg-gray-50">
        <Productnotfound />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <h2 className="text-center font-bold text-[25px] md:text-3xl  font-recline  pt-5">
        Orders Details
      </h2>
      <div className="w-full min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-110px)] py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {ordershistory.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col gap-6">
                  {item?.product && (
                    <Historyproductcard item={item} product={item?.product} />
                  )}
                </div>
                <OrderStatus item={item} />
              </div>
            </div>
          ))}
          <p className="text-center text-sm  text-gray-500 mt-6 italic">
            Note: Order details reflect the state at purchase time and may not
            show current availability or prices.
          </p>
        </div>
      </div>
    </div>
  );
}

const OrderStatus = ({ item }) => {
  return (
    <div className="flex justify-center mt-6">
      {![4, 5].includes(item.status) && (
        <div className="bg-white rounded-lg lg:rounded-b-none pt-3 w-full md:w-[600px]">
          <div className="flex items-center w-full mt-2 px-10 md:px-[60px]">
            {orderstages.slice(0, 4).map((_, i) => (
              <div
                key={i}
                className={`flex items-center ${i !== 0 && "w-full"}`}
              >
                {i !== 0 && (
                  <div
                    className={`h-0.5 w-full ${
                      item.status >= i ? "bg-blue-500" : "bg-slate-300"
                    }`}
                  />
                )}
                <div
                  className={`min-w-[10px] aspect-square rounded-full ${
                    item.status >= i ? "bg-blue-500" : "bg-slate-300"
                  }`}
                />
              </div>
            ))}
            <div className={`flex items-center w-full`}>
              <div
                className={`h-0.5 w-full border-2 border-dashed ${
                  item.status == 6 ? "border-blue-500" : "border-slate-300"
                }`}
              />
              <div
                className={`min-w-[10px] aspect-square rounded-full ${
                  item.status == 6 ? "bg-blue-500" : "bg-slate-300"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full py-2 px-5 text-[10px] md:text-sm gap-2">
            {orderstages.slice(0, 4).map((stage, i) => (
              <span key={i} className="text-center">
                {stage}
              </span>
            ))}
            <span className="text-center">Completed</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
