import React from "react";
import Contactform from "./Contactform";

function Page() {
  return (
    <div>
      <style>
        {`
          .bg-switch {
            background-image: url('https://images.unsplash.com/photo-1469371670807-013ccf25f16a?fm=jpg&q=60&w=3000');
          }

          @media (min-width: 1024px) {
            .bg-switch {
              background-image: url('https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-1002140-2747449.jpg&fm=jpg');
            }
          }
        `}
      </style>

      <div
        className="relative min-h-screen flex items-center justify-center bg-switch"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="mx-auto w-full max-w-2xl">
          <Contactform />
        </div>
      </div>
    </div>
  );
}

export default Page;
