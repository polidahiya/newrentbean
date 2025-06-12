function pricemaker(price, sign = "₹") {
  return sign + parseInt(price, 10).toLocaleString("en-IN");
}

export default pricemaker;
