import { useState, useEffect, useRef } from "react";
import PayUpayment from "@/app/_serveractions/Payupayment";
import Componentloading from "@/app/_components/Componentloading";
import { payulink } from "@/app/commondata";

export default function PaymentPage({ orderid, amount, userdata }) {
  const [payUData, setPayUData] = useState(null);
  const formRef = useRef(null); // Create a reference for the form

  useEffect(() => {
    const fetchData = async () => {
      const response = await PayUpayment({
        amount: amount,
        productInfo: orderid,
        firstName: userdata?.username,
        email: userdata?.email,
        txnId: `TXN_${Math.floor(Math.random() * 100000000)}`,
        phone: userdata?.phonenum,
      });
      setPayUData(response.payUParams);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (payUData && formRef.current) {
      formRef.current.submit(); // Auto-submit the form when payUData is available
    }
  }, [payUData]); // Run this effect when payUData changes

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <Componentloading />
        <form
          ref={formRef} // Attach the form reference
          action={payulink}
          method="POST"
        >
          <input type="hidden" name="key" value={payUData?.key} />
          <input type="hidden" name="txnid" value={payUData?.txnid} />
          <input type="hidden" name="amount" value={payUData?.amount} />
          <input
            type="hidden"
            name="productinfo"
            value={payUData?.productinfo}
          />
          <input type="hidden" name="firstname" value={payUData?.firstname} />
          <input type="hidden" name="email" value={payUData?.email} />
          <input type="hidden" name="phone" value={payUData?.phone} />
          <input type="hidden" name="surl" value={payUData?.surl} />
          <input type="hidden" name="furl" value={payUData?.furl} />
          <input type="hidden" name="hash" value={payUData?.hash} />
        </form>
      </div>
    </>
  );
}
