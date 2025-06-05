import Dropdownmenu from "../../addproducts/_components/_comps/Dropdownmenu";
import Standardinputfield from "../../addproducts/_components/_comps/Standardinputfield";
import { selectedtenure } from "@/app/_components/_helperfunctions/selectedtenure";

export default function Productselectmenu({
  orderdata,
  setorderdata,
  selectedproduct,
  setselectedproduct,
}) {
  const alltenures = selectedproduct.data
    ? selectedtenure(selectedproduct?.data, orderdata?.location).all
    : "";
  const producttenure = orderdata.product.tenure;

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setorderdata((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        tenureStart: {
          date: selectedDate.getDate(),
          month: selectedDate.getMonth(),
          year: selectedDate.getFullYear(),
        },
      },
    }));
  };

  const formatDateForInput = () => {
    const { date, month, year } = orderdata.product.tenureStart;
    return `${year}-${String(Number(month + 1)).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/50 z-40">
      <div className="relative bg-white rounded-2xl flex flex-col h-[calc(100%-100px)] w-[calc(100%-100px)] p-5 overflow-hidden">
        <p className="text-xl text-center my-5">Select Product Details</p>
        <div className="overflow-y-auto">
          {orderdata?.product?.isrentalstore && (
            <>
              {/* all tenures */}
              <div>
                {alltenures &&
                  alltenures.map((tenure, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                        tenure.time == producttenure.time &&
                        tenure.type == producttenure.type &&
                        tenure.price == producttenure.price &&
                        "bg-gray-100"
                      }`}
                      onClick={() => {
                        setorderdata((prev) => ({
                          ...prev,
                          product: {
                            ...prev.product,
                            tenure: tenure,
                          },
                        }));
                      }}
                    >
                      <span className="text-sm font-medium">
                        {tenure.time} {tenure.type}
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        ₹{tenure.price}
                      </span>
                    </div>
                  ))}
              </div>
              {/* custom tenure */}
              <div className="border rounded-md py-2 mt-5">
                <p className="text-center py-2">Custome tenure</p>
                <div className="flex justify-center gap-2 overflow-x-scroll min-w-96">
                  <Standardinputfield
                    titlename="Time"
                    type="number"
                    isRequired={true}
                    value={orderdata?.product?.tenure?.time}
                    onchange={(e) =>
                      setorderdata((prev) => ({
                        ...prev,
                        product: {
                          ...prev.product,
                          tenure: {
                            ...prev.product.tenure,
                            time: e.target.value,
                          },
                        },
                      }))
                    }
                    clear={() =>
                      setorderdata((prev) => ({
                        ...prev,
                        product: {
                          ...prev.product,
                          tenure: {
                            ...prev.product.tenure,
                            time: "",
                          },
                        },
                      }))
                    }
                  />
                  <Dropdownmenu
                    title={"Type"}
                    state={orderdata?.product?.tenure?.type}
                    onchange={(value) =>
                      setorderdata((prev) => ({
                        ...prev,
                        product: {
                          ...prev.product,
                          tenure: {
                            ...prev.product.tenure,
                            type: value,
                          },
                        },
                      }))
                    }
                    options={[
                      "day",
                      "days",
                      "week",
                      "weeks",
                      "month",
                      "months",
                      "season",
                      "seasons",
                    ]}
                  />
                  <Standardinputfield
                    titlename="Price"
                    type="number"
                    isRequired={true}
                    value={orderdata?.product?.tenure?.price}
                    onchange={(e) =>
                      setorderdata((prev) => ({
                        ...prev,
                        product: {
                          ...prev.product,
                          tenure: {
                            ...prev.product.tenure,
                            price: e.target.value,
                          },
                        },
                      }))
                    }
                    clear={() =>
                      setorderdata((prev) => ({
                        ...prev,
                        product: {
                          ...prev.product,
                          tenure: {
                            ...prev.product.tenure,
                            price: "",
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
              {/* start date */}
              <div className="flex justify-center py-5 border rounded-md mt-5">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={formatDateForInput()}
                  onChange={handleDateChange}
                />
              </div>
              {/* Security Deposit */}
              <div className="mt-5">
                <Standardinputfield
                  titlename="Security Deposit"
                  type="number"
                  isRequired
                  value={orderdata.product.securitydeposit || ""}
                  onchange={(e) =>
                    setorderdata((prev) => ({
                      ...prev,
                      product: {
                        ...prev.product,
                        securitydeposit: e.target.value,
                      },
                    }))
                  }
                  clear={() =>
                    setorderdata((prev) => ({
                      ...prev,
                      product: {
                        ...prev.product,
                        securitydeposit: "",
                      },
                    }))
                  }
                />
              </div>
            </>
          )}
          {/* quantity */}
          <div className="mt-5">
            <Standardinputfield
              titlename="Quantity"
              type="number"
              isRequired
              value={orderdata.product.quantity}
              onchange={(e) =>
                setorderdata((prev) => ({
                  ...prev,
                  product: {
                    ...prev.product,
                    quantity: e.target.value,
                  },
                }))
              }
              clear={() =>
                setorderdata((prev) => ({
                  ...prev,
                  product: {
                    ...prev.product,
                    quantity: 1,
                  },
                }))
              }
            />
          </div>
        </div>
        <button
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 w-10 aspect-square"
          onClick={() => setselectedproduct({ data: null, show: false })}
        >
          X
        </button>
      </div>
    </div>
  );
}
