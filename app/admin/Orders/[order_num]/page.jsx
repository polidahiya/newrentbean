import React from "react";
import { getadminorders } from "@/app/_serveractions/Adminorders";
import Selectordertype from "./_comps/Selectordertype";
import Ordercard from "./_comps/_orderscard/Ordercard";
import Productnotfound from "@/app/_components/Productnotfound";
import { revalidatePath } from "next/cache";
import Searchbox from "./_comps/Searchbox";
import Pagenation from "../../_comps/Pagenation";

async function page({ params, searchParams }) {
  const { order_num } = await params;
  const { page, query, filter } = await searchParams;
  // const issearchpage = order_num == "search";

  const ordertype = Number(order_num) || 0;
  const pagenumber = Number(page) || 1;
  const searchterm = query;
  const searchfilter = Number(filter) || 0;
  const numberoforders = 20;
  const ordersres = await getadminorders(
    ordertype,
    pagenumber,
    numberoforders,
    searchterm,
    searchfilter
  );

  // refresh orders
  const Refreshorders = async (link) => {
    "use server";
    revalidatePath(link);
  };
  if (ordersres.status != 200) {
    return (
      <>
        <Adminnavcomp ordertype={ordertype} Refreshorders={Refreshorders} />
        <div className="h-screen w-full flex items-center justify-center text-red-500">
          {ordersres.message}
        </div>
      </>
    );
  }

  const orders = ordersres?.result || [];
  const pages = Math.ceil(ordersres?.totalposts / numberoforders);

  return (
    <div>
      <Adminnavcomp
        ordertype={ordertype}
        Refreshorders={Refreshorders}
        totalorders={ordersres?.totalposts}
      />

      {orders.length == 0 && <Productnotfound />}

      <div className={`p-5`}>
        {orders.map((item, i) => {
          return (
            <Ordercard
              key={new Date().getMilliseconds() + Math.random() + i}
              item={item}
            />
          );
        })}
      </div>
      {/* pagenation */}
      <Pagenation pages={pages} currentPage={Number(pagenumber)} />
    </div>
  );
}
const Adminnavcomp = ({ ordertype, Refreshorders, totalorders }) => {
  return (
    <div className="sticky top-[50px] bg-white py-[5px] px-2 md:px-10  shadow-md z-30">
      <Selectordertype
        ordertype={ordertype}
        Refreshorders={Refreshorders}
        totalorders={totalorders}
      />
      <Searchbox />
    </div>
  );
};

export default page;
