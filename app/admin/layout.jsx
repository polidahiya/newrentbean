import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Adminnavbar from "./_comps/Adminnavbar";

export default async function RootLayout({ children }) {
  const allcookies = await cookies();
  const userdata = allcookies.get("userdata")?.value;

  if (!userdata) notFound();

  try {
    const parseduserdata = JSON.parse(userdata);
    if (parseduserdata?.usertype !== "admin") notFound();
  } catch (error) {
    notFound();
  }

  return (
    <div>
      <Adminnavbar />
      {children}
    </div>
  );
}
