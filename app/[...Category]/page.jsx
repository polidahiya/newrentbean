import React from "react";
import { notFound } from "next/navigation";
import Productcard from "../_components/Productcard";
import Secondnav from "./_Components/Secondnav";
import { categorylist, domain } from "../commondata";
import { Cachedproducts } from "../_serveractions/Getcachedata";
import Productnotfound from "../_components/Productnotfound";
import Subcategories from "./_Components/Subcategories";
import { sortProducts, pricefilter } from "./_Components/sortandfilter";
import Productpage from "../_productpage/Productpage";
import Appliedfilters from "./_Components/Appliedfilters";
import Categorydescription from "./_Components/Categorydescription";

async function page({ params, searchParams }) {
  const { Category: slug } = params;

  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;
  const subcat = slug && slug[1] ? decodeURIComponent(slug[1]) : null;
  const productid = slug && slug[2] ? decodeURIComponent(slug[2]) : null;

  const location = searchParams?.location?.replace(/-/g, " ") || "Delhi";

  if (productid)
    return (
      <Productpage
        category={category}
        subcat={subcat}
        productid={productid}
        color={searchParams?.color || 0}
      />
    );

  // Get products
  let allproducts = await Cachedproducts();
  const pricerange = searchParams.pricerange || 0;
  let producttorender;

  if (category == "Search") {
    const searchQuery = searchParams?.query?.replace(/-/g, " ");
    producttorender = searchProducts(allproducts, searchQuery);
  } else {
    validateCategoryAndSubcategory(category, subcat);
    producttorender = categoriesedproducts(allproducts, category, subcat);
  }

  // Filter products
  const pricerangedproducts = pricefilter(producttorender, pricerange);

  const sortedProducts = sortProducts(
    pricerangedproducts,
    searchParams.sort || 0
  );

  const lengthofproducts = sortedProducts.length;

  return (
    <>
      <div className="flex flex-col lg:flex-row p-[10px] gap-[10px]">
        <Secondnav
          category={category}
          subcat={subcat}
          searchParams={searchParams}
          lengthofproducts={lengthofproducts}
        />
        <div className="w-full lg:w-[calc(100%-250px)]">
          <Subcategories category={category} subcat={subcat} />
          <Appliedfilters
            category={category}
            subcat={subcat}
            searchParams={searchParams}
          />
          {sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} />
          ) : (
            <Productnotfound />
          )}
        </div>
      </div>
      <Categorydescription
        category={category}
        subcat={subcat}
        location={location}
      />
    </>
  );
}

const ProductGrid = ({ products }) => (
  <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-[10px] md:gap-[20px]">
    {products.map((item, i) =>
      item.colorpalets.map((_, j) => (
        <Productcard
          key={i + new Date().getMilliseconds() + Math.random()} // More stable key
          index={i}
          id={item._id}
          link={`/${item?.category}/${item?.subcat}/${item._id}?color=${j}`}
          image={item.colorpalets[j]?.images[0]}
          {...item}
        />
      ))
    )}
  </div>
);

function searchProducts(allproducts, searchQuery) {
  const words = searchQuery?.split(" ") || [];

  // Filtering products based on the search query
  words.forEach((word) => {
    if (word.trim() !== "") {
      allproducts = allproducts.filter((product) => {
        const nameMatch = product?.name
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const descMatch = product?.desc?.some((descItem) =>
          descItem.toLowerCase().includes(word.toLowerCase())
        );

        const keywordsMatch = product?.keywords
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const categoryMatch = product?.category
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const subcategoryMatch = product?.subcat
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const idMatch = product?._id
          ?.toLowerCase()
          .includes(word.toLowerCase());

        return (
          nameMatch ||
          descMatch ||
          keywordsMatch ||
          categoryMatch ||
          subcategoryMatch ||
          idMatch
        );
      });
    }
  });

  // Sorting the filtered products
  return allproducts.sort((a, b) => {
    const nameA = a?.name?.toLowerCase();
    const nameB = b?.name?.toLowerCase();
    const lowerQuery = searchQuery?.toLowerCase();

    if (nameA.includes(lowerQuery) && !nameB.includes(lowerQuery)) {
      return -1;
    } else if (!nameA.includes(lowerQuery) && nameB.includes(lowerQuery)) {
      return 1;
    } else {
      return 0;
    }
  });
}

const validateCategoryAndSubcategory = (category, subcat) => {
  if (!category || !Object.keys(categorylist).includes(category)) {
    notFound();
  }

  if (
    subcat &&
    !categorylist[category].subcat.some((item) => item.name === subcat)
  ) {
    notFound();
  }
};

const categoriesedproducts = (allproducts, category, subcat) => {
  return allproducts.filter((item) => {
    const inCategory = item.category === category;
    const inSubcat = subcat ? item.subcat === subcat : true;
    return inCategory && inSubcat;
  });
};

export const generateMetadata = async ({ params, searchParams }) => {
  const { Category: slug } = params;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;
  const subcat = slug && slug[1] ? decodeURIComponent(slug[1]) : null;
  const productid = slug && slug[2] ? decodeURIComponent(slug[2]) : null;
  const location = searchParams?.location?.replace(/-/g, " ") || "India";

  // Handle product-specific metadata
  if (productid) {
    const allProducts = await Cachedproducts();
    const filteredProduct = allProducts.find((item) => item._id === productid);

    if (filteredProduct) {
      const colorIndex = searchParams?.color || 0;
      const ogImage =
        filteredProduct?.colorpalets?.[colorIndex]?.images?.[0] || null;

      return {
        title: `${filteredProduct?.name} | Adorefurnix`,
        description:
          filteredProduct?.desc?.[0] ||
          "Check out this amazing product at Adorefurnix!",
        keywords: filteredProduct?.keywords || "",
        openGraph: {
          images: ogImage,
        },
      };
    }
  }

  // Handle subcategory-specific metadata
  if (subcat && category) {
    const categoryData = categorylist[category];
    if (categoryData) {
      const subCategoryData = categoryData.subcat.find(
        (item) => item.name === subcat
      );

      return {
        title: `Get ${subcat} at Best Price Online in ${location} | ${new Date().getFullYear()}`,
        description:
          categoryData.desc || `Shop ${subcat} at the best prices online!`,
        openGraph: {
          images: subCategoryData ? `${domain}${subCategoryData.image}` : null,
        },
      };
    }
  }

  // Handle category-specific metadata
  if (category && category !== "Search") {
    const categoryData = categorylist[category];

    if (categoryData) {
      return {
        title: `Get ${
          categoryData?.name
        } at Best Price Online in ${location} | ${new Date().getFullYear()}`,
        description:
          categoryData.desc || `Shop ${categoryData?.name} and decor online.`,
        openGraph: {
          images: `${domain}${categoryData.image}`,
        },
      };
    }
  }

  // Default fallback metadata
  return {
    title: "Adorefurnix | Best Furniture & Home Decor Online",
    description:
      "Discover the best furniture and home decor at Adorefurnix. Shop now for exclusive deals!",
    openGraph: {
      images: `${domain}/minlogo.png`,
    },
  };
};

export default page;

// name
// category
// subcat
// sku
// image
// quatity
// available
// trash
// description
// location:{
//   rentprice
// }
// seo
