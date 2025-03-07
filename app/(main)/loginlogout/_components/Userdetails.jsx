"use client";
import React, { useRef, useState } from "react";
import Checkfields from "./Checkfileds";
import { AppContextfn } from "@/app/Context";
import { signup, login } from "../Serveractions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Usersvg from "@/app/_svgs/Usersvg";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Recaptcha from "@/app/_components/_helperfunctions/Recaptcha";
import { event } from "nextjs-google-analytics";

function Userdetails() {
  const router = useRouter();

  const { redirectloginlink, setmessagefn } = AppContextfn();

  const [signupform, setsignupform] = useState(false);
  const [togglepassword, settogglepassword] = useState(true);
  const nameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const phonenumref = useRef(null);
  const addressref = useRef(null);
  const [loading, setloading] = useState(false);

  const authenticateuser = () => {
    const filedcheckvalue = Checkfields({
      nameref,
      emailref,
      passwordref,
      phonenumref,
      addressref,
      setmessagefn,
      signupform,
    });

    if (!filedcheckvalue) return;

    setloading(true);

    const userdata = signupform
      ? {
          username: nameref.current.value,
          email: emailref.current.value,
          password: passwordref.current.value,
          phonenum: phonenumref.current.value,
          address: addressref.current.value,
        }
      : {
          email: emailref.current.value,
          password: passwordref.current.value,
        };

    const apiCall = signupform ? signup : login;

    Recaptcha(
      async () => {
        try {
          const reply = await apiCall(userdata);
          setmessagefn(reply?.message);

          if (reply?.status === 200) {
            setTimeout(() => {
              router.replace(redirectloginlink || "/");
            }, 1000);
          }
        } catch (error) {
          setmessagefn("An error occurred. Please try again.");
        } finally {
          setloading(false);
        }
      },
      () => {
        setmessagefn("Something went wrong!");
        setloading(false);
      }
    );
  };

  return (
    <div className="relative bg-white w-[90%] max-w-[750px] rounded-[20px] shadow-lg p-[30px]">
      <Image
        src="/logo&ui/minlogo.png"
        alt="logo image"
        className=" top-[20px] left-[30px] h-[50px] w-[50px]"
        width={156}
        height={60}
      ></Image>
      <div className="flex justify-center">
        <div className="relative w-fit flex items-center justify-center  text-[30px] ">
          <Usersvg styles="absolute top-[50%] left-0 translate-y-[-50%] translate-x-[-120%]  h-[30px] border border-slate-300 rounded-full fill-white" />
          {signupform ? "Sign up" : "Login"}
        </div>
      </div>

      <div className="mt-[20px] lg:grid lg:grid-cols-2 lg:gap-x-[30px] ">
        {signupform && <Inputfiels refval={nameref} type="text" lable="Name" />}
        <Inputfiels refval={emailref} type="email" lable="Email" />
        <Inputfiels
          refval={passwordref}
          type={togglepassword ? "password" : "text"}
          lable="Password"
          extraelem={
            <button
              className="absolute top-[50%] right-[10px] translate-y-[-50%] z-[11] text-[20px]"
              onClick={() => {
                settogglepassword(!togglepassword);
              }}
            >
              {togglepassword ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          }
        />
        {signupform && (
          <>
            <Inputfiels
              refval={phonenumref}
              type="number"
              lable="Mobile Number"
            />
            <Inputfiels
              refval={addressref}
              type="text"
              lable="Address"
              extrastyle="col-span-2"
            />
          </>
        )}
      </div>
      {/* login or signup button */}
      <div className="flex justify-center">
        <button
          className="relative group flex items-center justify-center gap-[10px] px-[100px] bg-theme py-[5px] text-white rounded-full mt-[20px]  overflow-hidden"
          onClick={authenticateuser}
        >
          {loading && (
            <div className="h-[20px] aspect-square rounded-full  border-r-2 border-l-2 border-white animate-spin z-10"></div>
          )}
          <span className="z-10">{signupform ? "Signup" : "Login"}</span>
        </button>
      </div>
      <div className="relative">
        <hr className="my-10" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8">
          or
        </span>
      </div>
      <SignInPage />

      {/* forgotpass and form switch */}
      <div className="flex gap-5 justify-center mt-5">
        {/* forgetpassword */}
        {!signupform && (
          <p className="text-[14px] text-center ">
            Forgot password?
            <Link
              href={"/forgotpassword"}
              className="text-theme cursor-pointer ml-1"
            >
              Reset
            </Link>
          </p>
        )}
        {/* form switcher */}
        <div className="text-[14px] text-center ">
          {signupform ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-theme cursor-pointer ml-1"
            onClick={() => {
              setsignupform(!signupform);
            }}
          >
            {signupform ? "Login" : "Signup"}
          </span>
        </div>
      </div>
    </div>
  );
}

function Inputfiels({ refval, type, lable, extraelem, extrastyle }) {
  return (
    <div
      className={`relative h-[35px] w-full my-[30px] lg:my-[15px] bg-transparent ${extrastyle}`}
    >
      <input
        ref={refval}
        className="forminput absolute h-full w-full top-0 left-0 flex items-center outline-none  border-b border-b-theme box-content bg-white text-black"
        type={type}
        required
      />
      <label className="formlabel absolute h-full w-full top-0 left-0 z-10 flex items-center bg-white  pointer-events-none duration-150">
        {lable}
      </label>
      {extraelem}
    </div>
  );
}

function SignInPage() {
  const { redirectloginlink } = AppContextfn();
  const [loading, setloading] = useState(false);

  const providers = [
    {
      name: "Google",
      id: "google",
      icon: (
        <svg
          viewBox="0 0 24 24"
          height={25}
          width={25}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
            fill="#F44336"
          />
          <path
            d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
            fill="#2196F3"
          />
          <path
            d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
            fill="#FFC107"
          />
          <path
            d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
            fill="#00B060"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
      {providers.map((provider) => (
        <button
          key={provider.id}
          className="relative w-full flex items-center justify-center gap-2 border border-slate-200 rounded-lg h-11"
          onClick={() => {
            setloading(true);
            signIn(provider.id, { callbackUrl: redirectloginlink || "/" });
            event("button_click", {
              category: "User Interaction",
              label: `login with ${provider.name}`,
              value: 1,
            });
          }}
        >
          {loading && (
            <div className="absolute top-1/2 left-5 -translate-y-1/2 h-full p-2">
              <div className=" h-full aspect-square border-4 border-t-theme border-gray-300 rounded-full animate-spin"></div>
            </div>
          )}
          {provider.icon}
          <span>Continue with {provider.name}</span>
        </button>
      ))}
    </div>
  );
}

export default Userdetails;
