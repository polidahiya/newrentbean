export const mail = "adorefurnix@gmail.com";
export const mobile = "+91 95822 14574";
export const address = "Plot no. 1081 sector 3A, Gurgaon Haryana 122001";

// export const payulink="https://test.payu.in/_payment" //test
export const payulink = "https://secure.payu.in/_payment"; //live

// export const domain = "http://localhost:3000";
export const domain = "https://rentbean.in";

export const sociallinks = {
  insta: "https://www.instagram.com/adorefurnix?igsh=emc0cmUwcHVsdXR2",
  facebook: "https://www.facebook.com/share/VN5R1yTY3ZHarwW9/?mibextid=qi2Omg",
  twitter: "https://x.com/Adorefurnix?t=VQWPT4ltjY2cAcHw40xLmw&s=09",
  pinterest: "https://in.pinterest.com/adorefurnix/",
};

export const categorylist = {
  "Fitness-&-Gym": {
    name: "Fitness and Gym",
    image: "/logo&ui/categories/fitnessandgym2.svg",
    subcat: [
      {
        image: "/categoriesimages/subcats/sofasets.jpg",
        name: "Cardio-Machines",
      },
      {
        image: "/categoriesimages/subcats/sofacumbed.jpg",
        name: "Outdoor-Fitness",
      },
      { image: "/categoriesimages/subcats/wingchair.jpg", name: "Body-Care" },
    ],
  },
  Electronics: {
    name: "Electronics",
    image: "/logo&ui/categories/electronics.svg",
    subcat: [
      {
        image: "/categoriesimages/subcats/kingbed.jpg",
        name: "Gaming",
      },
      {
        image: "/categoriesimages/subcats/queenbed.jpg",
        name: "Laptops",
      },
      {
        image: "/categoriesimages/subcats/singlebed.jpg",
        name: "Mobile-&-Accessories",
      },
      { image: "/categoriesimages/subcats/kidsbed.jpg", name: "Entertainment" },
      {
        image: "/categoriesimages/subcats/wardrobe.jpg",
        name: "Home-Appliances",
      },
    ],
  },
  Furniture: {
    name: "Furniture",
    image: "/logo&ui/categories/furniture.svg",
    subcat: [
      {
        image: "/categoriesimages/subcats/2-SeaterDiningSet.jpg",
        name: "Beds",
      },
      {
        image: "/categoriesimages/subcats/4-SeaterDiningSet.jpg",
        name: "Study-Tables",
      },
      {
        image: "/categoriesimages/subcats/4-SeaterDiningSet.jpg",
        name: "Dining",
      },
      {
        image: "/categoriesimages/subcats/6-SeaterDiningSet.jpg",
        name: "Bookshelves",
      },
      {
        image: "/categoriesimages/subcats/6-SeaterDiningSet.jpg",
        name: "Sofas",
      },
      {
        image: "/categoriesimages/subcats/6-SeaterDiningSet.jpg",
        name: "Center-Tables",
      },
    ],
  },
  "Party-&-Outdoor": {
    name: "Party & Outdoor",
    image: "/logo&ui/categories/eventandparties.svg",
    subcat: [
      {
        image: "/categoriesimages/subcats/CoffeeTables.jpg",
        name: "Party-Essentials",
      },
      {
        image: "/categoriesimages/subcats/EndTables.jpg",
        name: "Outdoor-Essentials",
      },
    ],
  },
  "Baby-Products": {
    name: "Baby Products",
    image: "/logo&ui/categories/campinggear.svg",
    subcat: [
      { image: "/categoriesimages/subcats/ShoeRack.jpg", name: "Travel-Gear" },
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
export const cities = [
  "Delhi",
  "Gurgaon",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Amritsar",
  "Agra",
  "Varanasi",
  "Mumbai",
  "Pune",
  "Ahmedabad",
  "Surat",
  "Nagpur",
  "Goa",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Kochi",
  "Thiruvananthapuram",
  "Coimbatore",
  "Mysore",
  "Kolkata",
  "Bhubaneswar",
  "Patna",
  "Ranchi",
  "Guwahati",
  "Bhopal",
  "Indore",
  "Raipur",
  "Gwalior",
  "Shillong",
  "Imphal",
  "Gangtok",
  "Aizawl",
  "Agartala",
];

export const CACHE_TIME = 60 * 60 * 1000; // 24 hours
