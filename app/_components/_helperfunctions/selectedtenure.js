import { AppContextfn } from "@/app/Context";

export function selectedtenure(item) {
  const { location } = AppContextfn();
  const finaltenure =
    location?.location in item?.prices
      ? item?.prices[location?.location]
      : item?.prices.Default;
  return finaltenure[item?.selectedtenure];
}
export function fixedselectedtenure(item) {
  const finaltenure =
    item?.location in item?.prices
      ? item?.prices[item?.location]
      : item?.prices.Default;
  return finaltenure[item?.selectedtenure];
}
