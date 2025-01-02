import Image from "next/image";
import Link from "next/link";

function Emptycart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-111px)] p-[20px]">
      <Image
        src="/no-cart.png"
        alt="Empty cart image"
        height={300}
        width={300}
        
      ></Image>
      <p className="mt-[30px] font-bold text-[20px] text-center">
        Your Cart is Empty, Add Some Products.
      </p>
      <Link
        href="/"
        className="py-[10px] px-[50px] bg-theme text-white mt-[20px] rounded-full"
      >
        Home
      </Link>
    </div>
  );
}

export default Emptycart;
