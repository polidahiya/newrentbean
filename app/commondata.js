export const mail = "Rentbean@gmail.com";
export const mobile = "+91 95822 14574";
export const address = "Plot no. 1081 sector 3A, Gurgaon Haryana 122001";

// export const payulink="https://test.payu.in/_payment" //test
export const payulink = "https://secure.payu.in/_payment"; //live

// export const domain = "http://localhost:3000";
export const domain = "https://rentbean.in";

export const sociallinks = {
  insta: "https://www.instagram.com/Rentbean?igsh=emc0cmUwcHVsdXR2",
  facebook: "https://www.facebook.com/share/VN5R1yTY3ZHarwW9/?mibextid=qi2Omg",
  twitter: "https://x.com/Rentbean?t=VQWPT4ltjY2cAcHw40xLmw&s=09",
  pinterest: "https://in.pinterest.com/Rentbean/",
};

export const categorylist = {
  "Fitness-&-Gym": {
    name: "Fitness and Gym",
    image: "/logo&ui/categories/fitnessandgym2.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/Treadmills.jpg",
        name: "Cardio-Machines",
      },
      {
        image: "/logo&ui/categories/subcategories/cycles.webp",
        name: "Outdoor-Fitness",
      },
      {
        image: "/logo&ui/categories/subcategories/homegym.jpg",
        name: "Body-Care",
      },
    ],
  },
  Electronics: {
    name: "Electronics",
    image: "/logo&ui/categories/electronics.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/games.jpg",
        name: "Gaming",
      },
      {
        image: "/logo&ui/categories/subcategories/laptop.jpeg",
        name: "Laptops",
      },
      {
        image: "/logo&ui/categories/subcategories/phone.jpg",
        name: "Mobile-&-Accessories",
      },
      {
        image: "/logo&ui/categories/subcategories/projector.jpeg",
        name: "Entertainment",
      },
      {
        image: "/logo&ui/categories/subcategories/washingmachine.webp",
        name: "Home-Appliances",
      },
    ],
  },
  Furniture: {
    name: "Furniture",
    image: "/logo&ui/categories/furniture.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/Bed.png",
        name: "Beds",
      },
      {
        image: "/logo&ui/categories/subcategories/studytable.webp",
        name: "Study-Tables",
      },
      {
        image: "/logo&ui/categories/subcategories/dining.jpg",
        name: "Dining",
      },
      {
        image: "/logo&ui/categories/subcategories/bookshelf.jpg",
        name: "Bookshelves",
      },
      {
        image: "/logo&ui/categories/subcategories/sofa.png",
        name: "Sofas",
      },
      {
        image: "/logo&ui/categories/subcategories/centretable.webp",
        name: "Center-Tables",
      },
    ],
  },
  "Party-&-Outdoor": {
    name: "Party & Outdoor",
    image: "/logo&ui/categories/eventandparties.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/hookah.jpeg",
        name: "Party-Essentials",
      },
      {
        image: "/logo&ui/categories/subcategories/sleepbag.jpg",
        name: "Outdoor-Essentials",
      },
    ],
  },
  "Baby-Products": {
    name: "Baby Products",
    image: "/logo&ui/categories/campinggear.svg",
    subcat: [
      {
        image: "/logo&ui/categories/subcategories/babycarrier.jpg",
        name: "Travel-Gear",
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
  "Fitness and Gym",
  "Treadmill",
  "Cross Trainer",
  "Gym Bikes",
  "Bicycle",
  "Home gym",
  "Electronics",
  "Ps4",
  "Ps5",
  "Xbox",
  "Hoverboard",
  "Laptop",
  "Smartphones",
  "Tv",
  "AC",
  "Cooler",
  "Projector",
  "Vacuum Cleaner",
  "Air Fryer",
  "Furniture",
  "Sofa",
  "Bed",
  "Study Table",
  "Dining",
  "Bookshelf",
  "Center Table",
  "Hookah",
  "Dj Light",
  "Barbeque",
  "Beer Tower",
  "Dispenser",
  "Tent",
  "Sleeping Bags",
  "Baby Car Seats",
  "Baby Carrier",
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
