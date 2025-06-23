"use server";
import { revalidatePath } from "next/cache";
import Verification from "@/app/Verifytoken";

export default async function Revalidatepathfn(link) {
  const tokenres = await Verification();
  if (!tokenres?.verified) return;
  revalidatePath(link);
}
