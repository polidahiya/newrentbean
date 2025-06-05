import { notFound } from "next/navigation";
import Adminnavbar from "./_comps/Adminnavbar";
import Verification from "@/app/Verifytoken";

export default async function RootLayout({ children }) {
  const res=await Verification()
  console.log(res);
  
  if (!res.verified) notFound();

  return (
    <div>
      <Adminnavbar />
      {children}
    </div>
  );
}
