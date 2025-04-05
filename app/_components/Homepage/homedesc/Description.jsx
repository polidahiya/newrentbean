import React from "react";
import Link from "next/link";
import Wrapper from "./Wrapper";
import Togglebutton from "./Togglebutton";

function Description({ location }) {
  const popularplaces = {
    Gurgaon:
      "Sector 50, Sector 70, Manesar, Behrampur, Pataudi, and Daulatabad",
    Noida: "Sector 20, Sector 40, Sector 60, Sahibabad, and Chander Nagar",
    Delhi:
      "Nehru Place, Greater Kailash, Hauz Khas, Tilak Nagar, Moti Bagh, and RK Puram",
    Ghaziabad: "Indirapuram, Vaishali, Raj Nagar, Kavi Nagar, and Kaushambi",
    Faridabad: "Sector 15, Sector 21C, Ballabgarh, Old Faridabad, and NIT",
  };

  return (
    <div className="pb-[20px] px-7 md:px-[40px] text-justify">
      <header>
        <h1 className="text-[30px] mb-[40px] font-normal text-center font-recline">
          <strong className="font-bold font-recline">RentBean.in</strong> -
          Elevate Your Lifestyle
        </h1>
      </header>
      <main>
        <section>
          <h2 className=" text-[18px] font-semibold mt-[10px] font-recline ">
            Enhance Your Lifestyle with{" "}
            <strong className="font-bold">RentBean.in</strong> in {location}
          </h2>
          <p className=" text-[12px] my-[5px]">
            <strong className="font-bold">RentBean.in</strong> stands out as a
            premier provider of rental solutions in {location}, offering a wide
            array of{" "}
            <strong className="font-bold">top-quality furniture</strong>,{" "}
            <strong className="font-bold">appliances</strong>, and{" "}
            <strong className="font-bold">electronics</strong> to elevate your
            living experience. Why spend a fortune purchasing furniture,
            appliances, or gadgets when you can rent them from us at a fraction
            of the cost?
          </p>
          <p className=" text-[12px] my-[5px]">
            We understand that every individual&#39;s needs are different, which
            is why we offer flexible monthly rental subscriptions tailored to
            your budget and requirements. Choose from short-term to long-term
            subscriptions and enjoy maximum savings on our extensive range of
            products. Plus, renting with us comes with added perks such as free
            relocation, damage waiver, and complimentary maintenance.
          </p>
          <p className=" text-[12px] my-[5px]">
            Renting with <strong className="font-bold">RentBean.in</strong>{" "}
            couldn&#39;t be easier. Simply browse our website, select your
            desired items, specify the rental term, add them to your cart, and
            proceed to checkout. Once your order is confirmed, our dedicated
            team will promptly deliver the items to your doorstep anywhere in{" "}
            {location}, including popular areas like {popularplaces[location]}.
          </p>
        </section>
        <></>
        <Wrapper>
          <h2 className=" text-[18px] font-semibold mt-[10px] font-recline">
            Discover Premium Furniture, Appliances, and Electronics
          </h2>
          <p className=" text-[12px] my-[5px]">
            At <strong className="font-bold">RentBean.in</strong>, we take pride
            in offering premium products sourced from leading brands, ensuring
            that you have access to top-rated, quality-checked items for your
            home.
          </p>
          <p className=" text-[12px] my-[5px]">
            -{" "}
            <Link href={"/" + location + "/Health-&-Fitness/Fitness-Machines"}>
              Fitness and Gym item Rentals
            </Link>
            : Explore our wide selection of top-quality treadmills and other gym
            equipment for your fitness journey today.
          </p>
          <p className=" text-[12px] my-[5px]">
            -{" "}
            <Link href={"/" + location + "/Electronic/Home-Appliances"}>
              Appliance Rentals
            </Link>
            : Rent appliances from trusted names like Panasonic, Samsung, and
            Haier, including refrigerators, microwaves, washing machines, air
            conditioners, cooktops, and more.
          </p>
          <p className=" text-[12px] my-[5px]">
            -{" "}
            <Link href={"/" + location + "/Electronic"}>
              Electronics Rentals
            </Link>
            : Stay ahead with the latest smart gadgets by renting laptops,
            tablets, smartphones, and smart home devices from{" "}
            <strong className="font-bold">RentBean.in</strong>.
          </p>
          <p className=" text-[12px] my-[5px]">
            -{" "}
            <Link href={"/" + location + "/Event-&-Parties"}>
              Event & party items
            </Link>
            : Rent the life of the party! From hookahs to beer towers, DJ
            lights, and beyond, we&apos;ve got your event essentials covered.
            Let the good times roll with our extensive selection of rental
            items.
          </p>
        </Wrapper>
        <Wrapper>
          <h2 className=" text-[18px] font-semibold mt-[10px] font-recline">
            Enjoy Exclusive Benefits with Your Subscription
          </h2>
          <p className=" text-[12px] my-[5px]">
            <strong className="font-bold">RentBean.in</strong> goes above and
            beyond to ensure that renting with us is not only convenient but
            also rewarding. Here are some additional benefits you can expect:
          </p>
          <ul className="list-disc">
            <li className=" text-[12px] my-[5px] ml-[15px]">
              <strong className="font-bold">Free Maintenance:</strong> Our team
              provides complimentary maintenance for all rental products to keep
              them in top condition throughout your subscription.
            </li>
            <li className=" text-[12px] my-[5px] ml-[15px]">
              <strong className="font-bold">Product Swap:</strong> Swap your
              rental item for a newer design every 12 months and stay updated
              with the latest trends in the market.
            </li>
            <li className=" text-[12px] my-[5px] ml-[15px]">
              <strong className="font-bold">Damage Waiver:</strong> Rest easy
              knowing that minor accidental damages are covered under our
              policy.
            </li>
            <li className=" text-[12px] my-[5px] ml-[15px]">
              <strong className="font-bold">Fast Delivery:</strong> Experience
              lightning-quick delivery within 4 business days to any location in{" "}
              {location}.
            </li>
            <li className=" text-[12px] my-[5px] ml-[15px]">
              <strong className="font-bold">Free Installation:</strong> Let us
              handle the installation of your furniture or appliances at no
              extra cost.
            </li>
            <li className=" text-[12px] my-[5px] ml-[15px]">
              <strong className="font-bold">Hassle-free Returns:</strong> If you
              ever decide to return your rental item, we offer a full deposit
              refund for your peace of mind.
            </li>
          </ul>
        </Wrapper>
        <Wrapper>
          <h2 className=" text-[18px] font-semibold mt-[10px] font-recline">
            Unlock Exceptional Value with{" "}
            <strong className="font-bold">RentBean.in</strong>
          </h2>
          <p className=" text-[12px] my-[5px]">
            <strong className="font-bold">RentBean.in</strong> offers unbeatable
            deals on furniture, appliances, and electronics, allowing you to
            enjoy substantial savings without compromising on quality.
          </p>
          <p className=" text-[12px] my-[5px]">
            - Seamless Online Ordering: Place your order online in under 5
            minutes from the comfort of your smartphone or laptop.
          </p>
          <p className=" text-[12px] my-[5px]">
            - Cost-effective Rentals: Save big with our affordable monthly
            rental fees, significantly lower than the purchase price of the
            products.
          </p>
          <p className=" text-[12px] my-[5px]">
            - Quality Assurance: Rest assured knowing that all our products
            undergo rigorous quality checks to ensure they meet our high
            standards.
          </p>
          <p className=" text-[12px] my-[5px]">
            - Flexible Terms: Choose from a range of rental terms starting from
            3 months up to 3 years, giving you the freedom to customize your
            subscription according to your needs.
          </p>
        </Wrapper>
        <Togglebutton>
          <path d="M5.707 9.71a1 1 0 000 1.415l4.892 4.887a2 2 0 002.828 0l4.89-4.89a1 1 0 10-1.414-1.415l-4.185 4.186a1 1 0 01-1.415 0L7.121 9.71a1 1 0 00-1.414 0z"></path>
        </Togglebutton>
      </main>
    </div>
  );
}

export default Description;
