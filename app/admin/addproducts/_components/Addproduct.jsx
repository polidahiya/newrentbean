"use client";
import React, { useState } from "react";
import { Addproduct } from "../Serveraction";
import { AppContextfn } from "@/app/Context";
import Selectcategory from "./_comps/Selectcategory";
import Multiplevaluesfield from "./_comps/Multiplevaluesfield";
import Standardinputfield from "./_comps/Standardinputfield";
import Togglebuttons from "./_comps/Togglebuttons";
import Addimagescomp from "./_comps/Addimagescomp";
import Dropdownmenu from "./_comps/Dropdownmenu";
import Rentpricecomp from "./_comps/Rentpricecomp";

function Addandupdateproduct({
  data,
  setdata,
  initialState,
  resetState,
  deletedimages,
  setdeletedimages,
}) {
  const { setmessagefn } = AppContextfn();
  const [loading, setloading] = useState(false);

  // const uploadproductfn = async () => {
  //   if (uploadloading) {
  //     return;
  //   }
  //   setuploadloading(true);

  //   const formData = new FormData();
  //   addproduct.colorpalets.forEach((item, i) => {
  //     item.images.forEach((image, j) => {
  //       if (image instanceof File) {
  //         const imagename = "image" + i + j;
  //         formData.append(imagename, image);
  //         item.images[j] = imagename;
  //       }
  //     });
  //   });

  //   const res = await Addproduct(addproduct, formData, deletedimages);

  //   if (res?.status == 200) {
  //     resetfields();
  //     setupdateproduct(false);
  //   }
  //   setmessagefn(res?.message);
  //   setuploadloading(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData();

    // images
    data?.variants?.forEach((variant, i) => {
      variant.images.forEach((image, j) => {
        if (image instanceof File) {
          const imagename = "image" + i + j;
          formData.append(imagename, image);
          data.variants[i].images[j] = imagename;
        }
      });
    });

    try {
      const res = await Addproduct(data, formData, deletedimages);
      setmessagefn(res?.message);
      resetState();
      setloading(false);
      setdeletedimages([]);
    } catch (error) {
      resetState();
      setloading(false);
      setmessagefn("Error!");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white space-y-6 ">
      <p className="text-center font-bold font-serif text-2xl my-5">
        Add Product
      </p>
      <Selectcategory data={data} setdata={setdata} />

      {/* available for */}
      <Dropdownmenu
        title={"Available for"}
        state={data.availablefor}
        onchange={(value) =>
          setdata((pre) => ({ ...pre, availablefor: value }))
        }
        options={["Rent", "Buy", "Both"]}
      />

      {/* Product Name */}
      <Standardinputfield
        titlename="Product Name"
        value={data.name}
        onchange={(e) => setdata((pre) => ({ ...pre, name: e.target.value }))}
        clear={() => setdata((pre) => ({ ...pre, name: "" }))}
      />

      {/* sku id */}
      <Standardinputfield
        titlename="SKU ID"
        value={data.sku}
        onchange={(e) => setdata((pre) => ({ ...pre, sku: e.target.value }))}
        clear={() => setdata((pre) => ({ ...pre, sku: "" }))}
      />

      {/* max quantity */}
      <Standardinputfield
        titlename="Max Quantity"
        type="number"
        isRequired={true}
        value={data.maxquantity}
        onchange={(e) =>
          setdata((pre) => ({ ...pre, maxquantity: e.target.value }))
        }
        clear={() => setdata((pre) => ({ ...pre, maxquantity: "" }))}
      />
      {/* security deposit*/}
      <Standardinputfield
        titlename="Security deposit"
        type="number"
        isRequired={true}
        value={data.securitydeposit}
        onchange={(e) =>
          setdata((pre) => ({ ...pre, securitydeposit: e.target.value }))
        }
        clear={() => setdata((pre) => ({ ...pre, securitydeposit: "" }))}
      />
      <Addimagescomp
        data={data}
        setstate={setdata}
        setdeletedimages={setdeletedimages}
      />
      {/* rent price */}
      {(data?.availablefor == "Rent" || data?.availablefor == "Both") && (
        <Rentpricecomp data={data} setdata={setdata} />
      )}

      {/* buy price */}
      {(data?.availablefor == "Buy" || data?.availablefor == "Both") && (
        <Standardinputfield
          titlename="Buy Price"
          type="number"
          isRequired={true}
          value={data.buyprice}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, buyprice: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, buyprice: "" }))}
        />
      )}

      {/* description */}
      <Multiplevaluesfield
        state={data.desc}
        statename="desc"
        setState={setdata}
        placeholder={""}
        title={"Descriptions"}
      />

      {/* seotitle */}
      <Standardinputfield
        titlename="SeoTitle"
        isRequired={true}
        value={data.seotitle}
        onchange={(e) =>
          setdata((pre) => ({ ...pre, seotitle: e.target.value }))
        }
        clear={() => setdata((pre) => ({ ...pre, seotitle: "" }))}
      />

      {/* seodescription */}
      <Standardinputfield
        titlename="SeoDescription"
        isRequired={true}
        value={data.seodescription}
        onchange={(e) =>
          setdata((pre) => ({ ...pre, seodescription: e.target.value }))
        }
        clear={() => setdata((pre) => ({ ...pre, seodescription: "" }))}
      />

      {/* seokeywords */}
      <Standardinputfield
        titlename="SeoKeywords"
        isRequired={true}
        value={data.seokeywords}
        onchange={(e) =>
          setdata((pre) => ({ ...pre, seokeywords: e.target.value }))
        }
        clear={() => setdata((pre) => ({ ...pre, seokeywords: "" }))}
      />

      {/* available */}
      <Togglebuttons
        titlename="Available?"
        value={data.available}
        positive={() => setdata((prev) => ({ ...prev, available: true }))}
        negative={() => setdata((prev) => ({ ...prev, available: false }))}
        positiveText="Yes"
        negativeText="No"
      />

      {/* trash */}
      <Togglebuttons
        titlename="Move to trash?"
        value={data.trash}
        positive={() => setdata((prev) => ({ ...prev, trash: true }))}
        negative={() => setdata((prev) => ({ ...prev, trash: false }))}
        positiveText="Yes"
        negativeText="No"
      />

      {/* add or update product button */}
      <div className="flex items-center justify-center gap-5">
        <button
          type="submit"
          className="flex items-center justify-center gap-2  px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading && (
            <span
              className={`block h-5 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin`}
            ></span>
          )}
          {data._id ? "Update Product" : "Add Product"}
        </button>
        {data._id && (
          <button
            className="flex items-center justify-center gap-2  px-4 py-2  border  rounded-md"
            type="button"
            onClick={() => {
              resetState();
              setdeletedimages([]);
            }}
          >
            Cancle Update
          </button>
        )}
      </div>
    </form>
  );
}

function Loadingcomp() {
  return (
    <div className="uploadloader h-[20px] aspect-square rounded-full border-t-2 border-b-2 border-solid border-white"></div>
  );
}

export default Addandupdateproduct;
