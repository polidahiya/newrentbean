import React from "react";
import Blogscomp from "./_components/Homepage/Blogscomp";
import Promices from "./_components/Homepage/Promices";
import Bestselling from "./_components/Homepage/Bestselling";
import Categories from "./_components/Homepage/Categories";
import { Cachedproducts } from "./_serveractions/Getcachedata";
import Footer from "./_components/Footer";
import Newarrival from "./_components/Homepage/Newarrival";
import { cookies } from "next/headers";
import Allproducts from "./_components/Homepage/Allproducts";
import Citiesdescription from "./_components/Homepage/Citiesdescription";
import Herosection from "./_components/Homepage/Herosection";
import Navbar from "./_components/Navbar/Navbar";
import Mobilenav from "./_components/Navbar/_comps/Mobilenav";

export default async function Home({ searchParams, params }) {
  const allcookies = await cookies();
  const token = allcookies.get("token")?.value;
  const userdata = allcookies.get("userdata")?.value;

  let parseduserdata;
  if (userdata) parseduserdata = JSON.parse(userdata);

  const products = await Cachedproducts();
  const productsname = products?.map((item) => item?.name);
  return (
    <>
      <Navbar
        params={params}
        productsname={productsname}
        token={token}
        userdata={userdata}
      />
      <div className="flex flex-col gap-16 lg:gap-20">
        <Herosection location={"delhi"} />
        <Categories />
        {/* <Newarrival products={products} /> */}
        {/* <Bestselling products={products} /> */}
        <Allproducts products={products.sort(() => Math.random() - 0.5)} />
        <Blogscomp />
        <div>
          <h2 className="text-center font-bold text-2xl md:text-4xl  font-recline">
            Why Choose Us?
          </h2>
          <Promices />
        </div>
        <Citiesdescription city={searchParams?.location} />
        <Footer />
      </div>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `
          <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        h1 {
            color: #d68e43;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
            margin-top: 20px;
        }
            .thankyou{
            margin-top:20px;}
            h2{
            margin-top:20px;
            }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
        .helpnote{
        margin-top:20px;
        font-size: smaller;
        text-align: center;
        }    
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
            }
            .followline{
              margin-bottom: 10px;
        }    
        .footer a {
            color: #d68e43;
            text-decoration: none;
        }
        .social-links {
            margin-top: 20px;
            text-align: center;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            text-decoration: none;
            color: #333;
        }
        .social-links img {
            width: 24px;
            height: 24px;
        }
        .banner img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Banner Image -->
        <div class="banner">
            <img src="http://localhost:3001/banners/banner1-mod.jpg" alt="Banner Image">
        </div>

        <h1>Your Order Has Been Successfully Placed! 🎉</h1>
        <p>Hi [Customer's First Name],</p>
        <p class="thankyou">Thank you for choosing Rentbean.in! We’re excited to let you know that your order has been successfully placed and is now being processed. Below are the details of your purchase:</p>

        <h2>Order Summary</h2>
        <p><strong>Order Number:</strong> [Order Number]</p>
        <p><strong>Order Date:</strong> [Order Date]</p>
        <h2>Product Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>[Product 1 Name]</td>
                    <td>[Rent/Sell]</td>
                    <td>[Qty]</td>
                    <td>[Price]</td>
                </tr>
                <tr>
                    <td>[Product 2 Name]</td>
                    <td>[Rent/Sell]</td>
                    <td>[Qty]</td>
                    <td>[Price]</td>
                </tr>
            </tbody>
        </table>

        <h2>Shipping Address</h2>
        <p>[Customer's Name]<br>
        [Shipping Address Line 1]<br>
       </p>

        <h2>Payment Details</h2>
        <p><strong>Payment Method:</strong> [Payment Method]</p>
        <p><strong>Total Amount Paid:</strong> [Total Amount]</p>

        <p class="helpnote">If you have any questions or need assistance, feel free to reach out to our customer support team at <a href="mailto:[Support Email]">Rentbeandotin@gmail.com</a> or [Support Phone Number].</p>

        <div class="social-links">
            <p class="followline">Follow us on social media:</p>
            <a href="[Instagram Link]" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram">
            </a>
            <a href="[Facebook Link]" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/facebook.png" alt="Facebook">
            </a>
            <a href="[Twitter Link]" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/twitter.png" alt="Twitter">
            </a>
            <a href="[Pinterest Link]" target="_blank">
                <img src="https://img.icons8.com/fluency/48/000000/pinterest.png" alt="Pinterest">
            </a>
        </div>

        <div class="footer">
            <p>Warm regards,<br>
            Rentbean.in<br>
            <a href="https://rentbean.in">Visit site</a><br>
            [Contact Information]</p>
        </div>
    </div>
</body>
</html>
`,
        }}
      ></div> */}
      <Mobilenav />
    </>
  );
}
