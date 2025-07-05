// "use server";
// import { getcollection } from "@/app/Mongodb";
export default async function StoreError(data) {
  try {
    console.log(data);

    // const { contactmessages } = await getcollection();
    // await contactmessages.insertOne({
    //   ...data,
    //   type: "Error",
    //   viewed: false,
    //   createdAt: new Date(),
    // });
  } catch (error) {}
}
