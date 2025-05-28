import React from "react";
import Searchbox from "../_comps/Searchbox";
import { get_users } from "./Serveractions";
const allusers = [
  {
    _id: "67792ca6578fe5bb2ebceec7",
    username: "Admin",
    email: "polidahiya830@gmail.com",
    password: "$2b$12$yAIJBWShzHJiyKuqDlKM0uYpU95VLuObYeQ19lTxCE220NqyHua2e",
    phonenum: "08700705247",
    address: "this is my new address",
    usertype: "admin",
    favourites: ["67b6059ddbcc5adfb3781b08"],
  },
  {
    _id: "677a0f659c9064c7213767b6",
    username: "test1",
    email: "test1@gmail.com",
    password: "$2b$12$W32PKXHp1ugAsnuaP2I7B.ktZU6.emcSxhfpHgm/lk8TKXvPkyGOu",
    phonenum: "1234567890",
    address: "test address",
    usertype: "user",
  },
  {
    _id: "67b1e398d0de2092803ad5cd",
    username: "test",
    email: "test@gmail.com",
    password: "$2b$12$Y/RdUcuJHlShhQ6gqN4Ufuc8MK2yuGwJSskjQskOlL8zBoKsg8EOq",
    phonenum: "1234567890",
    address: "this is a test address",
    usertype: "user",
  },
  {
    _id: "67b95283499f1b7d66913a34",
    username: "rentbean Dotin",
    email: "rentbeandotin@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "67be02881828547f997a6307",
    username: "Vijay Singh",
    email: "vij7827779717@gmail.com",
    phonenum: "7827779717",
    address: "House no 1081/31 laxman vihar sector 3a gurgaon harayana ",
    usertype: "user",
  },
  {
    _id: "67c447057c76ef4ca9fa1224",
    username: "Bhim",
    email: "bhimdahiya767@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "67c582b50b99ccd1abe7f915",
    username: "Mrs Anu Ghei",
    email: "dgup268@gmail.com",
    phonenum: "919810034445",
    address: "B42 Sector 36 Noida 201303",
    usertype: "user",
  },
  {
    _id: "67c5adaec8474ec7c59535e4",
    username: "Jandour Taxi Service",
    email: "sunnysaini527@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "67ca484cd272f43f80bacbbc",
    username: "BARNA Biswas Mandal",
    email: "barnabiswasmandal@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "67d172784687039cadee06f9",
    username: "ROHAN Kumar",
    email: "rohancx.9802@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "67d172f14687039cadee06fa",
    username: "PAWAN MANDAL",
    email: "pawan.pr50@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "67d63fe7f2bfe78bbe03bb52",
    username: "Amit Agarwal",
    email: "amit.agarwal.ie@gmail.com",
    phonenum: "9742099077",
    address: "Sushant Lok 1 Road 877-A, Gurugram, Haryana 122022",
    usertype: "user",
  },
  {
    _id: "67dfc74449e1d7eb71f2ed7e",
    username: "Sarvesh verma",
    email: "sarvesh088@gmail.com",
    phonenum: "8010683217",
    address: "C1304,Aditya celebrity homes,sector 76",
    usertype: "user",
  },
  {
    _id: "67e6be9339a90b37aba9ed44",
    username: "Ankit Rawat",
    email: "anks22@gmail.com",
    phonenum: "9205514741",
    address:
      "S-2, Mangalam Apt, Module-9, Abhay Khand3, Indirapuram, Ghaziabad, UP, 201014",
    usertype: "user",
  },
  {
    _id: "67e778b0c184316ee9745241",
    username: "Vishal",
    email: "vishalkv0805@gmail.com",
    phonenum: "8860724140",
    address: "test",
    usertype: "user",
  },
  {
    _id: "67ece0ca341ae527e91044b6",
    username: "Uddipana Kalita",
    email: "uddipanakalita23@gmail.com",
    phonenum: "8754643136",
    address: "Gurgaon ",
    usertype: "user",
  },
  {
    _id: "67ee813a1bb8f14733f00e04",
    username: "Sunil Saini",
    email: "sunilsaini85@gmail.com",
    phonenum: "8939263435",
    address: "3rd floor, E794, Chittranjan Park, New Delhi-110019",
    usertype: "user",
  },
  {
    _id: "67f336367a081203d2b1c67a",
    username: "Kanishk Aggarwal",
    email: "er.kanishk_agg@yahoo.com",
    password: "$2b$12$JA3pMp7gLilGAfExOQsAXOCTcGj4itwEx7NyC0yeCXyeHCT99PkWu",
    phonenum: "9650080466",
    address: "138, GH-13, Paschim Vihar, Delhi 110087",
    usertype: "user",
  },
  {
    _id: "67f620d9b78293b3e9a64619",
    username: "Balaji K",
    email: "balajikbalaji8442@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "67f8a35a388717dd032ccf50",
    username: "Shivali Oswal",
    email: "classifiedbirdshivali@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
    favourites: ["67b60c097a3d487ba3be9782"],
  },
  {
    _id: "6804106ec524014e42aaa4c7",
    username: "swati goyal",
    email: "swatigoyal53@gmail.com",
    phonenum: "8285571371",
    address: "I-4/144 1st Floor Sector 16 Rohini North West Delhi-110089",
    usertype: "user",
  },
  {
    _id: "680aedae55ad5278c0d011b1",
    username: "Harry Singh",
    email: "harmendersingh234@gmail.com",
    phonenum: "09871752347",
    address: "Flat no 6 wmg tower Subhash nagar",
    usertype: "user",
  },
  {
    _id: "680bc4ad822fa38d697d805e",
    username: "Namita Chaudhary ",
    email: "csnamitachaudhary@gmail.com",
    password: "$2b$12$LpuWPmr9ZYuYO3QFEoOB5OF49P8zIsl12Pzi8KKgtF1xY/ho14cCC",
    phonenum: "9634041855",
    address: "Gaur City 2 ",
    usertype: "user",
  },
  {
    _id: "680dcd41507a46a7611e4b2c",
    username: "Dr. Vinay Varghese Mathai",
    email: "vvm2690@gmail.com",
    phonenum: "8848442639",
    address:
      "1104, Tower 5, Civitech Florencia Park Sapphire, Sector 9,Ramprastha Greens, Vaishali, Ghaziabad, Uttar Pradesh-201012",
    usertype: "user",
  },
  {
    _id: "680dd6c46d848e1a4d11bdb9",
    username: "rastogi p",
    email: "ithelpdesk720@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6810899fc5743aa5828ee47a",
    username: "Kunal Singh",
    email: "kunalsingh14042003@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6810ecfcbc0391862a1a96b1",
    username: "Vanlal Zari",
    email: "zarikholhring33@gmail.com",
    password: "$2b$12$zYkep3yMJZNZ6pCRiFHXr.pN4.wb.KjUvZDSm4BGqGK2Ldv/2HYMW",
    phonenum: "7085643645",
    address: "Near oasis library, pande furniture shop, munirka, delhi",
    usertype: "user",
  },
  {
    _id: "6811a02f543dfc22c1ecca69",
    username: "Ishika Agarwal",
    email: "ishika91@gmail.com",
    phonenum: "9969185230",
    address:
      "Holiday Inn New Delhi Aerocity Asset Area 12, Hospitality District Aero City, Delhi International Airport New Delhi, 110037, India",
    usertype: "user",
  },
  {
    _id: "681247fbd123de3cd33e52ae",
    username: "Vineeta Singh",
    email: "harshsharma17199226@gmail.com",
    phonenum: "8920163790",
    address: "S-591B, Second Floor, School Block, Shakarpur, Delhi-110092",
    usertype: "user",
  },
  {
    _id: "68148a57d0f7fa5b7415679e",
    username: "Nishant Tyagi",
    email: "nishanttyagi123@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "68174d8e2e093675620b2d34",
    username: "Tanisha Sharma",
    email: "zzingi@gmail.com",
    phonenum: "9910034989",
    address: "W 7/2, DLF Phase 3, Gurgaon, Haryana",
    usertype: "user",
  },
  {
    _id: "68181044c715ae2287cb430f",
    username: "Dhruv Wali",
    email: "dhruvwali@yahoo.com",
    password: "$2b$12$Ji9OlDjcj0HAKEEu4MLKNu2OhZwwcShY75y7jHRXufioa7ZHPJUGq",
    phonenum: "9972029911",
    address: "2093, Banyan, Parx Laureate, Sector 108, Noida, UP 201304",
    usertype: "user",
  },
  {
    _id: "681891bdf3a87caca9c99249",
    username: "Yash Sandeep Mittal",
    email: "ysmhmo@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "681c5093650c154a61ccd37b",
    username: "Sanjana Saksena",
    email: "sanjanasaksena23@gmail.com",
    phonenum: "09560090223",
    address: "202, Aabhas Apartments, sector 56, Gurgaon",
    usertype: "user",
  },
  {
    _id: "681cabe3c4bc260270b78ddc",
    username: "MOHD IMAAN",
    email: "mohdimaan2k6@gmail.com",
    phonenum: "08800622770",
    address:
      "A-19/1, 4TH FLOOR, OKHLA VIHAR, JAMIA NAGAR, SOUTH DELHI,  DELHI - 110025",
    usertype: "user",
  },
  {
    _id: "6820aa3f5f78a04e8add29df",
    username: "Roshan Roy",
    email: "officialroshan2002@gmail.com",
    password: "$2b$12$ywe7fdQ3rxCnNfbMuqFH/.Hr3ibtXnZw5ed3.K5sCLFp.xdosWeUi",
    phonenum: "8595707360",
    address: "H No. 97E, H Block, Aya Nagar",
    usertype: "user",
  },
  {
    _id: "6821d35bc0ab87115f5d8188",
    username: "Ankit Prashar",
    email: "ankitprashar@gmail.com",
    phonenum: "9910027535",
    address: "L6/1, DLF PHASE 2, GURGAON-HARYANA 122002",
    usertype: "user",
  },
  {
    _id: "68236146512475bdb5fa5b6e",
    username: "Samarjeet Deo",
    email: "singhdeo.samarjeet@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "682370f281d323d5d826a849",
    username: "Ravinder Bahot",
    email: "ravinderbahot6@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "68244bb5efe78fd94471fc7e",
    username: "Rahul Singh Sokhday",
    email: "alfiyamirza09@gmail.com",
    phonenum: "9739915348",
    address:
      "The leela Ambience Gurugram Hotel, National Highway 8, Ambience Island, DLF Phase 3, Sector 24, Gurugram, Haryana 122002",
    usertype: "user",
  },
  {
    _id: "682567847a82194b4b2468d0",
    username: "Tadar chumpi",
    email: "chumpitadar@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6825a73307d1b7ec6a2a6818",
    username: "Preeti Agarwal",
    email: "pa82377@gmail.com",
    phonenum: "8443035028",
    address: "Cannught palace delhi",
    usertype: "user",
  },
  {
    _id: "6826d69999baeda19d43e48d",
    username: "Syed Rayan Rayan",
    email: "syedrayanrayan73@gmail.com",
    phonenum: "9994983656",
    address: "Makhan beed taruu",
    usertype: "user",
  },
  {
    _id: "682767b13b5dbeaf6a3ff569",
    username: "Deepak Tak",
    email: "itz.deepak10urboi@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6828286f8bc1600f61a115c7",
    username: "natasha arora",
    email: "aroranatasha1216@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6828737318e86ac94027f9bb",
    username: "Yash Pratap yadav",
    email: "yashyadavvirat@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6828833e454d99630b1bfb1e",
    username: "Shatabdi Dey",
    email: "deyshatabdi3009@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6828e2649c64feaa55913265",
    username: "swati mathur",
    email: "angelswatimathur@gmail.com",
    phonenum: "9953164274",
    address:
      "1142 blue bell tower Gaur Saundaryam Techzone-IV Greater Noida West ",
    usertype: "user",
  },
  {
    _id: "6828f7f58b4cb0f0aaf6a4a6",
    username: "Shailender",
    email: "rc1708086@gmail.com",
    phonenum: "9990443007",
    address: "Rz-2980/33 tughalkabad extension New Delhi 110019",
    usertype: "user",
  },
  {
    _id: "682a3ac6cccd7f9824d4b051",
    username: "R U Gul",
    email: "myprsnlgm@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "682abd551cbe28ff5840af5c",
    username: "Yashi Chhikara",
    email: "yashichhikara22@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "682b2e19f2c1201bf15331fb",
    username: "Tanya",
    email: "tanya.anand1610@gmail.com",
    password: "$2b$12$99L4c.ZMYYoGKZ.7numk3eQfV9BdoZ8W9esA.zVuR3gzadToCnVKu",
    phonenum: "9711720017",
    address: "G-24/3, first floor, Rajouri Garden, New Delhi",
    usertype: "user",
  },
  {
    _id: "682b6b79b4bcdaa52862cca9",
    username: "Gaurav Seth",
    email: "gaurs92@gmail.com",
    phonenum: "9753545763",
    address: "K-29, 3rd Floor, K Block , Sector 11, Noida -201301",
    usertype: "user",
  },
  {
    _id: "682b74f10674ee99a4a02ecc",
    username: "Nitesh Jha",
    email: "niteshjha1807@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "682b78a6840004be3e4e6dad",
    username: "Govind",
    email: "govind.khandelwal81@gmail.com",
    password: "$2b$12$QNRd3SKKAqlRhCyFHFgAq.ria4BPOogh0LdBFdvY5BMxiOrDReTXi",
    phonenum: "9088207695",
    address:
      "Paradise Apartment Plot No 70 Flat 004 Sector 30 Vijay Vihar Gurgaon-122001",
    usertype: "user",
  },
  {
    _id: "682ba9ec8a54e3adc476978d",
    username: "Siddharth",
    email: "lazyengineer8076@gmail.com",
    phonenum: "806554187",
    address: "145/10, Gali no-8, sona colony, sehatpur, Faridabad-121003",
    usertype: "user",
  },
  {
    _id: "682c483de2adc35db13d9e14",
    username: "NILESH KUMAR",
    email: "NILESH.JIET08@GMAIL.COM",
    password: "$2b$12$4urUPh2nTznw0lWLdSwRVuayq0lcxo199OMZGRVsbxWzRuopBwapi",
    phonenum: "9654500635",
    address: "B-9, KRISHI VIHAR, NEAR GREATER KAILASH, NEW DELHI-110048.",
    usertype: "user",
  },
  {
    _id: "682cd93500de2231bb5806a9",
    username: "Abhishek verma",
    email: "abh69189@gmail.com",
    phonenum: "08383912770",
    address:
      "A-79, Gali no. 2, jagdamba colony, aali vihar, sarita vihar, new delhi, 110076",
    usertype: "user",
  },
  {
    _id: "682d6d8f103564ddb8d2913d",
    username: "shikha periwal",
    email: "shikha.periwal@gmail.com",
    phonenum: "8050837645",
    address: "House n0. 477, Sector 4, Near blue bells model school",
    usertype: "user",
  },
  {
    _id: "682d9e8aecb27397c55500c2",
    username: "kanav karol",
    email: "kanavkarol.41@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "682da0ececb27397c55500c3",
    username: "H Y D R O Sharma",
    email: "hydromvp2@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "682e2039a0eb7c36d3d8a6fc",
    username: "Pram Sharma",
    email: "pramsharma71@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "682e51a982b1972fabe43acd",
    username: "SHARAFAT KHAN",
    email: "sharaftkhan3220@gmail.com",
    phonenum: "9266387727",
    address:
      "House no A 532/23 Gali no 5 harswaroop memorial School madanpur khadar sarita vihar new delhi ",
    usertype: "user",
  },
  {
    _id: "682e56af01d5ebd3b7c8be53",
    username: "RJ Rajeev",
    email: "rprajeevpal96@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
    favourites: ["67c13a4f779915d391caa3f4"],
  },
  {
    _id: "682e8be8b7499d84a8beb5d6",
    username: "Mohd Yasser",
    email: "mohdyasser3899@gmail.com",
    phonenum: "7051492145",
    address: "Jasrota kali mata temple ",
    usertype: "user",
  },
  {
    _id: "682e915071103b5437d2a987",
    username: "Garima ",
    email: "garima12gautam@gmail.com",
    password: "$2b$12$1kmvsVqihxqbYZt9VYXOeuc0.BwWM3GWrAV7dywmgr5ahcwsV7XEG",
    phonenum: "9999849785",
    address: "198 Shubham Apartment Pocket 4 sector 12 Dwarka Delhi 110078",
    usertype: "user",
  },
  {
    _id: "682ef7df75eb2670b7731f69",
    username: "Ashu",
    email: "ashu23012023@gmail.com",
    phonenum: "8090749147",
    address: "614 bijwasan new delhi 110061",
    usertype: "user",
  },
  {
    _id: "682ff1f8f28b7dfed5040cbb",
    username: "Sachin Kumar",
    email: "sachinvishnoi100@gmail.com",
    password: "$2b$12$3M4gw7AO4xM2MJhI5zsBzO.ruv7uCatjv2.JY.KKExSR.UErs.mqK",
    phonenum: "8750747689",
    address: "A256A Lagpat nagar Ghaziabad 201005",
    usertype: "user",
  },
  {
    _id: "6830332314a7923a93e2a6f6",
    username: "Bineet Jain",
    email: "bineetjain@gmail.com",
    phonenum: "9953008573",
    address: "2C-111 Wellington Estate, DLF Phase 5, Gurgaon - 122002",
    usertype: "user",
  },
  {
    _id: "6830499007d969a219922237",
    username: "Saloni Singla",
    email: "salonisingla89@gmail.com",
    phonenum: "9873870791",
    address: "24 paschim vihar extension, Delhi - 110063",
    usertype: "user",
  },
  {
    _id: "6831c0289736a468c0e80699",
    username: "Uddeshya Singh",
    email: "uddeshyap1999@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6831c6a5313442a713f3d0e0",
    username: "Harsh soni",
    email: "hsoni682@gmail.com",
    phonenum: "9992358583",
    address: "2nd floor shanti chamber pusa road smc finance ",
    usertype: "user",
  },
  {
    _id: "6832260ab627ef926fb355bd",
    username: "swati jain",
    email: "jswati.91@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6832b239450bdf2ef2b3d01a",
    username: "Ayush",
    email: "ayushpradhan15@gmail.com",
    password: "$2b$12$hz42uPlzXF/4JO4tiXd65On.nNdg83mAxNxZcaWPpZCK91IL/Ji8S",
    phonenum: "9999564251",
    address: "C-401, Civitech Stadia Sector 79, Noida ",
    usertype: "user",
  },
  {
    _id: "6832b90fc850c10283db0db5",
    username: "Akshay",
    email: "loveakki88@gmail.com",
    phonenum: "8745833660",
    address: "51/30, Gali no. 51 S block , near gd Goenka global school,phase3",
    usertype: "user",
  },
  {
    _id: "6833005745c24e346237a325",
    username: "Bhaskar Jyoti Dey",
    email: "bhaskarjd@gmail.com",
    password: "$2b$12$pdQg49NOTKcFt4wqExPYLOU/bo0qDqai8MVuewH.n4uU2jz0Y4Xaa",
    phonenum: "9810199650",
    address: "143, Nehru Apartments, Kalkaji, New Delhi - 19",
    usertype: "user",
  },
  {
    _id: "6834369c9af87b16d8618d91",
    username: "Suresh pal Sharma",
    email: "sureshpalsharma19@gmail.com",
    phonenum: "9682685737",
    address:
      "Room no.1 Berhampur guru gram alhwas sector 59 near tata raisina ",
    usertype: "user",
  },
  {
    _id: "6835be3db8bd61cdb87e4c0b",
    username: "Kashyap Gogoi",
    email: "kashyapgogoi707@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "683606b08720d281062ea666",
    username: "Aman Madhan",
    email: "amanmadhan77@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "68361373d1a653147497e86a",
    username: "Support icici",
    email: "icicilombard179@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6836222105a8783a4c806c52",
    username: "Gargina Gogoi",
    email: "flipairtel@gmail.com",
    phonenum: "9395317210",
    address: "D-96, 1st floor, Street 4, Rajpur Khurd, New Delhi",
    usertype: "user",
  },
  {
    _id: "68363bde48cb2bf60ff1907a",
    username: "Chishi Charlie",
    email: "chishicharlie143@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6836bafeaa426136f8019a3e",
    username: "Sanjana Dhyani",
    email: "sanjana.dhyani@gmail.com",
    phonenum: "8698493906",
    address: "Pune",
    usertype: "user",
  },
  {
    _id: "68371227e87e4d36177c8542",
    username: "Ashok Kumar Anand",
    email: "ashokkanand@gmail.com",
    phonenum: "",
    address: "",
    usertype: "user",
  },
  {
    _id: "6837181ffa7c692ab1577ec1",
    username: "Anupama",
    email: "anupama_1311@yahoo.co.in",
    password: "$2b$12$ws6U3c3iXSS.Fv6HIrIrSORhjRHF5XTO/lhXasSEMIl6C7wg0tSB6",
    phonenum: "8826694688",
    address: "D3-402, Ireo victory valley, sector 67, Gurgaon",
    usertype: "user",
  },
];

export default async function page() {
  const res = { status: 200, users: allusers, total_users: allusers.length };
  //   const res = await get_users();

  if (res.status != 200) {
    return (
      <>
        <Adminnavcomp />
        <div className="h-screen w-full flex items-center justify-center text-red-500">
          {res.message}
        </div>
      </>
    );
  }

  return (
    <div>
      <Adminnavcomp />
      <UserTable users={res?.users} />
    </div>
  );
}
const Adminnavcomp = () => {
  return (
    <div className="sticky top-[50px] bg-white py-[5px] px-2 md:px-10  shadow-md z-30">
      <Searchbox />
      <table className="min-w-full table-auto border border-gray-200 rounded-md shadow-sm text-sm mt-2">
        <thead className="bg-gray-100">
          <tr className="flex">
            <th className="p-2 flex-1 border">Username</th>
            <th className="p-2 flex-1 border">Email</th>
            <th className="p-2 flex-1 border">Phone</th>
            <th className="p-2 flex-1 border">Address</th>
            <th className="p-2 flex-1 border whitespace-nowrap">User Type</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto py-2 px-2 md:px-10">
      <table className="min-w-full table-auto border border-gray-200 rounded-md shadow-sm text-sm">
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="even:bg-gray-50 flex">
              <td className="p-2 border flex-1 whitespace-nowrap">{user.username}</td>
              <td className="p-2 border flex-1 whitespace-nowrap">{user.email}</td>
              <td className="p-2 border flex-1">{user.phonenum}</td>
              <td className="p-2 border flex-1">{user.address}</td>
              <td className="p-2 border flex-1 capitalize">{user.usertype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
