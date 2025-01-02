"use client";

import { useEffect, useState } from "react";
import {
  Getmessage,
  deletemessage,
  changestatus,
} from "@/app/_serveractions/Contactmessages";
import Componentloading from "@/app/_components/Componentloading";
import { BiRefresh } from "react-icons/bi";
import { FaClipboard } from "react-icons/fa";
import { AppContextfn } from "@/app/Context";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

function Page() {
  const [messages, setmessages] = useState([]);
  const [loading, setloading] = useState(true);
  const [resfresh, setresfresh] = useState(0);
  const [messagetype, setmessagetype] = useState("all");

  useEffect(() => {
    (async () => {
      setloading(true);
      const messageres = await Getmessage(messagetype);
      setmessages([...messageres?.messages]);
      setloading(false);
    })();
  }, [messagetype, resfresh]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Componentloading />
      </div>
    );
  } else {
    return (
      <div>
        <Switchmessages
          messagetype={messagetype}
          setmessagetype={setmessagetype}
          setresfresh={setresfresh}
        />
        {messages.length != 0 ? (
          <div className={`p-[20px] flex flex-wrap gap-[20px]`}>
            {messages.map((item) => (
              <Card
                key={new Date().getMilliseconds() + Math.random()}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center text-[25px]">
            No messages
          </div>
        )}
      </div>
    );
  }
}

const Switchmessages = ({ messagetype, setmessagetype, setresfresh }) => {
  return (
    <div className="sticky top-[50px] bg-white w-full flex items-center gap-[10px]  p-[10px] px-[40px] shadow-md z-20 border-t border-t-slate-300">
      <button
        className={`border border-slate-300 px-[10px] py-[5px] rounded-[5px] ${
          messagetype == "all" && "bg-theme text-white"
        }`}
        onClick={() => {
          setmessagetype("all");
        }}
      >
        All messages
      </button>
      <button
        className={`border border-slate-300 px-[10px] py-[5px] rounded-[5px] ${
          messagetype == "viewed" && "bg-theme text-white"
        }`}
        onClick={() => {
          setmessagetype("viewed");
        }}
      >
        Viewed messages
      </button>
      {/* refresh messages */}
      <button
        className="h-full aspect-square border border-slate-300 px-[10px] py-[5px] rounded-[5px] ml-auto"
        title="Refresh messages"
        onClick={() => {
          setresfresh((pre) => pre + 1);
        }}
      >
        <BiRefresh />
      </button>
    </div>
  );
};

const Card = ({ item }) => {
  const { _id, name, email, subject, message, viewed } = item;

  const { setmessagefn } = AppContextfn();
  const [deleted, setdeleted] = useState(false);

  const handleCopyEmail = () => {
    if (!navigator.clipboard) {
      // Fallback for browsers that do not support the Clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setmessagefn("Mail copied");
      } catch (err) {
        console.error("Failed to copy email:", err);
        setmessagefn("Failed to copy email");
      }
      document.body.removeChild(textarea);
    } else {
      // Modern Clipboard API
      navigator.clipboard.writeText(email).catch((err) => {
        setmessagefn("Failed to copy email");
        console.error("Failed to copy email:", err);
        return;
      });
      setmessagefn("Mail copied");
    }
  };

  if (!deleted)
    return (
      <div className="relative flex-1 min-w-full md:min-w-[400px] max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden mt-8 border border-gray-200">
        <div className="absolute right-[5px] top-[5px] flex gap-[5px] h-[35px]">
          <button
            className="h-full aspect-square grid place-content-center border border-slate-300 rounded-[5px] text-blue-500"
            title="Set Viewed"
            onClick={async () => {
              const res = await changestatus(_id, !viewed);
              setmessagefn(res?.message);
              if (res?.status == 200) setdeleted(true);
            }}
          >
            <FaRegEye />
          </button>
          <button
            className="h-full aspect-square grid place-content-center border border-slate-300 rounded-[5px] text-red-500"
            onClick={async () => {
              const res = await deletemessage(_id);
              setmessagefn(res?.message);
              if (res?.status == 200) setdeleted(true);
            }}
          >
            <MdDelete />
          </button>
        </div>
        <div className="p-6">
          <div className="text-2xl font-bold text-gray-900 mb-2">{name}</div>
          <div className="flex items-center space-x-2 mb-4">
            <div
              className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 truncate"
              onClick={handleCopyEmail}
            >
              {email}
            </div>
            <FaClipboard
              className="text-blue-600 cursor-pointer hover:text-blue-800"
              onClick={handleCopyEmail}
              title="Copy email"
            />
          </div>
          <div className="text-sm text-gray-700 mb-4">
            <strong className="text-gray-900">Subject:</strong> {subject}
          </div>
          <div className="text-gray-800">{message}</div>
        </div>
      </div>
    );
};

export default Page;
