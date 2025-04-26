import Image from "next/image";
import Link from "next/link";

function Emptycart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-111px)] p-5">
      <Image
        src="/no-cart.png"
        alt="Empty cart image"
        height={300}
        width={300}
        
      ></Image>
      <p className="mt-7 font-bold text-xl text-center">
        Your Cart is Empty, Add Some Products.
      </p>
      <Link
        href="/Delhi"
        className="py-2 px-12 bg-theme text-white  mt-5 rounded-full"
      >
        Home
      </Link>
    </div>
  );
}

export default Emptycart;
