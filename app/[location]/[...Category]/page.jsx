import React from "react";
import { notFound } from "next/navigation";
import Productcard from "@/app/_components/Productcard";
import {
  categorylist,
  domain,
  cities,
  citiesAndLocations,
} from "@/app/commondata";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Productnotfound from "@/app/_components/Productnotfound";
import Subcategories from "./_Components/Subcategories";
import { sortProducts, pricefilter } from "./_Components/sortandfilter";
import Productpage from "@/app/_productpage/Productpage";
// import Appliedfilters from "./_Components/Appliedfilters";
import Categorydescription from "./_Components/Categorydescription";

async function page({ params, searchParams }) {
  const { Category: slug, location } = await params;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;
  const subcat = slug && slug[1] ? decodeURIComponent(slug[1]) : null;
  const productid = slug && slug[2] ? decodeURIComponent(slug[2]) : null;

  // undefined location
  if (!cities.includes(location) && !citiesAndLocations.includes(location))
    notFound();

  if (productid)
    return (
      <Productpage
        category={category}
        subcat={subcat}
        productid={productid}
        location={location}
      />
    );

  // Get products
  let allproducts = await Cachedproducts();
  const pricerange = searchParams.pricerange || 0;
  let producttorender;

  const searchQuery = searchParams?.query?.replace(/-/g, " ");
  if (category == "Search") {
    producttorender = searchProducts(allproducts, searchQuery);
  } else {
    validateCategoryAndSubcategory(category, subcat);
    producttorender = categoriesedproducts(allproducts, category, subcat);
  }

  // Filter products
  const pricerangedproducts = pricefilter(producttorender, pricerange);

  const sortedProducts = sortProducts(
    pricerangedproducts,
    searchParams?.sort || 0
  );

  return (
    <>
      <div className="p-2 md:px-10">
        <Subcategories
          category={category}
          subcat={subcat}
          location={location}
        />
        {/* <Appliedfilters
          category={category}
          subcat={subcat}
          searchParams={searchParams}
        /> */}
        {category == "Search" && (
          <h1 className="text-center py-2 px-10 mb-10">
            Search - {"( " + searchQuery + " )"}
          </h1>
        )}
        {sortedProducts.length > 0 ? (
          <ProductGrid products={sortedProducts} location={location} />
        ) : (
          <Productnotfound />
        )}
      </div>
      <Categorydescription
        category={category}
        subcat={subcat}
        location={location.replace(/-/g, " ")}
      />
    </>
  );
}

const ProductGrid = ({ products, location }) => (
  <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(176px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] place-items-center gap-2 md:gap-5 mb-10">
    {products.map((item, i) => (
      <Productcard
        key={i + new Date().getMilliseconds() + Math.random()} // More stable key
        index={i}
        id={item._id}
        link={`/${location}/${item?.category}/${item?.subcat}/${item._id}`}
        image={item?.images[0]}
        {...item}
      />
    ))}
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
  const { Category: slug, location } = params;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;
  const subcat = slug && slug[1] ? decodeURIComponent(slug[1]) : null;
  const productid = slug && slug[2] ? decodeURIComponent(slug[2]) : null;

  // Handle product-specific metadata
  if (productid) {
    const allProducts = await Cachedproducts();
    const filteredProduct = allProducts.find((item) => item._id === productid);

    if (filteredProduct) {
      const ogImage = filteredProduct?.images[0] || null;
      return {
        title:
          filteredProduct?.seotitle != ""
            ? filteredProduct?.seotitle.replace(/location/gi, location)
            : `Rent ${filteredProduct?.name} | Rentbean`,
        description:
          filteredProduct?.seodescription != ""
            ? filteredProduct?.seodescription
            : "Check out this amazing product at Rentbean!",
        keywords:
          filteredProduct?.seokeywords != ""
            ? filteredProduct?.seokeywords
            : "Rent, Rentbean, Rentmojo , furlenco , Elctrons on rent , furniture on rent , treadmill on rent , mobile on rent , laptop on rent , ",
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
        title: `Rent ${subcat} in ${location} | ${new Date().getFullYear()}`,
        description:
          categoryData.desc || `Rent ${subcat} at the best prices online!`,
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
        title: `Rent ${
          categoryData?.name
        } in ${location} | ${new Date().getFullYear()}`,
        description:
          categoryData.desc ||
          `Rent ${categoryData?.name} and buy ${categoryData?.name} at best price in ${location}`,
        openGraph: {
          images: `${domain}${categoryData.image}`,
        },
      };
    }
  }

  // search
  if (category == "Search") {
    const searchQuery = searchParams?.query?.replace(/-/g, " ");
    return {
      title: `Rent ${searchQuery} in ${location} | ${new Date().getFullYear()}`,
      description: `Rent ${searchQuery} and buy at best price in ${location}`,
      openGraph: {
        images: `${domain}/logo&ui/minlogo.png`,
      },
    };
  }

  // Default fallback metadata
  return {
    title: "Rent electronics, furniture, party items and more",
    description: "Rent now and save money. Renr now for exclusive deals!",
    openGraph: {
      images: `${domain}/logo&ui/minlogo.png`,
    },
  };
};

export default page;
