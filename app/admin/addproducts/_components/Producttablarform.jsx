import { AppContextfn } from "@/app/Context";
import Image from "next/image";
import { Deleteproduct } from "../Serveraction";
import { FaEdit } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";

const Producttabularform = ({
  products,
  setproducts,
  setdata,
  setdeletedimages,
  setshoweditform,
}) => {
  const { setmessagefn, setshowdialog } = AppContextfn();

  // Function to move a product up
  const moveUp = (index) => {
    if (index > 0) {
      const updatedItems = [...products];
      [updatedItems[index], updatedItems[index - 1]] = [
        updatedItems[index - 1],
        updatedItems[index],
      ];
      updatedItems[index].sortOrder = index + 1;
      updatedItems[index - 1].sortOrder = index;
      setproducts(updatedItems);
    }
  };

  // Function to move a product down
  const moveDown = (index) => {
    if (index < products.length - 1) {
      const updatedItems = [...products];
      [updatedItems[index], updatedItems[index + 1]] = [
        updatedItems[index + 1],
        updatedItems[index],
      ];
      updatedItems[index].sortOrder = index + 1;
      updatedItems[index + 1].sortOrder = index + 2;
      setproducts(updatedItems);
    }
  };

  return (
    <div className="container mx-auto overflow-x-scroll mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-center whitespace-nowrap text-sm font-semibold sds text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">Index</th>
              <th className="px-4 py-2 border-b">Sort</th>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Subcategory</th>
              <th className="px-4 py-2 border-b">Tags</th>
              <th className="px-4 py-2 border-b">Available</th>
              <th className="px-4 py-2 border-b">Trash</th>
              <th className="px-4 py-2 border-b">SKU</th>
              <th className="px-4 py-2 border-b min-w-80">Description</th>
              <th className="px-4 py-2 border-b">Max Quantity</th>
              <th className="px-4 py-2 border-b">Security Deposit</th>
              <th className="px-4 py-2 border-b min-w-80">Pricing</th>
              <th className="px-4 py-2 border-b">Buy Price</th>
              <th className="px-4 py-2 border-b">Along With</th>
              <th className="px-4 py-2 border-b">Available For</th>
              <th className="px-4 py-2 border-b min-w-64">SEO Title</th>
              <th className="px-4 py-2 border-b min-w-64">SEO Description</th>
              <th className="px-4 py-2 border-b min-w-64">SEO Keywords</th>
              <th className="px-4 py-2 border-b">Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={index}
                className="relative hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="text-xs px-5 flex flex-col gap-1 items-stretch">
                    <button
                      className="border px-5 py-1 rounded-md bg-white"
                      onClick={() => moveUp(index)}
                      aria-label="Move Up"
                      title="Move Up"
                    >
                      UP
                    </button>
                    <button
                      className="border px-5 py-1 rounded-md bg-white"
                      onClick={() => moveDown(index)}
                      aria-label="Move down"
                      title="Move down"
                    >
                      DOWN
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name || "Product Image"}
                      width={300}
                      height={300}
                      className="min-w-24 object-cover object-center mix-blend-multiply"
                      loading="lazy"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.name || "Unnamed Item"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.category || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.subcat || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.tags && item.tags.length > 0
                    ? item.tags.join(", ")
                    : "No Tags"}
                </td>
                <td className="px-4 py-2 text-sm border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.available ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm border-b">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.trash
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.trash ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.sku || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  <ul>
                    {item.desc && item.desc.length > 0
                      ? item.desc.map((item, i) => (
                          <li key={i} className="list-disc">
                            {item}
                          </li>
                        ))
                      : "No description"}
                  </ul>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.maxquantity || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.securitydeposit ? `₹${item.securitydeposit}` : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {["Both", "Rent"].includes(item?.availablefor)
                    ? Object.entries(item.prices).map(([key, tenure]) => (
                        <div key={key}>
                          <strong className="mt-2 block">{key}</strong>
                          <ul>
                            {tenure.map((item, j) => (
                              <li key={j} className="list-disc text-sm">
                                {item?.time} {item?.type} - Rs {item?.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.buyprice ? `₹${item.buyprice}` : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.alongwith && item.alongwith.length > 0
                    ? item.alongwith.join(", ")
                    : "None"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.availablefor || "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  <span className="text-theme">{item.seotitle || "N/A"}</span>
                  <br />
                  <span className="text-cyan-600">
                    {item.buyseotitle || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  <span className="text-theme">
                    {item.seodescription || "N/A"}
                  </span>
                  <br />
                  <span className="text-cyan-600">
                    {item.buyseodescription || "N/A"}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b">
                  {item.seokeywords.split(",").map((item, i) => (
                    <li
                      key={i}
                      className="text-theme rounded-full px-2 text-xs mt-1"
                    >
                      {item}
                    </li>
                  )) || "N/A"}
                  {item?.buyseokeywords?.split(",").map((item, i) => (
                    <li
                      key={i}
                      className="text-cyan-600 rounded-full px-2 text-xs mt-1"
                    >
                      {item}
                    </li>
                  )) || "N/A"}
                </td>
                <td>
                  <div className="flex flex-col w-12 gap-2 p-1">
                    {/* delete product button */}
                    <button
                      className="w-full aspect-square bg-red-600 text-white rounded-full"
                      onClick={async () => {
                        setshowdialog({
                          show: true,
                          title: "Delete?",
                          continue: async () => {
                            const res = await Deleteproduct(
                              item.images,
                              item._id
                            );
                            if (res.status == 200)
                              setproducts(
                                products.filter(
                                  (product) => item._id !== product._id
                                )
                              );

                            setmessagefn(res?.message);
                          },
                          type: false,
                        });
                      }}
                    >
                      X
                    </button>

                    {/* update product button */}
                    <button
                      className="w-full aspect-square flex items-center justify-center bg-green-600 rounded-full text-white"
                      onClick={() => {
                        setdata(item);
                        setdeletedimages([]);
                        setshoweditform(true);
                      }}
                    >
                      <FaEdit className="inline-block" />
                    </button>

                    {/* copy product */}
                    <button
                      className="w-full aspect-square flex items-center justify-center bg-blue-500 rounded-full text-white"
                      onClick={() => {
                        setdata(() => {
                          const updateddata = item;
                          delete updateddata._id;
                          updateddata.images = [];
                          return updateddata;
                        });
                        setdeletedimages([]);
                        setshoweditform(true);
                      }}
                    >
                      <IoIosCopy className="inline-block" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Producttabularform;
