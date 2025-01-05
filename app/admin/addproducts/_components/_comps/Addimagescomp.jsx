import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiSolidImageAdd } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";

function Addimagescomp({ data, setstate, setdeletedimages }) {
  const { setmessagefn } = AppContextfn();
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes

  const handleAddImages = (files) => {
    if (files && files.length > 0) {
      const validImages = Array.from(files).filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          setmessagefn(`Image exceeds 1 MB of size`);
          return false;
        }
        return true;
      });

      if (validImages.length > 0) {
        setstate((pre) => ({
          ...pre,
          images: [...pre.images, ...validImages],
        }));
      }
    }
  };

  const handleDeleteImage = (imageIndex) => {
    const image = data.images[imageIndex];
    if (!(image instanceof File)) setdeletedimages((pre) => [...pre, image]);

    const images = data.images.filter((_, i) => i !== imageIndex);
    setstate((pre) => ({ ...pre, images: images }));
  };

  const handleMoveImage = (imageIndex, direction) => {
    const images = [...data.images];
    const newIndex = imageIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      [images[imageIndex], images[newIndex]] = [
        images[newIndex],
        images[imageIndex],
      ];
      setstate((pre) => ({ ...pre, images: images }));
    }
  };

  const handleReplaceImage = (imageIndex, file) => {
    if (file.size > MAX_FILE_SIZE) {
      setmessagefn(`Image exceeds 1 MB of size`);
      return;
    }

    const images = [...data.images];
    const replacedImage = data.images[imageIndex];
    if (!(replacedImage instanceof File))
      setdeletedimages((pre) => [...pre, replacedImage]);

    images[imageIndex] = file;
    setstate((pre) => ({ ...pre, images: images }));
  };

  return (
    <div className="mt-4 p-4 border rounded-md">
      <h2 className="py-5 font-bold text-center">Images</h2>
      <div className="mt-5 flex flex-wrap gap-5 justify-center">
        {data.images.map((image, imgIndex) => (
          <div key={imgIndex} className="flex gap-2 flex-col items-center mb-2">
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`Image ${imgIndex}`}
              className="w-32 aspect-square object-cover border"
            />
            <div className="flex gap-1 h-8">
              <button
                type="button"
                onClick={() => handleMoveImage(imgIndex, -1)}
                className="h-full aspect-square text-sm border rounded-md"
              >
                <BsArrowLeftShort className="inline-block" />
              </button>
              <button
                type="button"
                onClick={() => handleMoveImage(imgIndex, 1)}
                className="h-full aspect-square text-sm border rounded-md"
              >
                <BsArrowLeftShort className="inline-block rotate-180" />
              </button>
              {/* Replace Image Button */}
              <label className="h-full aspect-square text-blue-500 border rounded-md flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleReplaceImage(imgIndex, e.target.files[0]);
                    }
                    e.target.value = null; // Reset input
                  }}
                  className="hidden"
                />
                ↺
              </label>
              <button
                type="button"
                onClick={() => handleDeleteImage(imgIndex)}
                className="h-full aspect-square text-red-500 border rounded-md"
              >
                <AiFillDelete className="inline-block" />
              </button>
            </div>
          </div>
        ))}
        <div className="relative border border-dotted border-slate-300 cursor-pointer w-32 aspect-square rounded-md">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              handleAddImages(e.target.files);
              e.target.value = null;
            }}
            className="absolute inset-0 mt-2 opacity-0 z-10 cursor-pointer"
          />
          <div className="h-full w-full pointer-events-none flex flex-col gap-2 items-center justify-center">
            <BiSolidImageAdd className="text-5xl" />
            <p className="text-center text-sm">Add Image</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addimagescomp;
