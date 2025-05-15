export const selectedtenure = (item, location) => {
  const finaltenure =
    location in item.prices ? item.prices[location] : item.prices.Default;
  return { selected: finaltenure[item.selectedtenure], all: finaltenure };
};
