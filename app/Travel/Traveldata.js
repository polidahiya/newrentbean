import { IoTimeOutline } from "react-icons/io5";
import { IoPricetagsOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

export const locations = [
  "Agra",
  "Amritsar",
  "Chandigarh",
  "Corbett-National-Park",
  "Dalhousie",
  "Dehradun",
  "Delhi",
  "Dharamshala",
  "Haridwar",
  "Jaipur",
  "Jaisalmer",
  "Jodhpur",
  "Kasauli",
  "Kashmir",
  "Kullu-Manali",
  "Leh-Ladakh",
  "Mathura",
  "Mussoorie",
  "Nainital",
  "Rishikesh",
  "Shimla",
  "Udaipur",
  "Varanasi",
];

export const vehicles = [
  "Cab",
  "Sedan",
  "Suv",
  "XL",
  "Ertiga",
  "Innova",
  "Mini bus",
  "Luxury bus",
  "Tampo traveler",
];

export const filterdata = {
  Locations: {
    icon: <SlLocationPin className="inline mr-1" />,
    data: {
      All: "All",
      ...Object.fromEntries(locations.map((item) => [item, item])),
    },
  },
  Price_Range: {
    icon: <IoPricetagsOutline className="inline mr-1" />,
    data: {
      All: [0, Infinity],
      "Less than 5000": [0, 5000],
      "5000 - 10000": [5000, 10000],
      "10000 - 15000": [10000, 15000],
      "15000 - 20000": [15000, 20000],
      "20000 - 25000": [20000, 25000],
      "25000 - 30000": [25000, 30000],
      "Above 30000": [30000, Infinity],
    },
  },
  Duration: {
    icon: <IoTimeOutline className="inline mr-1" />,
    data: {
      All: [0, Infinity],
      "1-Day-To-3-Days": [1, 2],
      "3-Days-To-6-Days": [3, 6],
      "6-Days-To-8-Days": [6, 8],
      "8-Days-To-10-Days": [8, 10],
      "Above-10-Days": [10, Infinity],
    },
  },
};
