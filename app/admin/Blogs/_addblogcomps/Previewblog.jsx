import { MdOutlineArrowRightAlt } from "react-icons/md";
import { IoMdArrowRoundUp } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import Showblogs from "./Showblogs";
import { SlCalender } from "react-icons/sl";

export default function Previewblog({
  blogdata,
  setblogdata,
  setactivelem,
  settextarea,
  textarearef,
  editmode,
  seteditmode,
  setdeletedimages,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-screen px-6 md:px-12">
      <div className="flex-[2] ">
        {blogdata.map((item, i) => {
          switch (item?.type) {
            case "mainheading":
              return (
                <h1
                  key={i}
                  className="group hover:ring-2 ring-indigo-300 relative text-[32px] font-extrabold my-4 font-recline  tracking-wide cursor-pointer transition-all duration-200"
                  onClick={() => {
                    setactivelem(i);
                    settextarea(item?.content);
                    textarearef.current.focus();
                  }}
                >
                  {item?.content}
                  <Controlsmenu
                    index={i}
                    blogdata={blogdata}
                    setblogdata={setblogdata}
                  />
                  {i == 0 && (
                    <span className="flex items-center gap-2 text-[14px] font-normal mt-3 ml-3 text-gray-500">
                      <SlCalender />
                      <span>{item?.date || "02/12/24"}</span>
                    </span>
                  )}
                </h1>
              );
            case "heading":
            case "paragraph":
            case "list":
              return (
                <div
                  key={i}
                  className={`group hover:ring-2 ring-indigo-300 relative my-2 cursor-pointer transition-all duration-200 ${
                    item?.type == "heading" ? "text-[22px] font-semibold" : "text-[16px]"
                  }`}
                  onClick={() => {
                    setactivelem(i);
                    settextarea(item?.content);
                    textarearef.current.focus();
                  }}
                >
                  {item?.type == "list" && (
                    <MdOutlineArrowRightAlt className="inline-block text-indigo-500" />
                  )}
                  {item?.content}
                  <Controlsmenu
                    index={i}
                    blogdata={blogdata}
                    setblogdata={setblogdata}
                  />
                </div>
              );
            case "image":
              let image;
              if (item?.content instanceof File) image = item?.preview;
              else image = item?.content;
              return (
                <div
                  key={i}
                  className="group hover:ring-2 ring-indigo-300 relative flex justify-center md:justify-start mb-4 transition-all duration-200"
                >
                  <img
                    src={image}
                    onClick={() => setactivelem(i)}
                    loading="lazy"
                    alt=""
                    className="w-full md:max-w-[60%] aspect-video object-cover object-center rounded-lg shadow-md mb-4"
                  />
                  <Controlsmenu
                    index={i}
                    blogdata={blogdata}
                    setblogdata={setblogdata}
                    editmode={editmode}
                    item={item}
                    setdeletedimages={setdeletedimages}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
      <Showblogs
        setblogdata={setblogdata}
        seteditmode={seteditmode}
        setdeletedimages={setdeletedimages}
      />
    </div>
  );
}

const Controlsmenu = ({
  index,
  blogdata,
  setblogdata,
  editmode,
  item,
  setdeletedimages,
}) => {
  const moveUp = (index) => {
    if (index === 0) return;
    const newblogdata = [...blogdata];
    [newblogdata[index], newblogdata[index - 1]] = [
      newblogdata[index - 1],
      newblogdata[index],
    ];
    setblogdata(newblogdata);
  };

  const moveDown = (index) => {
    if (index === blogdata.length - 1) return;
    const newblogdata = [...blogdata];
    [newblogdata[index], newblogdata[index + 1]] = [
      newblogdata[index + 1],
      newblogdata[index],
    ];
    setblogdata(newblogdata);
  };

  return (
    <div className="absolute top-0 right-0 hidden group-hover:flex items-center gap-2 text-xs">
      <button
        className="flex items-center justify-center h-6 w-6 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-150"
        onClick={(e) => {
          e.stopPropagation();
          moveUp(index);
        }}
      >
        <IoMdArrowRoundUp />
      </button>
      <button
        className="flex items-center justify-center h-6 w-6 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-150"
        onClick={(e) => {
          e.stopPropagation();
          moveDown(index);
        }}
      >
        <IoMdArrowRoundUp className="rotate-180" />
      </button>
      <button
        className="flex items-center justify-center h-6 w-6 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-150"
        onClick={(e) => {
          e.stopPropagation();
          if (item?.type == "image" && editmode.mode)
            setdeletedimages((pre) => [...pre, item?.content]);
          setblogdata((pre) => {
            let temp = [...pre];
            temp.splice(index, 1);
            return temp;
          });
        }}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};
