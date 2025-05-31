import { HiStar } from "react-icons/hi";
import { SiComma } from "react-icons/si";
import { HiOutlineThumbUp } from "react-icons/hi";
import Nextimage from "@/app/_components/Nextimage";

export function Review1() {
  return (
    <div className="pl-10 drop-shadow-md">
      <div className="relative p-5 pl-12 rounded-xl space-y-1 bg-white">
        <Nextimage
          height={80}
          width={80}
          src="/logo&ui/reviewers/client2.png"
          alt="client 1"
          className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-20 aspect-square rounded-full object-cover border-4 border-slate-300"
        />
        <p className="text-2xl font-recline font-black">Rahul Panchal</p>
        <p className="flex text-sm  text-yellow-400">
          <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar />
        </p>
        <p className="text-sm ">
          &#34;I needed furniture for my temporary apartment, and this platform
          was a lifesaver! The renting prices were reasonable, and the return
          process was smooth. Will definitely use this service again.&#34;
        </p>
        <div className="flex absolute top-0 -translate-y-1/2 right-10 text-4xl">
          <SiComma className="stroke-2 stroke-white scale-150" />
          <SiComma className="stroke-2 stroke-white scale-150" />
        </div>
      </div>
    </div>
  );
}
export function Review2() {
  return (
    <div className="pr-10 mt-7 drop-shadow-md">
      <div className="relative p-5 pr-12 rounded-xl space-y-1 bg-white">
        <Nextimage
          height={80}
          width={80}
          src="/logo&ui/reviewers/client4.png"
          alt="client 1"
          className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-20 aspect-square rounded-full object-cover"
        />
        <p className="text-sm  text-center">
          &#34;I rented a laptop for work, and while the device was great, the
          delivery took a little longer than expected. Otherwise, the experience
          was smooth.&#34;
        </p>
        <div className="flex items-start justify-between pt-2">
          <div>
            <p className="text-2xl font-recline font-black">Tarun Mahiwal</p>
            <p>@Tarunmahiwal</p>
          </div>
          <p className="flex text-sm  text-yellow-400 mt-2">
            <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar />
          </p>
        </div>
      </div>
    </div>
  );
}
export function Review3() {
  return (
    <div className="p-7 pt-16 mt-2">
      <div className="relative p-5 pt-20 rounded-3xl shadow-md space-y-2 bg-white">
        <Nextimage
          height={128}
          width={128}
          src="/logo&ui/reviewers/client3.png"
          alt="client 1"
          className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-32 aspect-square rounded-full object-cover border-4 border-theme"
        />
        <p className="text-2xl font-recline font-black text-center">
          EXCELENT JOB!
        </p>
        <p className="flex items-center justify-center text-theme">
          <HiStar /> <HiStar /> <HiStar className="text-xl" /> <HiStar />{" "}
          <HiStar />
        </p>
        <p className="text-sm  text-center">
          &#34;I rented a treadmill for three months, and the entire process was
          seamless. The product was in excellent condition, and the delivery was
          on time. Customer support was also very responsive. Highly
          recommended!&#34;
        </p>
        <Nextimage
          height={80}
          width={150}
          src="/logo&ui/reviewers/vishal_signature.png"
          alt="signature image"
          className="w-full p-5 "
        />
      </div>
    </div>
  );
}
export function Review4() {
  return (
    <div className="pr-10">
      <div className="relative p-5 pr-12 rounded-xl drop-shadow-md space-y-1 bg-white">
        <Nextimage
          height={80}
          width={80}
          src="/logo&ui/reviewers/client33.jpg"
          alt="client 1"
          className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-20 aspect-square rounded-full object-cover"
        />
        <p className="text-sm  text-center">
          &#34;I rented a DSLR camera for my vacation, and it was a fantastic
          experience. The camera worked perfectly, and the rates were much
          better than buying one. Will use this platform again for future
          rentals!&#34;
        </p>
        <div className="flex items-start justify-between pt-2">
          <div>
            <p className="text-2xl font-recline font-black">Manish Kushwaha</p>
            <p>@manishKushwaha</p>
          </div>
          <p className="flex text-sm  text-yellow-400 mt-2">
            <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar />
          </p>
        </div>
      </div>
    </div>
  );
}
export function Review5() {
  return (
    <div className="relative flex gap-1 mt-7 p-3 rounded-full bg-white shadow-md">
      <Nextimage
        height={128}
        width={128}
        src="/logo&ui/reviewers/client44.png"
        alt="client 1"
        className="w-32 aspect-square rounded-full object-cover"
      />
      <div className="space-y-1">
        <p className="text-2xl font-recline font-black">Priya Bangalia</p>
        <p className="text-sm ">
          &#34;Renting from this platform was a breeze! The process was
          smooth,&#34;
        </p>
        <p className="flex items-center justify-end text-sm  text-theme mt-2 pr-10">
          <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar /> {"(5.0)"}
        </p>
      </div>
      <HiOutlineThumbUp className="absolute top-0 right-[10%] -translate-y-1/2 aspect-square p-2 text-xl box-content block bg-theme text-white rounded-full" />
    </div>
  );
}
export function Review6() {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 space-y-1">
        <p className="text-4xl font-recline font-black text-center py-5">
          Top-notch!
        </p>
        <p className="text-sm ">
          &#34;The platform offers a great range of rental products, and the
          service is smooth. However, some items are a bit pricey compared to
          competitors. Overall, still a great experience.&#34;
        </p>
        <p className="flex text-sm  text-yellow-400">
          <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar />
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 p-5 bg-slate-100 mt-auto">
        <Nextimage
          height={40}
          width={40}
          src="/logo&ui/reviewers/client5.png"
          alt="client 1"
          className="w-10 aspect-square rounded-full object-cover border-4 border-white"
        />
        <div>
          <p className="font-recline font-black">Sumit Choudhary</p>
          <p className="text-sm  -mt-1">@Sumitchoudhary</p>
        </div>
      </div>
    </div>
  );
}
export function Review7() {
  return (
    <div className="pt-14 pl-5 drop-shadow-md">
      <div className="relative p-5 pl-20 bg-white rounded-3xl ">
        <Nextimage
          height={120}
          width={80}
          src="/logo&ui/reviewers/client.jpg"
          alt="client"
          className="absolute top-1/2 left-0 -translate-x-1/4 -translate-y-1/2 w-20 aspect-[2/3] object-cover rounded-full  border-4 border-slate-200"
        />
        <p className="text-2xl font-recline font-black">Pawan</p>
        <p className="text-sm ">
          &#34;I rented a refrigerator for my PG, and it was a fantastic
          experience. The product was in perfect condition, and the team handled
          delivery and pickup smoothly. Great service!&#34;
        </p>
        <p className="text-end font-bold">@Pawan</p>
        <p className="absolute bottom-0 translate-y-1/2 right-10 px-1 rounded-full flex text-sm  text-white bg-theme mt-2">
          <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar />
        </p>
        <div
          className="absolute top-full left-10 w-14 aspect-square bg-white"
          style={{ clipPath: "polygon(0 61%, 100% 0, 23% 0)" }}
        ></div>
      </div>
    </div>
  );
}
export function Review8() {
  return (
    <div className="relative mt-14 flex flex-col bg-white rounded-3xl drop-shadow-md">
      <Nextimage
        height={80}
        width={80}
        src="/logo&ui/reviewers/clientshivani.jpg"
        alt="client55"
        className="max-h-36 w-full object-cover flex-1 rounded-t-3xl"
      />
      <div className="p-5 flex-1">
        <p className="text-2xl font-recline font-black text-center">
          RECOMENDED!
        </p>
        <p className="flex justify-center text-sm  text-yellow-400 my-2">
          <HiStar /> <HiStar /> <HiStar /> <HiStar /> <HiStar />
        </p>
        <p className="text-sm  text-center">
          &#34;Rented a gaming console for a month. The console worked
          perfectly, and the process was smooth, but delivery took an extra day.
          Overall, a good experience!&#34;
        </p>
      </div>
      <div className="absolute inset-2 rounded-2xl border-2 border-slate-300"></div>
      <div
        className="absolute bottom-10 left-full w-14 aspect-square bg-white"
        style={{ clipPath: "polygon(0 100%, 83% 100%, 0 40%)" }}
      ></div>
      <div
        className="absolute top-0 left-5 w-10 aspect-[1/2] bg-theme flex  justify-center pt-5
        text-xl text-white"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 71%, 0 100%, 0 0)" }}
      >
        <HiStar />
      </div>
    </div>
  );
}
export function Review9() {
  return (
    <div className="drop-shadow-md">
      <div className="relative p-4 bg-white rounded-3xl">
        <p className="text-sm  text-center">
          &#34;I needed a projector for a family gathering, and this platform
          had the best prices. The device was well-maintained, and the return
          process was super easy. Will definitely rent again!&#34;
        </p>
        <div className="flex justify-end">
          <div>
            <Nextimage
              height={80}
              width={80}
              src="/logo&ui/reviewers/signature1.png"
              alt="client1 signature"
              className="h-10"
            />
            <p>@parvesh</p>
          </div>
        </div>
        <div className="flex absolute bottom-0 translate-y-1/2 left-10 rotate-180 text-4xl">
          <SiComma className="stroke-2 stroke-white scale-150" />
          <SiComma className="stroke-2 stroke-white scale-150" />
        </div>
        <div
          className="absolute top-full right-20 w-10 aspect-square bg-white"
          style={{ clipPath: "polygon(0 0, 100% 52%, 70% 0)" }}
        ></div>
        <Nextimage
          height={80}
          width={80}
          src="/logo&ui/reviewers/client1.png"
          alt="client 1"
          className="absolute top-full translate-y-10 right-0 w-20 aspect-square rounded-full object-cover border-4 border-white"
        />
      </div>
    </div>
  );
}
