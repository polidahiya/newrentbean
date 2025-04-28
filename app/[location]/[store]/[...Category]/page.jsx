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
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import Wrapper from "../Wrapper";

async function page({ params, searchParams }) {
  const { Category: slug, location, store } = await params;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;
  const subcat = slug && slug[1] ? decodeURIComponent(slug[1]) : null;
  const productid = slug && slug[2] ? decodeURIComponent(slug[2]) : null;

  // undefined location
  if (
    (!cities.includes(location) && !citiesAndLocations.includes(location)) ||
    !["Buy", "Rent"].includes(store)
  )
    notFound();

  let isrentalstore;
  if (store === "Rent") {
    isrentalstore = true;
  } else if (store === "Buy") {
    isrentalstore = false;
  }

  if (productid)
    return (
      <Wrapper store={store}>
        <Productpage
          category={category}
          subcat={subcat}
          productid={productid}
          location={location}
          store={store}
          isrentalstore={isrentalstore}
        />
      </Wrapper>
    );

  // Get products
  let allproducts = await Cachedproducts();
  const pricerange = searchParams.pricerange || 0;
  let producttorender;

  const searchQuery = searchParams?.query?.replace(/-/g, " ");
  if (category == "Search") {
    producttorender = searchProducts(allproducts, searchQuery, isrentalstore);
  } else {
    validateCategoryAndSubcategory(category, subcat);
    producttorender = categoriesedproducts(
      allproducts,
      category,
      subcat,
      isrentalstore
    );
  }

  // Filter products
  const pricerangedproducts = pricefilter(producttorender, pricerange);

  const sortedProducts = sortProducts(
    pricerangedproducts,
    searchParams?.sort || 0
  );

  return (
    <Wrapper store={store}>
      <div className="p-2 md:px-10">
        <Subcategories
          category={category}
          subcat={subcat}
          location={location}
          store={store}
        />
        <div className={`py-5 pl-3 ${category == "Search" && "mt-5 lg:mt-0"}`}>
          <h1 className="text-3xl font-semibold">
            {category == "Search"
              ? `Search (${store}) - ${searchQuery}`
              : category.replace(/-/g, " ")}
          </h1>
          <div className="opacity-70 my-2">
            <Breadcrumbs
              list={
                subcat
                  ? [
                      {
                        name: category,
                        link: `/${location}/${store}/${category}`,
                      },
                    ]
                  : []
              }
              currentroute={subcat ? subcat : category}
              location={location}
              store={store}
            />
          </div>
        </div>
        {/* <Appliedfilters
          category={category}
          subcat={subcat}
          searchParams={searchParams}
        /> */}
        {sortedProducts.length > 0 ? (
          <ProductGrid
            products={sortedProducts}
            location={location}
            store={store}
            isrentalstore={isrentalstore}
          />
        ) : (
          <Productnotfound
            location={location}
            store={store}
            category={category}
            subcat={subcat}
          />
        )}
      </div>
      <Categorydescription
        category={category}
        subcat={subcat}
        location={location.replace(/-/g, " ")}
        store={store}
      />
    </Wrapper>
  );
}

const ProductGrid = ({ products, location, store, isrentalstore }) => (
  <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(176px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] place-items-center gap-2 md:gap-5 mb-10">
    {products.map((item, i) => (
      <Productcard
        key={i}
        index={i}
        id={item._id}
        link={`/${location}/${store}/${item?.category}/${item?.subcat}/${item._id}`}
        image={item?.images[0]}
        isrentalstore={isrentalstore}
        location={location}
        {...item}
      />
    ))}
  </div>
);

function searchProducts(allproducts, searchQuery, isrentalstore) {
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

        const instore = isrentalstore
          ? ["Rent", "Both"].includes(product?.availablefor)
          : ["Buy", "Both"].includes(product?.availablefor);

        return (
          (nameMatch ||
            descMatch ||
            keywordsMatch ||
            categoryMatch ||
            subcategoryMatch ||
            idMatch) &&
          instore
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

const categoriesedproducts = (allproducts, category, subcat, isrentalstore) => {
  return allproducts.filter((item) => {
    const inCategory = item.category === category;
    const inSubcat = subcat ? item.subcat === subcat : true;
    const instore = isrentalstore
      ? ["Rent", "Both"].includes(item?.availablefor)
      : ["Buy", "Both"].includes(item?.availablefor);
    return inCategory && inSubcat && instore;
  });
};

export const generateMetadata = async ({ params, searchParams }) => {
  const { Category: slug, location, store } = params;
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
          store == "Rent"
            ? filteredProduct?.seotitle.replace(/location/gi, location)
            : filteredProduct?.buyseotitle?.replace(/location/gi, location) ||
              filteredProduct?.name,
        description:
          store == "Rent"
            ? filteredProduct?.seodescription
            : filteredProduct?.buyseodescription || "",
        keywords:
          store == "Rent"
            ? filteredProduct?.seokeywords
            : filteredProduct?.buyseokeywords || "",
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
        title: `${store} ${subcat} in ${location} | ${new Date().getFullYear()}`,
        description:
          categoryData.desc || `${store} ${subcat} at the best prices online!`,
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
        title: `${store} ${
          categoryData?.name
        } in ${location} | ${new Date().getFullYear()}`,
        description:
          categoryData.desc ||
          `${store} ${categoryData?.name} and buy ${categoryData?.name} at best price in ${location}`,
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
      title: `${store} ${searchQuery} in ${location} | ${new Date().getFullYear()}`,
      description: `${store} ${searchQuery} and buy at best price in ${location}`,
      openGraph: {
        images: `${domain}/logo&ui/minlogo.png`,
      },
    };
  }

  // Default fallback metadata
  return {
    title: `${store} electronics, furniture, party items and more`,
    description: `${store} now and save money. Renr now for exclusive deals!`,
    openGraph: {
      images: `${domain}/logo&ui/minlogo.png`,
    },
  };
};

export default page;
