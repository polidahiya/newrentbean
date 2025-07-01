import { notFound } from "next/navigation";
import Adminnavbar from "./_comps/Adminnavbar";
import Verification from "@/app/Verifytoken";

export default async function RootLayout({ children }) {
  const res = await Verification();
  if (!res.verified) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Adminnavbar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
