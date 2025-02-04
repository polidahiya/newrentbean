import React from "react";

function page() {
  return (
    <div className="p-[10px] md:p-[40px]">
      <h1 className="text-center text-[25px] text-theme font-bold font-recline">Shipping Policy</h1>
      <h2 className="font-bold text-[18px] mt-[20px] font-recline">
        {" "}
        1. When and where do you usually deliver?
      </h2>
      <p className="text-[14px]  ">
        We work on all days of the week. We do delivery, installation and
        pick-up. In case you do not have lift or permission to use lift at your
        premises, additional labor charges will be charged to carry the products
        through stairs. We are currently active in Delhi, Noida and Gurgaon.
        Please note: Installation for AC will incur additional charges, which
        will be communicated to you before placing the order.
      </p>
      <h2 className="font-bold text-[18px] mt-[20px] font-recline">
        2. Do you help us with relocation?
      </h2>
      <p className="text-[14px]  ">
        We help you with relocation free of cost within the city for our rented
        items only. If you are relocating to another city and we are present
        there, you can rent similar products in the other city. The relocation
        service may be availed only once throughout the tenure of the contract.
        We suggest customers to not relocate the product themselves. If any
        damages occur while a customer attempts to relocate the products
        themselves, damage cost would be recovered from the customer.
      </p>
      <h2 className="font-bold text-[18px] mt-[20px] font-recline">
        3. What if I am not at home at the time of delivery?
      </h2>
      <p className="text-[14px]  ">
        In case of the customers unavailability, please let us know who will be
        receiving the products.We would need an acknowledgement email from the
        customer with the nominees government id proof. We do this to ensure
        that your order is in safe hands.
      </p>
      <h2 className="font-bold text-[18px] mt-[20px] font-recline">
        4. What if my building does not have a lift?
      </h2>
      <p className="text-[14px]  ">
        In case you do not have a lift or permission to use the lift at your
        premises, extra labor charges will be applicable to carry the products
        via stairs; amount will depend on the order size and floor level.
      </p>
      <h2 className="font-bold text-[18px] mt-[20px] font-recline">
        5. What if my society does not allow vehicles inside?
      </h2>
      <p className="text-[14px]  ">
        Please note that you should ensure the entry of delivery vehicle inside
        the premises. Most of the times, it is not allowed to park the delivery
        vehicles on road. Please also ensure that you have completed the
        required documents and payment work mandatory with the landlord, we have
        observed that sometimes customers do not have permission to shift into
        the new house.
      </p>{" "}
    </div>
  );
}

export default page;
