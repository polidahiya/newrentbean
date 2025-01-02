import React from "react";
import { AppContextfn } from "@/app/Context";
import { uploadproductdata } from "@/app/Context";

function Colorpalets() {
  const { addproduct, setaddproduct, updateproduct, setdeletedimages } =
    AppContextfn();
  const fixedcolors = [
    { name: "White", color: "#ffffff" },
    { name: "Black", color: "#000000" },
    { name: "Natural", color: "#a57c4f" },
    { name: "Honey Oak", color: "#b3480a" },
    { name: "Walnut", color: "#3f231f" },
    { name: "Light walnut", color: "#62322e" },
    { name: "Dark walnut", color: "#392b25" },
    { name: "Teak", color: "#a87139" },
    { name: "Mahogany", color: "#C04000" },
  ];

  const setinputcolor = (colorindex, color) => {
    const updatedColorPalets = addproduct.colorpalets.map((palette, i) =>
      i === colorindex ? { ...palette, color: color } : palette
    );
    setaddproduct({
      ...addproduct,
      colorpalets: updatedColorPalets,
    });
  };

  const setinputcolorname = (colorindex, name) => {
    const updatedColorPalets = addproduct.colorpalets.map((palette, i) =>
      i === colorindex ? { ...palette, name: name } : palette
    );
    setaddproduct({
      ...addproduct,
      colorpalets: updatedColorPalets,
    });
  };

  const setfixedcolors = (colorindex, color, name) => {
    const updatedColorPalets = addproduct.colorpalets.map((palette, i) =>
      i === colorindex ? { ...palette, color: color, name: name } : palette
    );
    setaddproduct({
      ...addproduct,
      colorpalets: updatedColorPalets,
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Color Palettes</h2>
      <div className="flex flex-wrap gap-4 p-4">
        {addproduct.colorpalets.map((color, colorindex) => (
          <div
            key={colorindex}
            className="relative flex flex-col gap-4 items-center border border-slate-300 rounded-lg p-4 shadow-md max-w-full"
          >
            {/* Delete color palette button */}
            <button
              className="absolute top-2  right-2 bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center"
              onClick={() => {
                // Store deleted images
                if (updateproduct) {
                  color.images.forEach((image) => {
                    if (!(image instanceof File)) {
                      setdeletedimages((prev) => [...prev, image]);
                    }
                  });
                }

                // Remove color palette
                const newColorPalets = addproduct.colorpalets.filter(
                  (_, i) => i !== colorindex
                );
                setaddproduct({ ...addproduct, colorpalets: newColorPalets });
              }}
            >
              &times;
            </button>
            {/* Color code Display */}
            <div
              className="relative w-14 aspect-square border border-slate-300 rounded-full "
              style={{ backgroundColor: color.color }}
            >
              <input
                type="color"
                value={addproduct?.colorpalets[colorindex]?.color}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  setinputcolor(colorindex, e.target.value);
                }}
              />
            </div>
            {/* fixed color selection */}
            <div className="w-full max-w-full flex gap-5 overflow-x-scroll text-sm">
              {fixedcolors.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setfixedcolors(colorindex, item?.color, item?.name);
                  }}
                >
                  <div
                    style={{ backgroundColor: item?.color }}
                    className="w-10 mx-auto aspect-square rounded-full border border-slate-300"
                  ></div>
                  <p className="text-center whitespace-nowrap">{item?.name}</p>
                </div>
              ))}
            </div>

            {/* Color Name */}
            <div>
              <label className="block mb-1">Color Name:</label>
              <input
                type="text"
                className="border border-slate-300 rounded p-2"
                value={color.name}
                onChange={(e) => {
                  setinputcolorname(colorindex, e.target.value);
                }}
              />
            </div>
            {/* Images Section */}
            <div className="w-full">
              <h3 className="text-xl font-semibold text-center mb-2">Images</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {color.images.map((image, imageindex) => (
                  <div key={imageindex} className="relative ">
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      className="border border-slate-300 aspect-[4/3] w-32 rounded overflow-hidden object-cover"
                      alt={`Color image ${imageindex + 1}`}
                    />
                    {/* move button */}
                    <div className="flex justify-center gap-5 my-2">
                      <button
                        className="h-10 aspect-square bg-cyan-500 text-white rounded-full"
                        onClick={() => {
                          if (imageindex === 0) return; // Don't move if it's the first image
                          const newImages = [...color.images];
                          // Swap the current image with the previous one
                          [newImages[imageindex - 1], newImages[imageindex]] = [
                            newImages[imageindex],
                            newImages[imageindex - 1],
                          ];
                          // Update the state with the new images array
                          const updatedColorPalets = addproduct.colorpalets.map(
                            (palette, i) =>
                              i === colorindex
                                ? { ...palette, images: newImages }
                                : palette
                          );
                          setaddproduct({
                            ...addproduct,
                            colorpalets: updatedColorPalets,
                          });
                        }}
                      >
                        -
                      </button>
                      <button
                        className="h-10 aspect-square bg-cyan-500 text-white rounded-full"
                        onClick={() => {
                          if (imageindex === color.images.length - 1) return; // Don't move if it's the last image
                          const newImages = [...color.images];
                          // Swap the current image with the next one
                          [newImages[imageindex + 1], newImages[imageindex]] = [
                            newImages[imageindex],
                            newImages[imageindex + 1],
                          ];
                          // Update the state with the new images array
                          const updatedColorPalets = addproduct.colorpalets.map(
                            (palette, i) =>
                              i === colorindex
                                ? { ...palette, images: newImages }
                                : palette
                          );
                          setaddproduct({
                            ...addproduct,
                            colorpalets: updatedColorPalets,
                          });
                        }}
                      >
                        +
                      </button>
                    </div>
                    {/* Delete image button */}
                    <button
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full  w-6 aspect-square flex items-center justify-center"
                      onClick={() => {
                        if (
                          updateproduct &&
                          !(color.images[imageindex] instanceof File)
                        ) {
                          setdeletedimages((prev) => [
                            ...prev,
                            color.images[imageindex],
                          ]);
                        }

                        const newImages = color.images.filter(
                          (_, i) => i !== imageindex
                        );
                        const updatedColorPalets = addproduct.colorpalets.map(
                          (palette, i) =>
                            i === colorindex
                              ? { ...palette, images: newImages }
                              : palette
                        );
                        setaddproduct({
                          ...addproduct,
                          colorpalets: updatedColorPalets,
                        });
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              {/* Add Image Button */}
              <div className="flex justify-center mt-2">
                <button className="relative h-8 w-24 bg-green-600 text-white rounded-lg">
                  <input
                    className="absolute inset-0 h-full w-full z-10 opacity-0 cursor-pointer"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const updatedColorPalets = addproduct.colorpalets.map(
                          (palette, i) =>
                            i === colorindex
                              ? { ...palette, images: [...color.images, file] }
                              : palette
                        );
                        setaddproduct({
                          ...addproduct,
                          colorpalets: updatedColorPalets,
                        });
                      }
                      e.target.value = null;
                    }}
                  />
                  Add Image
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add Color Palette Button */}
      <div className="flex justify-center mt-4">
        <button
          className="h-8 w-32 bg-green-600 text-white rounded-lg"
          onClick={() => {
            setaddproduct((prev) => ({
              ...prev,
              colorpalets: [
                ...prev.colorpalets,
                uploadproductdata?.colorpalets[0],
              ],
            }));
          }}
        >
          + Add Palette
        </button>
      </div>
    </div>
  );
}

export default Colorpalets;
