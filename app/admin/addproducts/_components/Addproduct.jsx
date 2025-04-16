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
import ALongwithbox from "./_comps/ALongwithbox";
import Multiselecttags from "./_comps/Multiselecttags";

function Addandupdateproduct({
  data,
  setdata,
  initialState,
  resetState,
  deletedimages,
  setdeletedimages,
  setshoweditform,
}) {
  const { setmessagefn } = AppContextfn();
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData();

    // Process images
    data.images.forEach((image, i) => {
      if (image instanceof File) {
        const imagename = "image-" + i;
        formData.append(imagename, image);
        data.images[i] = imagename;
      }
    });

    try {
      const res = await Addproduct(data, formData, deletedimages);
      setmessagefn(res?.message);
      resetState();
      setloading(false);
      setdeletedimages([]);
      setshoweditform(false);
    } catch (error) {
      resetState();
      setloading(false);
      setmessagefn("Error!");
      console.error("Error:", error);
    }
  };

  const handleClearField = (field) =>
    setdata((prev) => ({
      ...prev,
      [field]: "",
    }));

  const handleChange = (field, value) =>
    setdata((prev) => ({
      ...prev,
      [field]: value,
    }));

  const handleDropdownChange = (value) =>
    setdata((prev) => ({ ...prev, availablefor: value }));

  const handleToggle = (field, value) =>
    setdata((prev) => ({
      ...prev,
      [field]: value,
    }));

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 pb-20 md:p-6 bg-white space-y-6"
    >
      <p className="text-center font-bold font-serif text-2xl my-5">
        Add Product
      </p>

      <Selectcategory data={data} setdata={setdata} />

      {/* Available for */}
      <Dropdownmenu
        title="Available for"
        state={data.availablefor}
        onchange={handleDropdownChange}
        options={["Rent", "Buy", "Both"]}
      />
      <Multiselecttags
        state={data?.tags || []}
        statename="tags"
        setState={setdata}
        title={"Tags"}
        options={[
          "New-Product",
          "Brand-New",
          "Refurbished",
          "Best-Seller",
          "High-Demand",
          "Last-Stock",
          "Only-One-Left",
          "On-Sale",
        ]}
      />

      {/* Product Name */}
      <Standardinputfield
        titlename="Product Name"
        value={data.name}
        onchange={(e) => handleChange("name", e.target.value)}
        clear={() => handleClearField("name")}
      />

      {/* SKU ID */}
      <Standardinputfield
        titlename="SKU ID"
        value={data.sku}
        onchange={(e) => handleChange("sku", e.target.value)}
        clear={() => handleClearField("sku")}
      />

      {/* Max Quantity */}
      <Standardinputfield
        titlename="Max Quantity"
        type="number"
        isRequired
        value={data.maxquantity}
        onchange={(e) => handleChange("maxquantity", e.target.value)}
        clear={() => handleClearField("maxquantity")}
      />

      {/* Security Deposit */}
      {(data.availablefor === "Rent" || data.availablefor === "Both") && (
        <Standardinputfield
          titlename="Security Deposit"
          type="number"
          isRequired
          value={data.securitydeposit}
          onchange={(e) => handleChange("securitydeposit", e.target.value)}
          clear={() => handleClearField("securitydeposit")}
        />
      )}

      <Addimagescomp
        data={data}
        setstate={setdata}
        setdeletedimages={setdeletedimages}
      />

      {/* Rent Price */}
      {(data.availablefor === "Rent" || data.availablefor === "Both") && (
        <Rentpricecomp data={data} setdata={setdata} />
      )}

      {/* Buy Price */}
      {(data.availablefor === "Buy" || data.availablefor === "Both") && (
        <Standardinputfield
          titlename="Buy Price"
          type="number"
          isRequired
          value={data.buyprice}
          onchange={(e) => handleChange("buyprice", e.target.value)}
          clear={() => handleClearField("buyprice")}
        />
      )}

      {/* Description */}
      <Multiplevaluesfield
        state={data.desc}
        statename="desc"
        setState={setdata}
        placeholder=""
        title="Descriptions"
      />
      <ALongwithbox
        state={data?.alongwith || []}
        statename="alongwith"
        setState={setdata}
      />

      {/* SEO Fields */}
      {(data.availablefor === "Rent" || data.availablefor === "Both") && (
        <>
          <p className="font-semibold text-xl">Rent Seo</p>
          <Standardinputfield
            titlename="SeoTitle"
            isRequired
            value={data.seotitle}
            onchange={(e) => handleChange("seotitle", e.target.value)}
            clear={() => handleClearField("seotitle")}
          />
          <Standardinputfield
            titlename="SeoDescription"
            isRequired
            value={data.seodescription}
            onchange={(e) => handleChange("seodescription", e.target.value)}
            clear={() => handleClearField("seodescription")}
          />
          <Standardinputfield
            titlename="SeoKeywords (Seperate keywords with ,)"
            isRequired
            value={data.seokeywords}
            onchange={(e) => handleChange("seokeywords", e.target.value)}
            clear={() => handleClearField("seokeywords")}
          />
        </>
      )}
      {(data.availablefor === "Buy" || data.availablefor === "Both") && (
        <>
          <p className="font-semibold text-xl">Buy Seo</p>
          <Standardinputfield
            titlename="Buy seo title"
            isRequired
            value={data.buyseotitle || ""}
            onchange={(e) => handleChange("buyseotitle", e.target.value)}
            clear={() => handleClearField("buyseotitle")}
          />
          <Standardinputfield
            titlename="Buy seo description"
            isRequired
            value={data.buyseodescription || ""}
            onchange={(e) => handleChange("buyseodescription", e.target.value)}
            clear={() => handleClearField("buyseodescription")}
          />
          <Standardinputfield
            titlename="Buy seo keywords (Seperate keywords with ,)"
            isRequired
            value={data.buyseokeywords || "Rentbean, Furlenco, Justdial, olx,"}
            onchange={(e) => handleChange("buyseokeywords", e.target.value)}
            clear={() => handleClearField("buyseokeywords")}
          />
        </>
      )}

      {/* Availability */}
      <Togglebuttons
        titlename="Available?"
        value={data.available}
        positive={() => handleToggle("available", true)}
        negative={() => handleToggle("available", false)}
        positiveText="Yes"
        negativeText="No"
      />

      {/* Trash */}
      <Togglebuttons
        titlename="Move to Trash?"
        value={data.trash}
        positive={() => handleToggle("trash", true)}
        negative={() => handleToggle("trash", false)}
        positiveText="Yes"
        negativeText="No"
      />

      {/* Buttons */}
      <div className="flex items-center justify-center gap-5">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          aria-label="Submit"
          title="Submit"
        >
          {loading && (
            <span className="block h-5 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin"></span>
          )}
          {data._id ? "Update Product" : "Add Product"}
        </button>
        {data._id && (
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md"
            type="button"
            onClick={() => {
              resetState();
              setdeletedimages([]);
              setshoweditform(false);
            }}
            aria-label="Cancel"
            title="Cancel"
          >
            Cancel Update
          </button>
        )}
      </div>
    </form>
  );
}

export default Addandupdateproduct;
