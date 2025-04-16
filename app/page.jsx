import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function page() {
  const allcookies = await cookies();
  const location = allcookies.get("rblocation")?.value;
  const storetype = allcookies.get("storetype")?.value;

  if (location) {
    redirect(`/${location}/${storetype == "false" ? "Buy" : "Rent"}`);
  } else {
    redirect(`/Delhi/Rent`);
  }
}

export default page;
