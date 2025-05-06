import React from "react";
import Link from "next/link";

function Ads1() {
  const ads = [
    {
      img: "https://sdmntprwestus.oaiusercontent.com/files/00000000-c7e0-6230-913d-6b1332c1e6ce/raw?se=2025-05-05T17%3A20%3A21Z&sp=r&sv=2024-08-04&sr=b&scid=fc27f94a-5b26-59dd-824f-726edd92b6ea&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-05T10%3A12%3A25Z&ske=2025-05-06T10%3A12%3A25Z&sks=b&skv=2024-08-04&sig=OMeLz8qLD5a/nHiAbJOA7l7lgWfqrUbC5Fc/tV2L4xU%3D",
      link: "/",
    },
    {
      img: "https://sdmntprwestus.oaiusercontent.com/files/00000000-6238-6230-977e-1de315f7f045/raw?se=2025-05-05T17%3A20%3A34Z&sp=r&sv=2024-08-04&sr=b&scid=82907901-0cfd-5640-a130-4bd09e090eab&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-05T14%3A57%3A38Z&ske=2025-05-06T14%3A57%3A38Z&sks=b&skv=2024-08-04&sig=X8rzTxdCxazj7BznuHJLVtz5g6zgTZuaIObS425uymM%3D",
      link: "/",
    },
    {
      img: "https://sdmntprwestus.oaiusercontent.com/files/00000000-f288-6230-8aba-0713e38e229a/raw?se=2025-05-05T17%3A20%3A34Z&sp=r&sv=2024-08-04&sr=b&scid=8fe6e029-d780-5849-879f-f6f2b67c1bf3&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-05T15%3A03%3A41Z&ske=2025-05-06T15%3A03%3A41Z&sks=b&skv=2024-08-04&sig=Zt/jIPtVyKasbss6tu0p76/GEGrGiwBlDkKTI93FN2A%3D",
      link: "/",
    },
    {
      img: "https://sdmntprwestus.oaiusercontent.com/files/00000000-6238-6230-977e-1de315f7f045/raw?se=2025-05-05T17%3A20%3A34Z&sp=r&sv=2024-08-04&sr=b&scid=82907901-0cfd-5640-a130-4bd09e090eab&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-05T14%3A57%3A38Z&ske=2025-05-06T14%3A57%3A38Z&sks=b&skv=2024-08-04&sig=X8rzTxdCxazj7BznuHJLVtz5g6zgTZuaIObS425uymM%3D",
      link: "/",
    },
    {
      img: "https://sdmntprwestus.oaiusercontent.com/files/00000000-f288-6230-8aba-0713e38e229a/raw?se=2025-05-05T17%3A20%3A34Z&sp=r&sv=2024-08-04&sr=b&scid=8fe6e029-d780-5849-879f-f6f2b67c1bf3&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-05T15%3A03%3A41Z&ske=2025-05-06T15%3A03%3A41Z&sks=b&skv=2024-08-04&sig=Zt/jIPtVyKasbss6tu0p76/GEGrGiwBlDkKTI93FN2A%3D",
      link: "/",
    },
  ];
  return (
    <div className="grid grid-rows-2 grid-cols-4">
      {ads.map((item, i) => (
        <Link href={item?.link} key={i} className={`${i == 2 && "row-span-2 col-span-2"}`}>
          <img src={item?.img} alt="" className="w-full" />
        </Link>
      ))}
    </div>
  );
}

export default Ads1;
