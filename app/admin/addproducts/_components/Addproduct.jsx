"use client";
import React, { useState } from "react";
import { Addproduct } from "../Serveraction";
import { AppContextfn } from "@/app/Context";
import { uploadproductdata } from "@/app/Context";
import Selectcategory from "./_comps/Selectcategory";
import Details from "./_comps/Details";
import Descriptions from "./_comps/Descriptions";
import Colorpalets from "./_comps/Colorpalets";

function Addandupdateproduct() {
  const {
    addproduct,
    setaddproduct,
    updateproduct,
    setupdateproduct,
    deletedimages,
    setdeletedimages,
    setmessagefn,
  } = AppContextfn();

  const [uploadloading, setuploadloading] = useState(false);

  const resetfields = () => {
    setaddproduct(uploadproductdata);
  };

  const uploadproductfn = async () => {
    if (uploadloading) {
      return;
    }
    setuploadloading(true);

    const formData = new FormData();
    addproduct.colorpalets.forEach((item, i) => {
      item.images.forEach((image, j) => {
        if (image instanceof File) {
          const imagename = "image" + i + j;
          formData.append(imagename, image);
          item.images[j] = imagename;
        }
      });
    });

    const res = await Addproduct(addproduct, formData, deletedimages);

    if (res?.status == 200) {
      resetfields();
      setupdateproduct(false);
    }
    setmessagefn(res?.message);
    setuploadloading(false);
  };

  return (
    <>
      <Selectcategory />
      <Details />
      <Descriptions />
      <Colorpalets />

      {/* add or update product button */}
      <div className="flex items-center justify-center gap-[20px] my-[50px]">
        <button
          className="relative flex items-center justify-center gap-[10px] h-[30px] min-w-[160px] bg-green-600 text-white rounded-[10px] "
          onClick={uploadproductfn}
        >
          {uploadloading && <Loadingcomp />}
          {updateproduct ? " Update Product" : "Add Product"}
        </button>
        {updateproduct && (
          <button
            className="h-[30px] min-w-[160px] border border-slate-300 rounded-[10px] "
            onClick={() => {
              resetfields();
              setdeletedimages([]);
              setupdateproduct(false);
              setuploadloading(false);
            }}
          >
            Cancle Update
          </button>
        )}
      </div>
    </>
  );
}

function Loadingcomp() {
  return (
    <div className="uploadloader h-[20px] aspect-square rounded-full border-t-2 border-b-2 border-solid border-white"></div>
  );
}

export default Addandupdateproduct;
