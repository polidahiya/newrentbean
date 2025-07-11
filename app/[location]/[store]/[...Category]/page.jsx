import React from "react";
import { notFound } from "next/navigation";
import {
  categorylist,
  domain,
  cities,
  citiesAndLocations,
} from "@/app/commondata";
import { Cachedproducts } from "@/app/_serveractions/Getcachedata";
import Productnotfound from "@/app/_components/Productnotfound";
import Subcategories from "./_Components/Subcategories";
import { sortProducts } from "./_Components/sortandfilter";
import Productpage from "@/app/_productpage/Productpage";
import Categorydescription from "./_Components/Categorydescription";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import Wrapper from "../Wrapper";
import Sort from "./_Components/Sort";
import { searchProducts } from "./_Components/Searchproducts";
import Heading from "./_Components/Heading";
import Productgrid from "./_Components/Productgrid";
import Productcard from "@/app/_components/Productcard";

async function page({ params, searchParams }) {
  const { Category: slug, location, store } = await params;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;
  const subcat = slug && slug[1] ? decodeURIComponent(slug[1]) : null;
  const productid = slug && slug[2] ? decodeURIComponent(slug[2]) : null;

  const { query, sort } = await searchParams;

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

  let producttorender;
  const searchQuery = query?.replace(/-/g, " ");
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
  const sortvalue = sort || 0;
  const sortedProducts = sortProducts(producttorender, sortvalue || 0);

  return (
    <Wrapper store={store}>
      <div className="p-2 md:px-10">
        <Subcategories
          category={category}
          subcat={subcat}
          location={location}
          store={store}
        />
        <div
          className={`pl-3 ${
            category == "Search" ? "mt-0" : "mt-5"
          } relative z-30`}
        >
          <Heading
            location={location}
            store={store}
            searchQuery={searchQuery}
            category={category}
          />
          {/* breadcrumbs */}
          <div className="flex items-center">
            <div className="opacity-70">
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
            <div className="flex-1 flex justify-end items-start">
              {store == "Buy" && <Sort sortvalue={sortvalue} />}
            </div>
          </div>
        </div>
        {sortedProducts.length > 0 ? (
          <Productgrid>
            {sortedProducts.map((item, i) => (
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
          </Productgrid>
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
  const { Category: slug, location, store } = await params;
  const category = slug && slug[0] ? decodeURIComponent(slug[0]) : null;
  const subcat = slug && slug[1] ? decodeURIComponent(slug[1]) : null;
  const productid = slug && slug[2] ? decodeURIComponent(slug[2]) : null;

  const { query } = await searchParams;
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
        alternates: {
          canonical: `${domain}/${location}/${store}/${category}/${subcat}/${productid}`,
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
        title: subCategoryData?.meta?.title[store]?.replace(
          /location/gi,
          location
        ),
        description: subCategoryData?.meta?.desc[store]?.replace(
          /location/gi,
          location
        ),
        keywords: subCategoryData?.meta?.keywords[store]?.replace(
          /location/gi,
          location
        ),
        openGraph: {
          images: `${domain}${subCategoryData.image}`,
        },
        alternates: {
          canonical: `${domain}/${location}/${store}/${category}/${subcat}`,
        },
      };
    }
  }

  // Handle category-specific metadata
  if (category && category !== "Search") {
    const categoryData = categorylist[category];

    if (categoryData) {
      return {
        title: categorylist[category]?.meta?.title[store]?.replace(
          /location/gi,
          location
        ),
        description: categorylist[category]?.meta?.desc[store]?.replace(
          /location/gi,
          location
        ),
        keywords: categorylist[category]?.meta?.keywords[store]?.replace(
          /location/gi,
          location
        ),
        openGraph: {
          images: `${domain}${categoryData.image}`,
        },
        alternates: {
          canonical: `${domain}/${location}/${store}/${category}`,
        },
      };
    }
  }

  // search
  if (category == "Search") {
    const searchQuery = query?.replace(/-/g, " ");
    return {
      title: `${store} ${searchQuery} in ${location} | ${new Date().getFullYear()}`,
      description: `${store} ${searchQuery} and buy at best price in ${location}`,
      openGraph: {
        images: `${domain}/logo&ui/minlogo.png`,
      },
      alternates: {
        canonical: `${domain}/${location}/${store}/Search?query=${searchQuery}`,
      },
    };
  }

  // Default fallback metadata
  return {
    title: `${store} electronics, furniture, party items and more`,
    description: `${store} now and save money. Rent now for exclusive deals!`,
    openGraph: {
      images: `${domain}/logo&ui/minlogo.png`,
    },
  };
};

export default page;
