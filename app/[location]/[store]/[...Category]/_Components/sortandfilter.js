export const sortProducts = (products, sort) => {
  if (sort == 1) {
    return products.sort((a, b) => {
      return parseFloat(a.buyprice) - parseFloat(b.buyprice);
    });
  }
  if (sort == 2) {
    return products.sort((a, b) => {
      return parseFloat(b.buyprice) - parseFloat(a.buyprice);
    });
  }
  return products;
};

export const pricefilter = (products, pricerange) => {
  return products.filter((item) => {
    const withinPriceRange =
      pricerange === 0 ||
      (item.price >= filterlist[pricerange].min &&
        item.price <= filterlist[pricerange].max);

    return withinPriceRange;
  });
};
