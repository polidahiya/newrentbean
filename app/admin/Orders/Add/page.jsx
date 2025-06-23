import React from "react";
import Wrapper from "./Wrapper";

async function page({ searchParams }) {
  const { edit } = await searchParams;

  if (edit) {
    const { GetOrderById } = await import(
      "@/app/admin/Orders/Add/Serveraction"
    );
    const res = await GetOrderById(edit);
    if (res.status == 200) {
      return <Wrapper order={res?.order}></Wrapper>;
    }
    return <div>{res.message}</div>;
  }

  return (
    <div>
      <Wrapper></Wrapper>
    </div>
  );
}

export default page;
