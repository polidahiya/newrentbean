"use client";
import React, { useEffect, useRef, useState } from "react";
import Previewblog from "./_addblogcomps/Previewblog";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdFileUpload } from "react-icons/md";
import { Addblogaction } from "./Serveraction";
import { AppContextfn } from "@/app/Context";
import { GrRefresh } from "react-icons/gr";
import { refreshblogsnow } from "@/app/_serveractions/Getcachedata";

function Addblog() {
  const mainheading = { type: "mainheading", content: "Main heading" };
  const heading = { type: "heading", content: "Heading" };
  const paragraph = {
    type: "paragraph",
    content: "Para",
  };
  const list = {
    type: "list",
    content: "List",
  };
  const { setmessagefn } = AppContextfn();
  const [blogdata, setblogdata] = useState([mainheading]);
  const [activelem, setactivelem] = useState(0);
  const [textarea, settextarea] = useState(mainheading?.content);
  const textarearef = useRef();
  const [preview, setpreview] = useState(false);
  const [loading, setloading] = useState(false);
  const [editmode, seteditmode] = useState({ mode: false, id: "" });
  const [deletedimages, setdeletedimages] = useState([]);

  const Addblogcomps = (comp) => {
    setblogdata((pre) => {
      let temp = [...pre];
      temp.push(comp);

      setactivelem(temp.length - 1);
      settextarea(comp?.content);

      return temp;
    });
  };

  const Addimage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setblogdata((pre) => {
        let temp = [...pre];

        let imagecomp = {
          type: "image",
          preview: reader.result,
          content: file,
        };

        temp.push(imagecomp);
        setactivelem(temp.length - 1);

        return temp;
      });

      e.target.value = null;
    };

    reader.readAsDataURL(file);
  };

  const submitBlog = async () => {
    try {
      setloading(true);
      const formData = new FormData();

      blogdata.forEach((item, index) => {
        if (item.type === "image") {
          if (item.content instanceof File)
            formData.append(`image-${index}`, item?.content);
          else
            formData.append(
              `image-${index}`,
              JSON.stringify({ type: "image", content: item?.content })
            );
        } else if (item.content.trim() != "")
          formData.append(`item-${index}`, JSON.stringify(item));
      });

      const res = await Addblogaction(formData, editmode, deletedimages);
      setmessagefn(res?.message);
      if (res?.status == 200) {
        seteditmode((pre) => ({ ...pre, mode: false }));
        setblogdata([mainheading]);
      }
      setloading(false);
    } catch (error) {
      console.error("Error submitting blog:", error);
      setmessagefn("Error submitting blog");
      setloading(false);
    }
  };

  useEffect(() => {
    if (blogdata.at(-1).type !== "image")
      setblogdata((pre) => {
        let temp = [...pre];
        if (temp[activelem]) temp[activelem].content = textarea;
        return temp;
      });
  }, [textarea]);

  return (
    <div>
      <div className="fixed top-16 right-2 z-10 flex gap-2">
        <button
          className=" border border-slate-300 p-2 rounded-md hover:text-sky-500 text-[20px] bg-white"
          title="Show preview"
          onClick={() => setpreview((pre) => !pre)}
        >
          <HiOutlineViewfinderCircle />
        </button>
        <button
          className=" border border-slate-300 p-2 rounded-md hover:text-sky-500 text-[20px] bg-white"
          title="Resfresh site now"
          onClick={async () => {
            const res = await refreshblogsnow();
            setmessagefn(res.message);
          }}
        >
          <GrRefresh />
        </button>
      </div>

      <Previewblog
        blogdata={blogdata}
        setblogdata={setblogdata}
        setactivelem={setactivelem}
        settextarea={settextarea}
        textarearef={textarearef}
        editmode={editmode}
        seteditmode={seteditmode}
        setdeletedimages={setdeletedimages}
      />
      <div
        className={`sticky bottom-0  flex-col gap-[10px] p-[10px] bg-bg1 ${
          preview ? "hidden" : "flex"
        }`}
      >
        <div className="flex flex-wrap items-center gap-[5px]">
          <Addbutton
            label="Main Heading"
            onclickfn={() => Addblogcomps(mainheading)}
          />
          <div className="relative bg-theme text-white rounded-md py-[2px] px-[10px]">
            Image
            <input
              className="absolute top-0 left-0 h-full w-full  opacity-0 cursor-pointer z-10"
              type="file"
              onInput={(e) => Addimage(e)}
            />
          </div>
          <Addbutton label="Heading" onclickfn={() => Addblogcomps(heading)} />
          <Addbutton
            label="Paragraph"
            onclickfn={() => Addblogcomps(paragraph)}
          />
          <Addbutton label="List" onclickfn={() => Addblogcomps(list)} />
          <Submitbutton
            submitBlog={submitBlog}
            loading={loading}
            editmode={editmode}
          />
          {editmode.mode && (
            <button
              className="h-full  rounded-md py-[2px] px-[10px] border border-slate-300 bg-white"
              onClick={() => {
                seteditmode((pre) => ({ ...pre, mode: false }));
                setblogdata([mainheading]);
              }}
            >
              Cancle
            </button>
          )}
        </div>
        <textarea
          value={textarea}
          onInput={(e) => settextarea(e.target.value)}
          ref={textarearef}
          className="border border-slate-300 rounded-md min-h-[100px] p-[5px] mt-auto"
          placeholder="Write Here!"
        ></textarea>
      </div>
    </div>
  );
}

const Addbutton = ({ label, onclickfn }) => (
  <button
    className="bg-theme text-white rounded-md py-[2px] px-[10px]"
    onClick={onclickfn}
  >
    {label}
  </button>
);

const Submitbutton = ({ submitBlog, loading, editmode }) => (
  <button
    className="flex items-center justify-center gap-1 h-full bg-green-500 ml-auto text-white rounded-md py-[2px] px-[10px]"
    onClick={submitBlog}
  >
    {loading ? (
      <div className="h-[15px] aspect-square border-[2px] border-white border-x-0 rounded-full animate-spin duration-200"></div>
    ) : (
      <MdFileUpload />
    )}
    {editmode.mode ? (
      <span>{loading ? "Updating..." : "Update blog"}</span>
    ) : (
      <span>{loading ? "Uploading..." : "Upload blog"}</span>
    )}
  </button>
);

export default Addblog;
