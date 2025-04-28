import Nextimage from "@/app/_components/Nextimage";

function Trusties() {
  const images = [
    "/eventplanners/companies/IBM.png",
    "/eventplanners/companies/airtel.png",
    "/eventplanners/companies/HSBC.png",
    "/eventplanners/companies/Wynk_music_logo.png",
    "/eventplanners/companies/pizza-hut-.png",
    "/eventplanners/companies/Reebok-logo.png",
    "/eventplanners/companies/The_Lalit-01.png",
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-between items-center list-none py-7 px-5 lg:px-20 z-10">
      {images.map((item, i) => (
        <div className="overflow-hidden" key={i}>
          <Nextimage
            src={item}
            alt={item}
            height={80}
            width={140}
            quality={100}
            className={`h-5 lg:h-12 object-contain contrast-200 brightness-0 invert translate-y-20`}
            style={{
              animation: `moveupanimation 1s ${i * 0.2 + 1.4}s forwards`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Trusties;
