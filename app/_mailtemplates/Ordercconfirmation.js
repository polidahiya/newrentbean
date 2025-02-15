import { sociallinks } from "../commondata";
import FormattedDate from "../_components/_helperfunctions/Formateddate";

function Ordercconfirmation(order) {
  const { userdata, _id, createdAt, products, paymentMethod } = order;
  const orderdate = FormattedDate(createdAt);

  const productsdetails = products
    .map((product) => {
      const {
        name,
        isrentalstore,
        quantity,
        prices,
        buyprice,
        location,
        selectedtenure,
        securitydeposit,
      } = product;
      const locationrentprices =
        location in prices ? prices[location] : prices?.Default;
      const tenure = locationrentprices[selectedtenure];
      return `<tr>
                 <td>${name}</td>
                 <td> ${isrentalstore ? "Rent" : "Buy"}</td>
                 <td>${quantity}</td>
                 <td>${
                   isrentalstore ? tenure?.time + "" + tenure?.type : "_"
                 } </td>
                  <td>${
                    isrentalstore
                      ? `₹${parseInt(
                          securitydeposit * quantity,
                          10
                        ).toLocaleString("en-IN")}/-`
                      : "_"
                  }</td>
                 <td>${`₹${parseInt(
                   (isrentalstore ? tenure?.price : buyprice) * quantity,
                   10
                 ).toLocaleString("en-IN")}/-`}</td>
             </tr>`;
    })
    .join("");

  return `
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 20px;
      }
      h1 {
        color: #d68e43;
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
        margin-top: 20px;
      }
      .thankyou {
        margin-top: 20px;
      }
      h2 {
        margin-top: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th,
      td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #f2f2f2;
      }
      .helpnote {
        margin-top: 20px;
        font-size: smaller;
        text-align: center;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #777;
        text-align: center;
      }
      .followline {
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
        <img
          src="http://localhost:3000/banners/banner1-mod.jpg"
          alt="Banner Image"
        />
      </div>

      <h1>Your Order Has Been Successfully Placed! 🎉</h1>
      <p>Hi ${userdata?.username},</p>
      <p class="thankyou">
        Thank you for choosing Rentbean.in! We’re excited to let you know that
        your order has been successfully placed and is now being processed.
        Below are the details of your purchase:
      </p>

      <h2>Order Summary</h2>
      <p><strong>Order ID:</strong> ${_id}</p>
      <p><strong>Order Date:</strong> ${orderdate}</p>
      <h2>Product Details</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Tenure</th>
            <th>Security Deposit</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
         ${productsdetails}
        </tbody>
      </table>

      <h2>Shipping Address</h2>
      <p>
        ${userdata?.username}<br />
        ${userdata?.address}<br />
      </p>

      <h2>Payment Details</h2>
      <p><strong>Payment Method:</strong> ${
        paymentMethod == "online" ? "Online" : "Cash on Delivery"
      }</p>
      <p><strong>Total Amount Paid:</strong> [Total Amount]</p>

      <p class="helpnote">
        If you have any questions or need assistance, feel free to reach out to
        our customer support team at
        <a href="mailto:[Support Email]">Rentbeandotin@gmail.com</a> or [Support
        Phone Number].
      </p>

      <div class="social-links">
        <p class="followline">Follow us on social media:</p>
        <a href="${
          sociallinks?.insta
        }" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/fluency/48/000000/instagram-new.png"
            alt="Instagram"
          />
        </a>
        <a href="${
          sociallinks?.facebook
        }" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/fluency/48/000000/facebook.png"
            alt="Facebook"
          />
        </a>
        <a href="${
          sociallinks?.twitter
        }" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/fluency/48/000000/twitter.png"
            alt="Twitter"
          />
        </a>
        <a href="${
          sociallinks?.pinterest
        }" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/fluency/48/000000/pinterest.png"
            alt="Pinterest"
          />
        </a>
      </div>

      <div class="footer">
        <p>
          Warm regards,<br />
          Rentbean.in<br />
          <a href="https://rentbean.in">Visit site</a><br />
          [Contact Information]
        </p>
      </div>
    </div>
  </body>
</html>
`;
}

export default Ordercconfirmation;
