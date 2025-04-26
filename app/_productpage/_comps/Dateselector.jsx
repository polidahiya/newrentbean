import { FiChevronLeft } from "react-icons/fi";
import { HiCalendarDays } from "react-icons/hi2";
import { months } from "@/app/commondata";

const CustomCalendar = ({ cart, setcart, cartproductid, isPastDate }) => {
 

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(
    cart[cartproductid]?.tenureStart?.year,
    cart[cartproductid]?.tenureStart?.month,
    1
  ).getDay();

  const totalDays = getDaysInMonth(
    cart[cartproductid]?.tenureStart?.month,
    cart[cartproductid]?.tenureStart?.year
  );

  const prevMonthDays = getDaysInMonth(
    cart[cartproductid]?.tenureStart?.month === 0
      ? 11
      : cart[cartproductid]?.tenureStart?.month - 1,
    cart[cartproductid]?.tenureStart?.month === 0
      ? cart[cartproductid]?.tenureStart?.year - 1
      : cart[cartproductid]?.tenureStart?.year
  );

  // Get previous month's last days for leading spaces
  const prevMonthDates = Array.from(
    { length: firstDayOfMonth },
    (_, i) => prevMonthDays - firstDayOfMonth + 1 + i
  );

  // Generate current month's days
  const currentMonthDates = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Function to update tenureStart inside cart state
  const updateTenureStart = (newValues) =>
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductid] = {
        ...updatedcart[cartproductid],
        tenureStart: {
          ...updatedcart[cartproductid].tenureStart,
          ...newValues,
        },
      };
      return updatedcart;
    });

  return (
    <div className="relative group mx-7">
      {/* Display Selected Date */}
      <div
        className={`flex items-center justify-center mt-4 text-center gap-2 text-sm  bg-white py-2  rounded-md group-hover:outline outline-gray-200 outline-1 ${
          isPastDate(
            cart[cartproductid]?.tenureStart?.date,
            cart[cartproductid]?.tenureStart?.month,
            cart[cartproductid]?.tenureStart?.year
          ) && "text-red-500"
        }`}
      >
        Tenure Start Date: {cart[cartproductid]?.tenureStart?.date}{" "}
        {months[cart[cartproductid]?.tenureStart?.month]}{" "}
        {cart[cartproductid]?.tenureStart?.year}
        <HiCalendarDays />
      </div>
      {/* calender */}
      <div className="lg:absolute lg:w-full z-20 hidden group-hover:block">
        <div className=" p-2 border bg-white max-w-md mx-auto mt-2 rounded-md moveup-animate lg:shadow-md">
          {/* Month and Year Selection */}
          <div className="flex justify-between items-center p-1 ">
            <button
              className="border rounded p-2 lg:hover:bg-bg1"
              onClick={() =>
                updateTenureStart({
                  month:
                    cart[cartproductid]?.tenureStart?.month === 0
                      ? 11
                      : cart[cartproductid]?.tenureStart?.month - 1,
                })
              }
            >
              <FiChevronLeft />
            </button>
            <div>
              <select
                value={cart[cartproductid]?.tenureStart?.month}
                onChange={(e) =>
                  updateTenureStart({ month: parseInt(e.target.value) })
                }
                className="p-1 rounded bg-transparent appearance-none outline-none"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={cart[cartproductid]?.tenureStart?.year}
                onChange={(e) =>
                  updateTenureStart({ year: parseInt(e.target.value) })
                }
                className="p-1 rounded ml-2 bg-transparent appearance-none outline-none"
              >
                {Array.from(
                  { length: 2 },
                  (_, i) => new Date().getFullYear() + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="border rounded p-2 lg:hover:bg-bg1"
              onClick={() =>
                updateTenureStart({
                  month:
                    cart[cartproductid]?.tenureStart?.month === 11
                      ? 0
                      : cart[cartproductid]?.tenureStart?.month + 1,
                })
              }
            >
              <FiChevronLeft className="rotate-180" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 text-center text-sm  mt-5">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-bold opacity-75 mb-2">
                {day}
              </div>
            ))}

            {/* Previous month's days (light gray) */}
            {prevMonthDates.map((day, index) => (
              <button
                key={`prev-${index}`}
                className="aspect-square rounded-md lg:hover:bg-bg1 text-gray-400 cursor-pointer"
              >
                {day}
              </button>
            ))}

            {/* Current month's days */}
            {currentMonthDates.map((day, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md lg:hover:bg-bg1 cursor-pointer opacity-0 days-animate   
              ${
                day === cart[cartproductid]?.tenureStart?.date &&
                "bg-white text-theme font-bold text-base"
              }
              ${
                isPastDate(
                  day,
                  cart[cartproductid]?.tenureStart?.month,
                  cart[cartproductid]?.tenureStart?.year
                ) && "text-gray-400"
              }`}
                onClick={() => updateTenureStart({ date: day })}
                style={{ animationDelay: index * 20 + "ms" }}
                aria-label={day} title={day}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
