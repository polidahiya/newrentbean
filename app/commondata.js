export const mail = "Rentbeandotin@gmail.com";
export const mobile = "+91 95822 14574";
export const address =
  "Plot no. 626 basement, sector 39 Gurgaon Haryana 122002";

// export const domain = "http://localhost:3000";
export const domain = "https://rentbean.in";

export const sociallinks = {
  insta: "https://www.instagram.com/Rentbean?igsh=emc0cmUwcHVsdXR2",
  facebook: "https://www.facebook.com/share/VN5R1yTY3ZHarwW9/?mibextid=qi2Omg",
  twitter: "https://x.com/Rentbean?t=VQWPT4ltjY2cAcHw40xLmw&s=09",
  pinterest: "https://in.pinterest.com/Rentbean/",
};

export const categorylist = {
  "Health-&-Fitness": {
    name: "Health & Fitness",
    image: "/logo&ui/categories/fitnessandgym2.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_18-52-09-260.jpg",
        name: "Fitness-Machines",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-21-10-633.jpg",
        name: "Weight-&-Rack",
      },
    ],
  },
  Electronic: {
    name: "Home & Electronic Appliance",
    image: "/logo&ui/categories/electronics.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_18-57-12-465.jpg",
        name: "Entertainment",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-18-23-267.jpg",
        name: "Laptops",
      },
      {
        image: "/logo&ui/categories/subcategories/phone.jpg",
        name: "Mobile-&-Accessories",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_18-52-28-036.jpg",
        name: "Home-Appliances",
      },
    ],
  },
  Furniture: {
    name: "Furniture",
    image: "/logo&ui/categories/furniture.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-09-357.jpg",
        name: "Beds",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_18-51-44-151.jpg",
        name: "Study-Tables",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-19-26-646.jpg",
        name: "Dining",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-24-920.jpg",
        name: "Bookshelves",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-03-35-634.jpg",
        name: "Sofas",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-47-889.jpg",
        name: "Center-Tables",
      },
    ],
  },
  "Event-&-Parties": {
    name: "Event & Parties",
    image: "/logo&ui/categories/eventandparties.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-07-07-726.jpg",
        name: "Party-Items",
      },
    ],
  },
  Others: {
    name: "Others",
    image: "/logo&ui/categories/campinggear.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-21-54-509.jpg",
        name: "Baby-Care",
      },
      {
        image: "/logo&ui/categories/subcategories/Picsart_25-02-11_19-02-30-781.jpg",
        name: "Camping-Gear",
      },
    ],
  },
};

export const filterlist = [
  {
    name: "No Filter",
    min: 0,
    max: 500000,
  },
  {
    name: "Less than 10k",
    min: 0,
    max: 10000,
  },
  {
    name: "10k - 25k",
    min: 10000,
    max: 25000,
  },
  {
    name: "25k - 40k",
    min: 25000,
    max: 40000,
  },
  {
    name: "40k - 50k",
    min: 40000,
    max: 50000,
  },
  {
    name: "More than 50k",
    min: 50000,
    max: 500000,
  },
];

export const sortinglist = [
  { name: "Default" },
  { name: "Discount" },
  { name: "Rating" },
  { name: "Price : low to high" },
  { name: "Price : high to low" },
];

// fixed search options
export const searchoptions = [
  "Health & Fitness",
  "Fitness Machines",
  "Weight & Rack",
  "Electronic",
  "Entertainment",
  "Laptops",
  "Mobile & Accessories",
  "Home Appliances",
  "Furniture",
  "Beds",
  "Study Tables",
  "Dining",
  "Bookshelves",
  "Sofas",
  "Center Tables",
  "Event & Parties",
  "Party Items",
  "Others",
  "Baby Care",
  "Camping Gear",
];

export const permanentsearchoptions = [
  "Sofa-sets",
  "Laptop",
  "Hookah",
  "Treadmill",
  "Ps4",
  "Center-Table",
];

// login time
export const logintime = 3600 * 24 * 30;

// ordere stages
export const orderstages = [
  "Order Placed",
  "Order Processing",
  "Order Shipped",
  "Order Delivered",
  "Order Canceled",
  "Order Refunded",
];

// list of cities
export const cities = ["Delhi", "Noida", "Gurgaon", "Ghaziabad", "Faridabad"];

export const CACHE_TIME = 60 * 60 * 1000; // 24 hours
