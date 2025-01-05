"use server";
import crypto from "crypto";
import { getcollection } from "@/app/Mongodb";
import sendMail from "@/app/_serveractions/Sendmail";
import { domain, sociallinks } from "@/app/commondata";

export async function POST(req) {
  try {
    const { orderscollection, ObjectId } = await getcollection();
    const formData = await req.formData();

    // Extract data from PayU response
    const txnId = formData.get("txnid");
    const mihpayid = formData.get("mihpayid"); // PayU transaction ID
    const amount = formData.get("amount");
    const productInfo = formData.get("productinfo");
    const firstName = formData.get("firstname");
    const email = formData.get("email");
    const status = formData.get("status");
    const hashReceived = formData.get("hash");

    // Your PayU credentials
    const key = process.env.PAYU_MERCHANT_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;

    // Create hash string for validation (following PayU's response hash format)
    const hashString = `${salt}|${status}|||||||||||${email}|${firstName}|${productInfo}|${amount}|${txnId}|${key}`;
    const hashCalculated = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    // Verify the hash
    if (hashCalculated === hashReceived) {
      if (status === "success") {
        const orderdetails = await orderscollection.findOneAndUpdate(
          { _id: new ObjectId(productInfo) },
          { $set: { paymentStatus: "success", txnId, mihpayid } }
        );

        sendconfirmationmail(orderdetails, amount);

        // Payment is valid and successful
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/cart?orderstatus=success",
          },
        });
      } else {
        // Payment failed
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/cart?orderstatus=failed",
          },
        });
      }
    } else {
      // Hash mismatch, possible tampering
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/cart?orderstatus=failed",
        },
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/cart?orderstatus=failed",
      },
    });
  }
}

const sendconfirmationmail = async (orderdetails, amount) => {
  const usermail = `
                                <!DOCTYPE html>
                                <html lang="en">
                                  <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                    <style>
                                      body {
                                        font-family: "Helvetica Neue", Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                      }
                                      .email-container {
                                        background-color: #ffffff;
                                        width: 100%;
                                        max-width: 600px;
                                        margin: 0 auto;
                                        border-radius: 10px;
                                        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                                      }
                                      .header {
                                        text-align: center;
                                        width: 100%;
                                        height: 250px;
                                        background-image: url("${domain}/images/desktophomepageimage.webp");
                                        background-size: cover;
                                        background-position: center;
                                        border-bottom: 1px solid #ddd;
                                        position: relative;
                                      }
                                      .header img {
                                        width: 150px;
                                        margin-top: 20px;
                                        position: relative;
                                        z-index: 1;
                                      }
                                      .content {
                                        padding: 20px;
                                        text-align: center;
                                      }
                                      .order-id {
                                        font-size: 18px;
                                        margin: 10px 0;
                                        color: #333;
                                      }
                                      .order-details {
                                        margin: 20px 0;
                                        text-align: left;
                                        font-size: 16px;
                                        color: #333;
                                      }
                                      .order-details table {
                                        width: 100%;
                                        border-collapse: collapse;
                                      }
                                      .order-details th,
                                      .order-details td {
                                        padding: 10px;
                                        border: 1px solid #ddd;
                                        text-align: left;
                                      }
                                      .order-details th {
                                        background-color: #f7f7f7;
                                        font-weight: bold;
                                      }
                                      .product-image {
                                        width: 80px;
                                        height: 80px;
                                        object-fit: cover;
                                        border-radius: 5px;
                                      }
                                      .order-button {
                                        display: inline-block;
                                        padding: 10px 30px;
                                        font-size: 18px;
                                        color: #007bff;
                                        border: 2px solid #007bff;
                                        border-radius: 50px;
                                        text-decoration: none;
                                        margin: 20px 0;
                                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                                      }
                                      .footer {
                                        padding: 20px;
                                        text-align: center;
                                        background-color: #f7f7f7;
                                        border-top: 1px solid #ddd;
                                        font-size: 14px;
                                        color: white;
                                        background: linear-gradient(110deg, #79818c, #263242);
                                      }
                                      .social-icons {
                                        margin-top: 10px;
                                      }
                                      .social-icons img {
                                        width: 30px;
                                        border-radius: 100%;
                                        margin: 0 10px;
                                      }
                                      .footer a {
                                        color: #007bff;
                                        text-decoration: none;
                                      }
                                      .footer a:hover {
                                        text-decoration: underline;
                                      }
                                    </style>
                                  </head>
                                
                                  <body>
                                    <div class="email-container">
                                      <div class="header">
                                        <img src="${domain}/logo&ui/3dlogo.png" alt="Rentbean Logo" />
                                      </div>
                                
                                      <div class="content">
                                        <h2>Order Confirmation</h2>
                                        <p>
                                          Thank you for your purchase! Your order has been confirmed and is
                                          being processed.
                                        </p>
                                
                                        <p class="order-id"><strong>Order ID:</strong> ${orderdetails?._id.toString()}</p>
                                
                                        <div class="order-details">
                                          <h3>Order Summary</h3>
                                          <table>
                                            <thead>
                                              <tr>
                                                <th>Product</th>
                                                <th>Image</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              ${orderdetails?.products
                                                .map(
                                                  (product) => `
                                              <tr>
                                                <td>${product.name}</td>
                                                <td>
                                                  <img
                                                    src="${
                                                      product.colorpalets[
                                                        product.selectedcolor
                                                      ].images[0]
                                                    }"
                                                    alt="${product.name}"
                                                    class="product-image"
                                                  />
                                                </td>
                                                <td>${product.quantity}</td>
                                                <td>Rs ${product.price}</td>
                                              </tr>
                                              `
                                                )
                                                .join("")}
                                            </tbody>
                                            <tfoot>
                                              <tr>
                                                <td colspan="3"><strong>Total</strong></td>
                                                <td><strong>RS ${amount}</strong></td>
                                              </tr>
                                            </tfoot>
                                          </table>
                                        </div>
                                              
                                        <a
                                          href="${domain}/orderdetails"
                                          class="order-button"
                                          >Track Your Order</a
                                        >
                                              
                                        <p>
                                          If you have any questions, feel free to
                                          <a href="${domain}/Contact">contact us</a>.
                                        </p>
                                      </div>
                                              
                                      <div class="footer">
                                        <p>Follow us on social media:</p>
                                        <div class="social-icons">
                                          <a href="${
                                            sociallinks.twitter
                                          }" target="_blank">
                                            <img src="${domain}/socialicons/xlogo.png" alt="X Logo" />
                                          </a>
                                          <a href="${
                                            sociallinks.insta
                                          }" target="_blank">
                                            <img
                                              src="${domain}/socialicons/instagramlogo.jpg"
                                              alt="Instagram Logo"
                                            />
                                          </a>
                                          <a href="${
                                            sociallinks.facebook
                                          }" target="_blank">
                                            <img
                                              src="${domain}/socialicons/facebooklogo.png"
                                              alt="Facebook Logo"
                                            />
                                          </a>
                                        </div>
                                        <p>Have any questions? <a href="${domain}/Contact">Contact us</a></p>
                                        <p>© 2024 Rentbean.in. All rights reserved.</p>
                                      </div>
                                    </div>
                                  </body>
                                </html>
  `;
  const adminmail = `
                                <!DOCTYPE html>
                                <html lang="en">
                                  <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                    <style>
                                      body {
                                        font-family: "Helvetica Neue", Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                      }
                                      .email-container {
                                        background-color: #ffffff;
                                        width: 100%;
                                        max-width: 600px;
                                        margin: 0 auto;
                                        border-radius: 10px;
                                        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                                      }
                                      .header {
                                        text-align: center;
                                        width: 100%;
                                        height: 250px;
                                        background-image: url("${domain}/images/desktophomepageimage.webp");
                                        background-size: cover;
                                        background-position: center;
                                        border-bottom: 1px solid #ddd;
                                        position: relative;
                                      }
                                      .header img {
                                        width: 150px;
                                        margin-top: 20px;
                                        position: relative;
                                        z-index: 1;
                                      }
                                      .content {
                                        padding: 20px;
                                        text-align: center;
                                      }
                                      .order-id {
                                        font-size: 18px;
                                        margin: 10px 0;
                                        color: #333;
                                      }
                                      .order-details {
                                        margin: 20px 0;
                                        text-align: left;
                                        font-size: 16px;
                                        color: #333;
                                      }
                                      .order-details table {
                                        width: 100%;
                                        border-collapse: collapse;
                                      }
                                      .order-details th,
                                      .order-details td {
                                        padding: 10px;
                                        border: 1px solid #ddd;
                                        text-align: left;
                                      }
                                      .order-details th {
                                        background-color: #f7f7f7;
                                        font-weight: bold;
                                      }
                                      .product-image {
                                        width: 80px;
                                        height: 80px;
                                        object-fit: cover;
                                        border-radius: 5px;
                                      }
                                      .order-button {
                                        display: inline-block;
                                        padding: 10px 30px;
                                        font-size: 18px;
                                        color: #007bff;
                                        border: 2px solid #007bff;
                                        border-radius: 50px;
                                        text-decoration: none;
                                        margin: 20px 0;
                                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                                      }
                                      .footer {
                                        padding: 20px;
                                        text-align: center;
                                        background-color: #f7f7f7;
                                        border-top: 1px solid #ddd;
                                        font-size: 14px;
                                        color: white;
                                        background: linear-gradient(110deg, #79818c, #263242);
                                      }
                                      .social-icons {
                                        margin-top: 10px;
                                      }
                                      .social-icons img {
                                        width: 30px;
                                        border-radius: 100%;
                                        margin: 0 10px;
                                      }
                                      .footer a {
                                        color: #007bff;
                                        text-decoration: none;
                                      }
                                      .footer a:hover {
                                        text-decoration: underline;
                                      }
                                    </style>
                                  </head>
                                
                                  <body>
                                    <div class="email-container">
                                      <div class="header">
                                        <img src="${domain}/logo&ui/3dlogo.png" alt="Rentbean Logo" />
                                      </div>
                                
                                      <div class="content">
                                        <h2>Order Confirmation</h2>
                                        <p>
                                         New order
                                        </p>
                                
                                        <p class="order-id"><strong>Order ID:</strong> ${orderdetails?._id.toString()}</p>
                                
                                        <div class="order-details">
                                          <h3>Order Summary</h3>
                                          <table>
                                            <thead>
                                              <tr>
                                                <th>Product</th>
                                                <th>Image</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              ${orderdetails?.products
                                                .map(
                                                  (product) => `
                                              <tr>
                                                <td>${product.name}</td>
                                                <td>
                                                  <img
                                                    src="${
                                                      product.colorpalets[
                                                        product.selectedcolor
                                                      ].images[0]
                                                    }"
                                                    alt="${product.name}"
                                                    class="product-image"
                                                  />
                                                </td>
                                                <td>${product.quantity}</td>
                                                <td>Rs ${product.price}</td>
                                              </tr>
                                              `
                                                )
                                                .join("")}
                                            </tbody>
                                            <tfoot>
                                              <tr>
                                                <td colspan="3"><strong>Total</strong></td>
                                                <td><strong>RS ${amount}</strong></td>
                                              </tr>
                                            </tfoot>
                                          </table>
                                        </div>
                                              
                                        <a
                                          href="${domain}/admin"
                                          class="order-button"
                                          >Go to admin page</a
                                        >
                                      </div>
                                              
                                      <div class="footer">
                                        <p>Follow us on social media:</p>
                                        <div class="social-icons">
                                          <a href="${
                                            sociallinks.twitter
                                          }" target="_blank">
                                            <img src="${domain}/socialicons/xlogo.png" alt="X Logo" />
                                          </a>
                                          <a href="${
                                            sociallinks.insta
                                          }" target="_blank">
                                            <img
                                              src="${domain}/socialicons/instagramlogo.jpg"
                                              alt="Instagram Logo"
                                            />
                                          </a>
                                          <a href="${
                                            sociallinks.facebook
                                          }" target="_blank">
                                            <img
                                              src="${domain}/socialicons/facebooklogo.png"
                                              alt="Facebook Logo"
                                            />
                                          </a>
                                        </div>
                                        <p>Have any questions? <a href="${domain}/Contact">Contact us</a></p>
                                        <p>© 2024 Rentbean.in. All rights reserved.</p>
                                      </div>
                                    </div>
                                  </body>
                                </html>
  `;

  await sendMail(
    orderdetails.userdata.email,
    "Order confirmation",
    "Order placed successfully",
    usermail
  );
  await sendMail(
    "Vs8287802215@gmail.com",
    "New Order",
    "We have a new order",
    adminmail
  );
};
