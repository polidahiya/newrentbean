export const mail = "Rentbeandotin@gmail.com";
export const mobile = "+91 95822 14574";
export const address =
  "Plot no. 626 basement, sector 39 Gurgaon Haryana 122002";

// export const domain = "http://localhost:3000";
export const domain = "https://rentbean.in";

export const sociallinks = {
  insta: "https://www.instagram.com/rentbean.in",
  facebook: "https://www.facebook.com/share/1JFXEV9Uds/?mibextid=qi2Omg",
  twitter: "https://x.com/Rentbean?t=VQWPT4ltjY2cAcHw40xLmw&s=09",
  pinterest: "https://in.pinterest.com/rentbean099/",
};

export const categorylist = {
  "Health-&-Fitness": {
    name: "Health & Fitness",
    image: "/logo&ui/categories/fitnessandgym2.svg",
    subcat: [
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_18-52-09-260.jpg",
        name: "Fitness-Machines",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-21-10-633.jpg",
        name: "Weight-&-Rack",
      },
    ],
  },
  Electronic: {
    name: "Home & Electronic Appliance",
    image: "/logo&ui/categories/electronics.svg",
    subcat: [
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_18-57-12-465.jpg",
        name: "Entertainment",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-18-23-267.jpg",
        name: "Laptops",
      },
      {
        image: "/logo&ui/categories/subcategories/phone.jpg",
        name: "Mobile-&-Accessories",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_18-52-28-036.jpg",
        name: "Home-Appliances",
      },
    ],
  },
  Furniture: {
    name: "Furniture",
    image: "/logo&ui/categories/furniture.svg",
    subcat: [
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-09-357.jpg",
        name: "Beds",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_18-51-44-151.jpg",
        name: "Study-Tables",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-19-26-646.jpg",
        name: "Dining",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-24-920.jpg",
        name: "Bookshelves",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-03-35-634.jpg",
        name: "Sofas",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-47-889.jpg",
        name: "Center-Tables",
      },
    ],
  },
  "Event-&-Parties": {
    name: "Event & Parties",
    image: "/logo&ui/categories/eventandparties.svg",
    subcat: [
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-07-07-726.jpg",
        name: "Party-Items",
      },
    ],
  },
  Others: {
    name: "Others",
    image: "/logo&ui/categories/campinggear.svg",
    subcat: [
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-21-54-509.jpg",
        name: "Baby-Care",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-02-30-781.jpg",
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

// addones
export const boxoptions = {
  Handset: {
    img: "/logo&ui/inboximages/smartphone.jpg",
  },
  "USB Cable": {
    img: "/logo&ui/inboximages/usbcable.jpg",
  },
  "SIM Tray Ejector": {
    img: "/logo&ui/inboximages/simtrayejactor.jpg",
  },
  "Travel Adapter": {
    img: "/logo&ui/inboximages/mobilecharger.jpg",
  },
};

// months
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// search comp
export const direactsearchlist = [
  {
    name: "Laptop",
    image: "/directsearchcomp/laptops.png",
    heading: "Work & Play",
    subheading:
      "Boost your productivity with a high-performance laptop, perfect for work, online classes, or entertainment on the go.",
    startingat: "₹ 1200 / month",
    link: "/Search?query=laptop",
  },
  {
    name: "Fridge",
    image: "/directsearchcomp/fridge.png",
    heading: "Keep It Fresh",
    subheading:
      "Store your food and beverages with ease. Rent a spacious, energy-efficient fridge to ensure everything stays fresh and cool.",
    startingat: "₹ 650 / month",
    link: "/Search?query=fridge",
  },
  {
    name: "Air Fryer",
    image: "/directsearchcomp/airfryer.png",
    heading: "Healthy Cooking",
    subheading:
      "Enjoy crispy and delicious meals with an air fryer that uses little to no oil, making your favorite dishes healthier and tastier.",
    startingat: "₹ 142 / day",
    link: "/Search?query=air-fryer",
  },
  {
    name: "Washing Machine",
    image: "/directsearchcomp/washingmachine.png",
    heading: "Laundry Made Easy",
    subheading:
      "Say goodbye to laundry hassles! Rent a powerful washing machine that makes washing clothes quick and effortless.",
    startingat: "₹ 600 / month",
    link: "/Search?query=washing-machine",
  },
  {
    name: "Treadmill",
    image: "/directsearchcomp/treadmill.png",
    heading: "Stay Fit, Stay Active",
    subheading:
      "Bring the gym to your home with a high-quality treadmill. Stay on top of your fitness goals with convenient and easy workouts anytime.",
    startingat: "₹ 1,916 / month",
    link: "/Search?query=treadmill",
  },
  {
    name: "Baby Stroller",
    image: "/directsearchcomp/babystraller.png",
    heading: "Comfort & Safety for Your Baby",
    subheading:
      "Make outings easier with a sturdy and comfortable baby stroller. Ensure your little one's safety while on the move.",
    startingat: "₹ 60 / day",
    link: "/Search?query=baby-stroller",
  },
  {
    name: "Recumbent Bike",
    image: "/directsearchcomp/recumbentbike.png",
    heading: "Low Impact, High Results",
    subheading:
      "Enjoy a comfortable and effective workout with a recumbent bike, perfect for those looking to stay active without straining their body.",
    startingat: "₹ 1,583 / month",
    link: "/Search?query=recumbent-bike",
  },
  {
    name: "Inverter Battery",
    image: "/directsearchcomp/inverter.png",
    heading: "Reliable Power Backup",
    subheading:
      "Ensure an uninterrupted power supply at home or office with a high-capacity inverter battery, keeping your essentials running smoothly.",
    startingat: "₹ 583 / month",
    link: "/Search?query=inverter-battery",
  },
  {
    name: "Baby Carrier",
    image: "/directsearchcomp/babycarrier.png",
    heading: "Hands-Free Convenience",
    subheading:
      "Keep your baby close and comfortable while staying hands-free. Rent a baby carrier for ease and comfort on the go.",
    startingat: "₹ 33 / day",
    link: "/Search?query=baby-carrier",
  },
  {
    name: "Hookah",
    image: "/directsearchcomp/hookah.png",
    heading: "Relax & Unwind",
    subheading:
      "Enjoy a premium hookah experience at home or with friends. Rent high-quality hookahs for a smooth and flavorful session.",
    startingat: "₹ 142 / day",
    link: "/Search?query=hookah",
  },
  {
    name: "PS4",
    image: "/directsearchcomp/ps4.png",
    heading: "Game On",
    subheading:
      "Immerse yourself in the world of gaming with a PlayStation 4. Enjoy high-quality graphics, online multiplayer, and endless entertainment.",
    startingat: "₹ 200 / day",
    link: "/Search?query=ps4",
  },
  {
    name: "Baby Car Seat",
    image: "/directsearchcomp/babycarseat.png",
    heading: "Safety First",
    subheading:
      "Ensure your child's safety while traveling. Rent a baby car seat designed for comfort and maximum protection.",
    startingat: "₹ 90 / day",
    link: "/Search?query=baby-car-seat",
  },
  {
    name: "Hoverboard",
    image: "/directsearchcomp/hoverboard.png",
    heading: "Glide with Style",
    subheading:
      "Experience smooth and effortless rides with a hoverboard that offers speed, balance, and fun for all ages.",
    startingat: "₹ 133 / day",
    link: "/Search?query=hoverboard",
  },
  {
    name: "Crosstrainer",
    image: "/directsearchcomp/crosstrainer.png",
    heading: "Cardio Made Easy",
    subheading:
      "Enhance your cardio routine with a crosstrainer, designed to provide an effective workout with minimal impact on your joints.",
    startingat: "₹ 1,583 / month",
    link: "/Search?query=cross-trainer",
  },
];
