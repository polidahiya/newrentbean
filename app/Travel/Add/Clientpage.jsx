"use client";
import React, { useRef, useState, useEffect } from "react";
import Editor from "./Editor";
//
import { LuCloudUpload } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";
import { Addimages, Deleteimages } from "@/app/_serveractions/Addordeleteimage";
import { Addtravelpackage } from "../Serveraction";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import Standardinputfield from "@/app/admin/addproducts/_components/_comps/Standardinputfield";
import Multiplevaluesfield from "@/app/admin/addproducts/_components/_comps/Multiplevaluesfield";
import Multiselecttags from "@/app/admin/addproducts/_components/_comps/Multiselecttags";
import { vehicles, locations } from "../Traveldata";

export default function Clientpage({ editdata }) {
  const router = useRouter();
  const initialdatastate = {
    title: "",
    images: [""],
    duration: "",
    price: "",
    vehicle: [],
    locations: [],
    timeline: [
      {
        title: "",
        desc: "",
      },
      {
        title: "",
        desc: "",
      },
    ],
    included: [""],
    excluded: [""],
    hotel: [
      {
        type: "",
        hotels: "",
        price: "",
      },
    ],
  };
  const { setmessagefn } = AppContextfn();
  const datawithoutdelta = { ...editdata };
  delete datawithoutdelta.delta;
  const [data, setdata] = useState(
    editdata ? { ...initialdatastate, ...datawithoutdelta } : initialdatastate
  );
  const [imageloading, setimageloading] = useState(false);
  const [newadded, setnewadded] = useState([]);
  const [deletedimages, setdeletedimages] = useState([]);
  const [Delta, setDelta] = useState(null);

  const quillRef = useRef(null);

  // Load Delta only on client
  useEffect(() => {
    import("quill").then((Quill) => {
      setDelta(() => Quill.default.import("delta"));
    });
  }, []);

  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const handleaddimage = async (file) => {
    try {
      setimageloading(true);
      if (!file) {
        setmessagefn(`Please select an image`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setmessagefn(`Image exceeds 1 MB of size`);
        return;
      }
      const formdata = new FormData();
      formdata.append("image", file);
      const res = await Addimages(formdata, "Rentbean/Travel");
      if (res.status == 200) {
        const imageurl = res?.imageurl;
        if (data.images[0].length > 0) {
          setdeletedimages((pre) => [...pre, data.images[0]]);
        }
        setdata((pre) => {
          const updateddata = { ...pre };
          updateddata.images[0] = imageurl;
          return updateddata;
        });
        setnewadded((pre) => [...pre, imageurl]);
      } else {
        setmessagefn(`Unable to update image`);
      }
      setimageloading(false);
    } catch (error) {
      console.log(error);
      setmessagefn(`Unable to update image`);
      setimageloading(false);
    }
  };

  const submitform = async (e) => {
    e.preventDefault();
    const delta = quillRef.current.getContents();
    const deltaJSON = delta.ops;
    data.delta = deltaJSON;
    const res = await Addtravelpackage(data, deletedimages);
    setmessagefn(res?.message);
    if (res?.status === 200) {
      setdata(initialdatastate);
      quillRef.current.setContents({
        ops: [
          { insert: "Hello\n", attributes: { header: 1 } },
          { insert: "Start writing your blog here...\n" },
        ],
      });
      setnewadded([]);
      setdeletedimages([]);
    }
  };

  const handlecancel = async () => {
    if (newadded.length > 0) {
      setmessagefn("Cleaning up...");
      await Deleteimages(newadded, "Rentbean/Travel");
    }
    router.back();
  };

  if (!Delta) return <div className="p-8 text-gray-500">Loading editor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <form
        onSubmit={submitform}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <button
              className="border px-5 py-1 rounded-md"
              onClick={handlecancel}
            >
              Back
            </button>
          </div>
          <h1 className="flex-1 text-3xl font-tenor text-center whitespace-nowrap">
            ✏️ Add
          </h1>
          <div className="flex-1"></div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-center">
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-36 aspect-square border border-dashed border-theme cursor-pointer rounded-lg overflow-hidden"
            >
              {data.images[0].length > 0 ? (
                <div className="relative w-full h-full group hover:bg-black">
                  <img
                    src={data.images[0]}
                    alt=""
                    className="w-full h-full lg:group-hover:opacity-30"
                  />
                  <MdModeEditOutline className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme text-white text-2xl box-content p-2 lg:hidden lg:group-hover:block" />
                </div>
              ) : (
                <>
                  <LuCloudUpload className="text-3xl" />
                  <p className="text-center">
                    {imageloading ? "Uploading..." : "Upload Thumbnail"}
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                disabled={imageloading}
                onChange={(e) => {
                  handleaddimage(e.target.files[0]);
                  e.target.value = null;
                }}
                className="hidden"
              />
            </label>
          </div>
          <Standardinputfield
            titlename="Blog Title"
            value={data.title}
            isRequired={true}
            type="text"
            onchange={(e) => {
              setdata((pre) => ({ ...pre, title: e.target.value }));
            }}
            clear={() => setdata((pre) => ({ ...pre, title: "" }))}
            placeholder=""
          />
          <Standardinputfield
            titlename="Duration"
            value={data.duration}
            isRequired={true}
            type="number"
            onchange={(e) => {
              setdata((pre) => ({ ...pre, duration: e.target.value }));
            }}
            clear={() => setdata((pre) => ({ ...pre, duration: "" }))}
            placeholder="In days"
          />
          <Standardinputfield
            titlename="Price"
            value={data.price}
            isRequired={true}
            type="number"
            onchange={(e) => {
              setdata((pre) => ({ ...pre, price: e.target.value }));
            }}
            clear={() => setdata((pre) => ({ ...pre, price: "" }))}
            placeholder=""
          />
          {/* location */}
          <Multiselecttags
            state={data.locations}
            statename="locations"
            setState={setdata}
            title={"Locations"}
            options={locations}
          />
          {/* vehicle */}
          <Multiselecttags
            state={data.vehicle}
            statename="vehicle"
            setState={setdata}
            title={"Vehicle Type"}
            options={vehicles}
          />
          {/* timeline */}
          <div className="border rounded-2xl">
            <h2 className="p-3 text-2xl font-semibold text-center">Timeline</h2>
            <div className="p-3 space-y-3">
              {data.timeline.map((item, i) => (
                <div
                  key={i}
                  className="relative border rounded-2xl p-3 space-y-2"
                >
                  <p>Day {i + 1}</p>
                  <Standardinputfield
                    titlename="Title"
                    value={item.title}
                    isRequired={true}
                    type="text"
                    onchange={(e) => {
                      const updateddata = [...data.timeline];
                      updateddata[i].title = e.target.value;
                      setdata((pre) => ({ ...pre, timeline: updateddata }));
                    }}
                    clear={() => {
                      const updateddata = [...data.timeline];
                      updateddata[i].title = "";
                      setdata((pre) => ({ ...pre, timeline: updateddata }));
                    }}
                    placeholder=""
                  />
                  <Standardinputfield
                    titlename="Description"
                    value={item.desc}
                    isRequired={true}
                    type="text"
                    onchange={(e) => {
                      const updateddata = [...data.timeline];
                      updateddata[i].desc = e.target.value;
                      setdata((pre) => ({ ...pre, timeline: updateddata }));
                    }}
                    clear={() => {
                      const updateddata = [...data.timeline];
                      updateddata[i].desc = "";
                      setdata((pre) => ({ ...pre, timeline: updateddata }));
                    }}
                    placeholder=""
                  />
                  <button
                    className="absolute top-0 right-2 w-10 aspect-square rounded-full bg-red-400 text-white"
                    type="button"
                    onClick={() => {
                      const updateddata = [...data.timeline];
                      updateddata.splice(i, 1);
                      setdata((pre) => ({ ...pre, timeline: updateddata }));
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                className="px-5 py-2 w-fit mt-5 rounded-md bg-green-600 text-white"
                type="button"
                onClick={() => {
                  const updateddata = [...data.timeline];
                  updateddata.push({ title: "", desc: "" });
                  setdata((pre) => ({ ...pre, timeline: updateddata }));
                }}
              >
                Add Day
              </button>
            </div>
          </div>
          <Multiplevaluesfield
            state={data.included}
            statename="included"
            setState={setdata}
            placeholder=""
            title="Includes"
          />
          <Multiplevaluesfield
            state={data.excluded}
            statename="excluded"
            setState={setdata}
            placeholder=""
            title="Excludes"
          />
          {/* Hotels */}
          <div className="border rounded-2xl">
            <h2 className="p-3 text-2xl font-semibold text-center">Hotels</h2>
            <div className="p-3 space-y-3">
              {data.hotel.map((item, i) => (
                <div
                  key={i}
                  className="relative border rounded-2xl p-3 space-y-2"
                >
                  <p>Hotel {i + 1}</p>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <Standardinputfield
                      titlename="Hotel Type"
                      value={item.type}
                      isRequired={true}
                      type="text"
                      onchange={(e) => {
                        const updateddata = [...data.hotel];
                        updateddata[i].type = e.target.value;
                        setdata((pre) => ({ ...pre, hotel: updateddata }));
                      }}
                      clear={() => {
                        const updateddata = [...data.hotel];
                        updateddata[i].type = "";
                        setdata((pre) => ({ ...pre, hotel: updateddata }));
                      }}
                      placeholder=""
                    />
                    <Standardinputfield
                      titlename="Hotels"
                      value={item.hotels}
                      isRequired={true}
                      type="text"
                      onchange={(e) => {
                        const updateddata = [...data.hotel];
                        updateddata[i].hotels = e.target.value;
                        setdata((pre) => ({ ...pre, hotel: updateddata }));
                      }}
                      clear={() => {
                        const updateddata = [...data.hotel];
                        updateddata[i].hotels = "";
                        setdata((pre) => ({ ...pre, hotel: updateddata }));
                      }}
                      placeholder=""
                    />
                    <Standardinputfield
                      titlename="Price"
                      value={item.price}
                      isRequired={true}
                      type="number"
                      onchange={(e) => {
                        const updateddata = [...data.hotel];
                        updateddata[i].price = e.target.value;
                        setdata((pre) => ({ ...pre, hotel: updateddata }));
                      }}
                      clear={() => {
                        const updateddata = [...data.hotel];
                        updateddata[i].price = "";
                        setdata((pre) => ({ ...pre, hotel: updateddata }));
                      }}
                      placeholder=""
                    />
                  </div>
                  <button
                    className="absolute top-0 right-2 w-10 aspect-square rounded-full bg-red-400 text-white"
                    type="button"
                    onClick={() => {
                      const updateddata = [...data.hotel];
                      updateddata.splice(i, 1);
                      setdata((pre) => ({ ...pre, hotel: updateddata }));
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
              <button
                className="px-5 py-2 w-fit mt-5 rounded-md bg-green-600 text-white"
                type="button"
                onClick={() => {
                  const updateddata = [...data.hotel];
                  updateddata.push({
                    type: "",
                    hotels: "",
                    price: "",
                  });
                  setdata((pre) => ({ ...pre, hotel: updateddata }));
                }}
              >
                Add Hotel
              </button>
            </div>
          </div>
        </div>
        <Editor
          ref={quillRef}
          defaultValue={
            editdata
              ? { ops: editdata?.delta || {} }
              : new Delta()
                  .insert("Hello")
                  .insert("\n", { header: 1 })
                  .insert("Some ")
                  .insert("initial", { bold: true })
                  .insert(" ")
                  .insert("content", { underline: true })
                  .insert("\n")
          }
        />
        {/* submit button */}
        <div className="sticky bottom-0 flex justify-center gap-5 mt-3">
          <button
            type="submit"
            className=" px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
          >
            {editdata ? "Update Now" : "Post Now"}
          </button>
          {/* cancel button */}
          {editdata && (
            <button
              type="button"
              className=" px-10 py-3 w-fit mt-auto border border-theme text-theme bg-white"
              onClick={handlecancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
