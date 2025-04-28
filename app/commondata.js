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
        subcat: "Treadmills | Recmbent bike | Eliptical Crosstrainers",
      },
      {
        image: "/logo&ui/categories/subcategories/gumequipments.jpg",
        name: "Gym-Equipments",
        subcat: "Weights | Rods",
      },
      {
        image: "/logo&ui/categories/subcategories/medicalequipment.jpg",
        name: "Medical-Equipments",
        subcat: "Hospital Beds | Walking Aids",
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
        subcat: "Ps4 | Hoverboard",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-18-23-267.jpg",
        name: "Laptops",
        subcat: "Dell | HP | Lenovo",
      },
      {
        image: "/logo&ui/categories/subcategories/phone.jpg",
        name: "Mobile-&-Accessories",
        subcat: "Mobile phones",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_18-52-28-036.jpg",
        name: "Home-Appliances",
        subcat: "Fridge | Washing Machine | Air Conditioner | Inverter",
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
        subcat: "King size | Queen size | Single size",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_18-51-44-151.jpg",
        name: "Study-Tables",
        subcat: "",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-19-26-646.jpg",
        name: "Dining",
        subcat: "2 seater | 4 seater | 6 seater",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-24-920.jpg",
        name: "Bookshelves",
        subcat: "",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-03-35-634.jpg",
        name: "Sofas",
        subcat: "",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-22-47-889.jpg",
        name: "Center-Tables",
        subcat: "Square center table | Circular center table",
      },
      {
        image: "/logo&ui/categories/subcategories/wardrobe.jpg",
        name: "Wardrobe",
        subcat: "",
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
        subcat: "Dj lights | Hookah | Dispensor | Beer tower | Barbaque",
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
        subcat: "Baby cart seat | Baby carrier | Baby stoller",
      },
      {
        image:
          "/logo&ui/categories/subcategories/Picsart_25-02-11_19-02-30-781.jpg",
        name: "Camping-Gear",
        subcat: "Tent | Sleeping bags | Folding chairs",
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
  "Sofa",
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
  "Order Completed",
];

// list of cities
export const cities = ["Delhi", "Noida", "Gurgaon", "Ghaziabad", "Faridabad"];

export const citiesAndLocations = [
  "Gurgaon",
  "Faridabad",
  "Sonipat",
  "Panipat",
  "Karnal",
  "Noida",
  "Greater-Noida",
  "Ghaziabad",
  "Meerut",
  "Bulandshahr",
  "Alwar",
  "Bharatpur",
  "Rohtak",
  "Rewari",
  "Jhajjar",
  "Bhiwadi",
  "Mathura",
  "Agra",
  "Hapur",
  "Muzaffarnagar",
  "Baghpat",
  "Palwal",
  "Dharuhera",
  "Shamli",
  "Etawah",
  "Firozabad",
  "Rampur",
  "Moradabad",
  "Bareilly",
  "Gajraula",
  "Sambhal",
  "Najibabad",
  "Kotputli",
  "Behror",
  "Fatehabad",
  "Kurukshetra",
  "Kaithal",
  "Pilibhit",
  "Hardoi",
  "Deoband",
  "Badaun",
  "Saharanpur",
  "Charkhi-Dadri",
  "Mandi-Dabwali",
  "Sirsa",
  "Narnaul",
  "Jind",
  "Hisar",
  "Ambala",
  "Yamunanagar",
  "Bhiwani",
  "Fatehpur",
  "Kasganj",
  "Hathras",
  "Dausa",
  "Tonk",
  "Jhunjhunu",
  "Chomu",
  "Shahjahanpur",
  "Unnao",
  "Kanpur",
  "Lucknow",
  "Connaught-Place",
  "Chandni-Chowk",
  "Karol-Bagh",
  "Lajpat-Nagar",
  "Saket",
  "Hauz-Khas",
  "Dwarka",
  "Rohini",
  "Pitampura",
  "Vasant-Kunj",
  "Greater-Kailash",
  "Rajouri-Garden",
  "Mayur-Vihar",
  "South-Extension",
  "Defence-Colony",
  "Shahdara",
  "Janakpuri",
  "Kalkaji",
  "Okhla",
  "Green-Park",
  "Punjabi-Bagh",
  "Sarojini-Nagar",
  "Jor-Bagh",
  "Khan-Market",
  "Preet-Vihar",
  "Nehru-Place",
  "Uttam-Nagar",
  "Tilak-Nagar",
  "Indirapuram",
];

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
    buy: "₹ 13,500",
    rent: "₹ 1,200 / month",
    link: "/Search?query=laptop",
    availablefor: "Both",
  },
  {
    name: "Fridge",
    image: "/directsearchcomp/fridge.png",
    heading: "Keep It Fresh",
    subheading:
      "Store your food and beverages with ease. Rent a spacious, energy-efficient fridge to ensure everything stays fresh and cool.",
    buy: "₹",
    rent: "₹ 650 / month",
    link: "/Search?query=fridge",
    availablefor: "Rent",
  },
  {
    name: "Air Fryer",
    image: "/directsearchcomp/airfryer.png",
    heading: "Healthy Cooking",
    subheading:
      "Enjoy crispy and delicious meals with an air fryer that uses little to no oil, making your favorite dishes healthier and tastier.",
    buy: "₹",
    rent: "₹ 142 / day",
    link: "/Search?query=air-fryer",
    availablefor: "Rent",
  },
  {
    name: "Washing Machine",
    image: "/directsearchcomp/washingmachine.png",
    heading: "Laundry Made Easy",
    subheading:
      "Say goodbye to laundry hassles! Rent a powerful washing machine that makes washing clothes quick and effortless.",
    buy: "₹",
    rent: "₹ 600 / month",
    link: "/Search?query=washing-machine",
    availablefor: "Rent",
  },
  {
    name: "Treadmill",
    image: "/directsearchcomp/treadmill.png",
    heading: "Stay Fit, Stay Active",
    subheading:
      "Bring the gym to your home with a high-quality treadmill. Stay on top of your fitness goals with convenient and easy workouts anytime.",
    buy: "₹",
    rent: "₹ 1,916 / month",
    link: "/Search?query=treadmill",
    availablefor: "Rent",
  },
  {
    name: "Baby Stroller",
    image: "/directsearchcomp/babystraller.png",
    heading: "Comfort & Safety for Your Baby",
    subheading:
      "Make outings easier with a sturdy and comfortable baby stroller. Ensure your little one's safety while on the move.",
    buy: "₹",
    rent: "₹ 60 / day",
    link: "/Search?query=baby-stroller",
    availablefor: "Rent",
  },
  {
    name: "Recumbent Bike",
    image: "/directsearchcomp/recumbentbike.png",
    heading: "Low Impact, High Results",
    subheading:
      "Enjoy a comfortable and effective workout with a recumbent bike, perfect for those looking to stay active without straining their body.",
    buy: "₹",
    rent: "₹ 1,583 / month",
    link: "/Search?query=recumbent-bike",
    availablefor: "Rent",
  },
  {
    name: "Inverter Battery",
    image: "/directsearchcomp/inverter.png",
    heading: "Reliable Power Backup",
    subheading:
      "Ensure an uninterrupted power supply at home or office with a high-capacity inverter battery, keeping your essentials running smoothly.",
    buy: "₹ 10,900",
    rent: "₹ 583 / month",
    link: "/Search?query=inverter-battery",
    availablefor: "Both",
  },
  {
    name: "Baby Carrier",
    image: "/directsearchcomp/babycarrier.png",
    heading: "Hands-Free Convenience",
    subheading:
      "Keep your baby close and comfortable while staying hands-free. Rent a baby carrier for ease and comfort on the go.",
    buy: "₹",
    rent: "₹ 33 / day",
    link: "/Search?query=baby-carrier",
    availablefor: "Rent",
  },
  {
    name: "Hookah",
    image: "/directsearchcomp/hookah.png",
    heading: "Relax & Unwind",
    subheading:
      "Enjoy a premium hookah experience at home or with friends. Rent high-quality hookahs for a smooth and flavorful session.",
    buy: "₹",
    rent: "₹ 142 / day",
    link: "/Search?query=hookah",
    availablefor: "Rent",
  },
  {
    name: "PS4",
    image: "/directsearchcomp/ps4.png",
    heading: "Game On",
    subheading:
      "Immerse yourself in the world of gaming with a PlayStation 4. Enjoy high-quality graphics, online multiplayer, and endless entertainment.",
    buy: "₹",
    rent: "₹ 200 / day",
    link: "/Search?query=ps4",
    availablefor: "Rent",
  },
  {
    name: "Baby Car Seat",
    image: "/directsearchcomp/babycarseat.png",
    heading: "Safety First",
    subheading:
      "Ensure your child's safety while traveling. Rent a baby car seat designed for comfort and maximum protection.",
    buy: "₹",
    rent: "₹ 90 / day",
    link: "/Search?query=baby-car-seat",
    availablefor: "Rent",
  },
  {
    name: "Hoverboard",
    image: "/directsearchcomp/hoverboard.png",
    heading: "Glide with Style",
    subheading:
      "Experience smooth and effortless rides with a hoverboard that offers speed, balance, and fun for all ages.",
    buy: "₹",
    rent: "₹ 133 / day",
    link: "/Search?query=hoverboard",
    availablefor: "Rent",
  },
  {
    name: "Crosstrainer",
    image: "/directsearchcomp/crosstrainer.png",
    heading: "Cardio Made Easy",
    subheading:
      "Enhance your cardio routine with a crosstrainer, designed to provide an effective workout with minimal impact on your joints.",
    buy: "₹",
    rent: "₹ 1,583 / month",
    link: "/Search?query=cross-trainer",
    availablefor: "Rent",
  },
];
