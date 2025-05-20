import React from "react";

function Howtouse({ url }) {
  return (
    <section className="px-4 py-10 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-tenor text-4xl md:text-4xl text-center">
          How to Use This Product
        </h2>

        {/* Responsive Video Embed */}
        <div className="w-full overflow-hidden rounded-xl shadow-md">
          <div className="relative pb-[56.25%] h-0 mt-5">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={url}
              title="How to Use Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <p className="mt-5">
          Watch this quick video guide to learn how to set up, use, and get the
          most out of your product.
        </p>
      </div>
    </section>
  );
}

export default Howtouse;
