function selectedtenure(item) {
  const finaltenure =
    item?.location in item?.prices
      ? item?.prices[item?.location]
      : item?.prices.Default;
  return finaltenure[item?.selectedtenure];
}

export default selectedtenure;
