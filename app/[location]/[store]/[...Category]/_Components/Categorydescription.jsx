import Link from "next/link";

const categoryComponents = {
  "Health-&-Fitness": category1,
  Electronic: category2,
  Furniture: category3,
  "Event-&-Parties": category4,
  Others: category5,
};

const subcatcomponents = {
  "Fitness-Machines": subcat1,
  "Gym-Equipments": subcat17,
  "Medical-Equipments": subcat2,
  Entertainment: subcat3,
  Laptops: subcat4,
  "Mobile-&-Accessories": subcat5,
  "Home-Appliances": subcat6,
  Beds: subcat7,
  "Study-Tables": subcat8,
  Dining: subcat9,
  Bookshelves: subcat10,
  Sofas: subcat11,
  "Center-Tables": subcat12,
  Wardrobe: subcat13,
  "Party-Items": subcat14,
  "Baby-Care": subcat15,
  "Camping-Gear": subcat16,
};

function Categorydescription({ category, subcat, location, store }) {
  if (!category || category === "Search") return null;
  const CategoryComponent = categoryComponents[category];
  const SubcatComponent = subcatcomponents[subcat];

  return (
    <div className="text px-5 md:px-10 text-sm  my-10 text-justify">
      {subcat ? (
        <SubcatComponent location={location} store={store} />
      ) : (
        <CategoryComponent location={location} store={store} />
      )}
    </div>
  );
}

// category1 - Fitness Equipment on Rent
// Meta Description: Rent high-quality fitness equipment like treadmills, exercise cycles, and cross trainers in {location} with affordable plans and doorstep delivery.
// Keywords: fitness equipment rental, treadmill on rent, gym equipment on rent, exercise cycle rental, fitness machines {location}, affordable gym rentals
function category1({ location, store }) {
  return (
    <div>
      <h1>Fitness Equipment on Rent in {location}</h1>
      <p>
        Looking for high-quality{" "}
        <strong>fitness equipment on rent in {location}</strong>? You&#39;ve
        come to the right place! We offer a wide range of{" "}
        <strong>gym equipment</strong>, including <strong>treadmills</strong>,{" "}
        <strong>exercise cycles</strong>, <strong>cross trainers</strong>,{" "}
        <strong>spin bikes</strong>, <strong>recumbent bikes</strong>,{" "}
        <strong>air bikes</strong>, and more. Whether you need a{" "}
        <strong>treadmill for home use</strong> or gym equipment for your
        fitness center, we provide affordable and flexible rental options to
        suit your needs.
      </p>
      <p>
        Our inventory includes <strong>top brands</strong> and well-maintained
        fitness machines, ensuring a seamless workout experience. From{" "}
        <strong>treadmills on rent</strong> to <strong>cross trainers</strong>{" "}
        and <strong>exercise cycles</strong>, we cater to all your fitness
        requirements. Whether you&#39;re in <strong>{location}</strong> or
        nearby areas, our <strong>delivery and setup services</strong> make it
        easy to get started.
      </p>
      <p>
        Why buy when you can rent? Enjoy the convenience of renting{" "}
        <strong>gym equipment</strong> without the hassle of maintenance.
        Perfect for <strong>home use</strong>, <strong>commercial gyms</strong>,
        or temporary fitness needs, our rental services are designed to help you
        stay fit without breaking the bank. Explore our range of{" "}
        <strong>treadmills</strong>, <strong>exercise cycles</strong>, and other{" "}
        <strong>gym equipment on rent in {location}</strong> today!
      </p>
      <p>
        Contact us now to find the best{" "}
        <strong>fitness equipment rental deals in {location}</strong> and take
        the first step towards achieving your fitness goals.
      </p>
    </div>
  );
}

// category2 - Affordable Rentals (Electronics)
// Meta Description: Affordable rentals in {location} - laptops, mobiles (iPhone, Samsung), and home appliances like ACs, fridges, and washing machines with flexible plans.
// Keywords: laptop on rent {location}, mobile rental, iPhone on rent, Samsung mobile rental, home appliances rental, AC on rent, fridge rental
function category2({ location, store }) {
  return (
    <div>
      <h1>
        Affordable Rentals in {location} - Laptops, Mobiles, Home Appliances &
        More
      </h1>
      <p>
        Looking for <strong>laptop on rent in {location}</strong>? We offer a
        wide range of laptops for rent, including options for{" "}
        <strong>personal use</strong>, <strong>students</strong>, and{" "}
        <strong>budget-friendly rentals under 500</strong>. Whether you need a
        laptop for a day, a week, or a month, we have flexible rental plans to
        suit your needs.
      </p>
      <p>
        Need a <strong>mobile on rent in {location}</strong>? Choose from top
        brands like <strong>Samsung</strong> and <strong>iPhone</strong>. We
        provide affordable mobile rentals for short-term or long-term use.
        Whether you&#39;re in {location} for business or leisure, our{" "}
        <strong>iPhone rental</strong> and{" "}
        <strong>Samsung mobile on rent</strong> services are here to help.
      </p>
      <p>
        Upgrade your home with our{" "}
        <strong>home appliances on rent in {location}</strong>. From{" "}
        <strong>washing machines</strong> to <strong>fridges</strong> and{" "}
        <strong>ACs</strong>, we offer{" "}
        <strong>cheap home appliances on rent</strong> to make your life easier.
        Whether you need a <strong>window AC on rent</strong>, a{" "}
        <strong>split AC on rent</strong>, or a{" "}
        <strong>mini fridge on rent</strong>, we have you covered.
      </p>
      <p>
        Our rental services are perfect for those looking for{" "}
        <strong>AC on rent monthly basis</strong>,{" "}
        <strong>fridge on rent for one month</strong>, or{" "}
        <strong>washing machine on rent in {location}</strong>. We also provide{" "}
        <strong>commercial fridge on rent</strong> for businesses. With flexible
        pricing and convenient delivery options, renting appliances in{" "}
        {location} has never been easier.
      </p>
      <p>
        Explore our wide range of rental options today and find the perfect
        solution for your needs in {location}. Whether you&#39;re looking for{" "}
        <strong>iPhone on rent for one day</strong>,{" "}
        <strong>laptop on rent for students</strong>, or{" "}
        <strong>home appliances on rent</strong>, we’ve got you covered. Contact
        us now for the best <strong>rental prices in {location}</strong>!
      </p>
    </div>
  );
}

// category3 - Furniture on Rent
// Meta Description: Rent affordable and premium furniture in {location} - beds, sofas, study tables, wardrobes, and more with flexible rental options.
// Keywords: furniture on rent {location}, bed rental, sofa on rent, study table rental, wardrobe on rent, cheap furniture rental
function category3({ location, store }) {
  return (
    <div>
      <h1>Affordable and Premium Furniture on Rent in {location}</h1>
      <p>
        Looking for <strong>furniture on rent</strong> in {location}? We offer a
        wide range of high-quality and <strong>cheap furniture on rent</strong>{" "}
        to meet your needs. Whether you need{" "}
        <strong>bedroom furniture on rent</strong>, a{" "}
        <strong>single bed on rent</strong>, or a{" "}
        <strong>double bed on rent</strong>, we have you covered. Our collection
        includes <strong>sofa on rent</strong>,{" "}
        <strong>study table on rent</strong>, <strong>bookshelf on rent</strong>
        , and even <strong>office table on rent</strong>.
      </p>
      <p>
        Need furniture for a short duration? No problem! We provide flexible
        rental options, including <strong>bed on rent for 1 month</strong> and{" "}
        <strong>sofa on rent for one day</strong>. Our{" "}
        <strong>wooden bookshelf on rent</strong> and{" "}
        <strong>wooden center table on rent</strong> add a touch of elegance to
        your space. Whether you&#39;re looking for a{" "}
        <strong>wardrobe for rent</strong>, a <strong>mirror on rent</strong>,
        or a <strong>dining center table on rent</strong>, we have the perfect
        solution for you.
      </p>
      <p>
        Choose us for the <strong>best furniture rental in {location}</strong>.
        Our services are designed to make your life easier, offering premium
        furniture at affordable prices. Rent a <strong>study table</strong>,{" "}
        <strong>coffee table</strong>, or <strong>book shelf</strong> today and
        transform your living space!
      </p>
    </div>
  );
}

// category4 - Premium Rental Services (Events & Parties)
// Meta Description: Premium rental services in {location} - hookahs, tents, DJ lights, barbeques, beer towers, and water dispensers for parties and events.
// Keywords: rental services {location}, hookah on rent, tent rental, DJ lights rental, barbeque on rent, beer tower rental, water dispenser rental
function category4({ location, store }) {
  return (
    <div>
      <h1>Premium Rental Services in {location}</h1>
      <p>
        Looking for the best rental services in {location}? You&#39;ve come to
        the right place! We offer a wide range of premium rental options to
        cater to all your needs. Whether you&#39;re planning a party, a camping
        trip, or a special event, we have you covered.
      </p>
      <h2>Hookah on Rent</h2>
      <p>
        Enjoy a luxurious experience with our premium{" "}
        <strong>Hookah on Rent</strong> services. We provide high-quality
        hookahs with a variety of flavors to choose from. Our{" "}
        <strong>Hookah on Rent home delivery</strong> service ensures that you
        get your hookah delivered right to your doorstep. Whether you&#39;re in{" "}
        {location} or nearby areas, we offer competitive{" "}
        <strong>Hookah on Rent prices</strong> to make your experience
        affordable and enjoyable.
      </p>
      <h2>Tent on Rent</h2>
      <p>
        Planning an outdoor event or a camping trip? Our{" "}
        <strong>Tent on Rent</strong> services are perfect for you. We offer a
        variety of tents including <strong>4-person tents</strong>,{" "}
        <strong>trekking tents</strong>, <strong>gazebo tents</strong>, and{" "}
        <strong>canopy tents</strong>. Our <strong>tent rent prices</strong> are
        budget-friendly, and we ensure timely delivery and setup in {location}{" "}
        and surrounding areas.
      </p>
      <h2>DJ Lights and Decoration Lights on Rent</h2>
      <p>
        Make your event unforgettable with our{" "}
        <strong>DJ lights on rent</strong> and{" "}
        <strong>decoration lights on rent</strong>. We provide a wide range of
        lighting options including <strong>laser lights</strong> and{" "}
        <strong>Diwali lights</strong> to create the perfect ambiance. Whether
        you&#39;re in {location} or nearby, our <strong>light on rent</strong>{" "}
        services are just a call away.
      </p>
      <h2>Barbeque on Rent</h2>
      <p>
        Host the perfect BBQ party with our <strong>Barbeque on Rent</strong>{" "}
        services. We offer a variety of BBQ sets, including{" "}
        <strong>tandoor on rent</strong> and <strong>barbeque grill</strong>{" "}
        options. Our services are available in {location} and nearby areas,
        ensuring you have everything you need for a sizzling BBQ experience.
      </p>
      <h2>Beer Tower on Rent</h2>
      <p>
        Add a fun twist to your party with our{" "}
        <strong>beer tower on rent</strong> services. We offer{" "}
        <strong>Kingfisher Beer Towers</strong> at competitive prices. Whether
        you&#39;re in {location} or nearby, our beer towers are perfect for any
        celebration. Check out our <strong>beer tower quantity</strong> options
        to find the perfect fit for your event.
      </p>
      <h2>Water Dispenser on Rent</h2>
      <p>
        Stay hydrated with our <strong>water dispenser on rent</strong>{" "}
        services. We offer <strong>Voltas water dispensers</strong> and{" "}
        <strong>electric water dispensers</strong> that provide both hot and
        cold water. Our <strong>water cooler rental prices</strong> are
        affordable, and we ensure timely delivery in {location} and surrounding
        areas.
      </p>
      <p>
        No matter what you&#39;re looking for, our rental services in {location}{" "}
        are designed to make your life easier. Contact us today to book your
        rentals and enjoy a hassle-free experience!
      </p>
    </div>
  );
}

// category5 - Baby Gear and Camping Equipment
// Meta Description: Rent baby gear (car seats, strollers, cots) and camping equipment (tents, gear) in {location} - affordable, sanitized, and convenient.
// Keywords: baby gear rental {location}, camping equipment rental, baby car seat on rent, stroller rental, camping tent rental, affordable rentals
function category5({ location, store }) {
  return (
    <div>
      <h1>Baby Gear and Camping Equipment on Rent in {location}</h1>
      <p>
        Ensure your little one&#39;s safety and comfort with our premium baby
        car seats for rent. Designed with the highest standards of safety in
        mind, our rental car seats offer peace of mind for parents on the go.
        Whether you&#39;re traveling or simply need a temporary solution, our
        baby car seats provide a secure and cozy ride for your precious cargo.
      </p>
      <p>
        Looking for baby gear or camping equipment on rent in {location}?
        You&#39;ve come to the right place! We offer a wide range of
        high-quality, affordable rental services including baby car seats, baby
        carriers, baby strollers, baby cots, camping tents, trekking tents,
        canopy tents, gazebo tents, and all essential camping gear. Whether you
        need a baby car seat for a short trip or camping gear for an outdoor
        adventure, we have you covered. Our products are sanitized,
        well-maintained, and available at competitive rental prices. Book now
        and enjoy a hassle-free experience with our convenient rental services
        in {location}.
      </p>
      <h2>Why Choose Us?</h2>
      <ul>
        <li>Affordable rental prices</li>
        <li>High-quality, sanitized products</li>
        <li>Wide range of baby gear and camping equipment</li>
        <li>Convenient pickup and delivery options</li>
        <li>Flexible rental durations</li>
      </ul>
      <p>
        Whether you&#39;re a parent looking for baby gear or an adventurer in
        need of camping equipment, we provide reliable and affordable rental
        solutions in {location}. Explore our services today and make your life
        easier!
      </p>
    </div>
  );
}

// subcat1 - Fitness & Massage Equipment
// Meta Description: Rent fitness equipment (treadmills, gym bikes) and massage gear (foot massagers, chairs) in {location} with flexible, affordable plans.
// Keywords: treadmill on rent {location}, gym bike rental, massage equipment rental, exercise cycle on rent, bicycle rental, fitness gear rental
function subcat1({ location, store }) {
  return (
    <div className="text">
      <h1>Get Fitness & Massage Equipment on Rent in {location}</h1>
      <p>
        Looking for a treadmill on rent near {location}? We provide top-quality
        treadmills for rent in Delhi, Gurgaon, Noida, and across India. Whether
        you need a treadmill on rent for home use or a gym bike on rent near{" "}
        {location}, we have the perfect solution for you.
      </p>
      <p>
        Our range includes exercise cycles on rent in Delhi, gym equipment on
        rent in Gurgaon, spin bikes for rent, and elliptical cross trainers on
        rent near {location}. Stay fit without investing in expensive
        equipment—rent it instead!
      </p>
      <p>
        Apart from fitness gear, we also offer massage equipment on rent.
        Whether you need a calf massager on rent near {location}, a foot
        massager on rent near Delhi, or even an electric massage chair in Delhi,
        we have options to suit your needs.
      </p>
      <p>
        Looking for a bicycle on rent near {location}? Get a bicycle for rent in
        Gurgaon, Noida, or even for a month in Delhi. Find the best cycle rental
        services, including the Delhi cycle rent app and cycle rental in
        Ghaziabad.
      </p>
      <p>
        Choose from our affordable and flexible rental options for fitness and
        wellness equipment in {location}. Contact us today and start your
        fitness journey without the hassle of ownership!
      </p>
    </div>
  );
}

// subcat2 - Medical Equipment Rental
// Meta Description: Rent medical equipment in {location} - oxygen cylinders, concentrators, wheelchairs, and patient beds at affordable prices with fast delivery.
// Keywords: medical equipment rental {location}, oxygen cylinder on rent, wheelchair rental, patient bed rental, oxygen concentrator rental
function subcat2({ location, store }) {
  return (
    <div className="text">
      <h1>Medical Equipment Rental in {location}</h1>
      <p>
        Looking for an <strong>Oxygen Cylinder on Rent in {location}</strong>?
        We provide affordable{" "}
        <strong> Oxygen Cylinders on rent near you</strong>, ensuring
        high-quality medical support. Get the best{" "}
        <strong>Oxygen Cylinder on Rent Price</strong> and explore our services
        in <strong> Delhi, Gurgaon, Faridabad, and Noida</strong>. We also offer{" "}
        <strong>Gas Cylinders on Rent in Delhi</strong> and{" "}
        <strong> LPG Cylinders on Rent</strong> at competitive rates.
      </p>
      <p>
        Need an <strong>Oxygen Concentrator on Rent near {location}</strong>?
        Choose from our range, including{" "}
        <strong>10-Liter Oxygen Concentrators</strong>, at the best prices.
        Available in <strong> Faridabad, Delhi, Gurgaon, and Noida</strong>, we
        ensure fast and reliable delivery.
      </p>
      <p>
        Find <strong>Wheelchairs on Rent near {location}</strong>, including{" "}
        <strong>Foldable</strong> and <strong> Electric Wheelchairs</strong>, at
        budget-friendly prices. Whether in{" "}
        <strong> Delhi, Gurgaon, or Dwarka</strong>, we provide high-quality
        mobility solutions.
      </p>
      <p>
        Looking for a <strong>Patient Bed on Rent near {location}</strong>? We
        provide <strong> Manual and Motorized Beds</strong>, including{" "}
        <strong>Recliner Beds</strong>, at the best{" "}
        <strong>Hospital Bed on Rent Prices</strong>. Available in{" "}
        <strong> Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad</strong>.
      </p>
    </div>
  );
}

// subcat3 - Gaming Consoles and Hoverboards
// Meta Description: Rent PS4, PS5, and hoverboards in {location} - affordable gaming and entertainment options with flexible rental plans.
// Keywords: PS4 on rent {location}, PS5 rental, hoverboard on rent, gaming console rental, entertainment rentals
function subcat3({ location, store }) {
  return (
    <div className="text">
      <h1>Gaming Consoles and Hoverboards on Rent in {location}</h1>
      <p>
        Looking for a <strong>PS4 on rent near {location}</strong>? Get the best
        deals for renting a PlayStation 4 in <strong>{location}</strong> and
        nearby areas. Whether you need a <strong>PS4 on rent in Delhi</strong>,{" "}
        <strong>PS4 on rent in India</strong>, or{" "}
        <strong>PS4 on rent in Gurgaon</strong>, we have you covered. We also
        provide <strong>PS4 on rent in Noida</strong> and other cities.
      </p>
      <p>
        If you&#39;re interested in next-gen gaming, we also offer{" "}
        <strong>PS5 on rent</strong>. Find a{" "}
        <strong>PS5 on rent near {location}</strong> with popular games like GTA
        5. Whether you need a <strong>PS5 on rent in Delhi</strong>,{" "}
        <strong>PS5 on rent in India</strong>,{" "}
        <strong>PS5 on rent in Gurgaon</strong>, or a{" "}
        <strong>PS5 on rent in Noida</strong>, we have flexible rental options
        to suit your needs. Planning a trip? We even offer{" "}
        <strong>PS5 on rent in Jaipur</strong>.
      </p>
      <p>
        Beyond gaming, we also provide{" "}
        <strong>hoverboards on rent near {location}</strong>. Get a{" "}
        <strong>hoverboard on rent near Delhi</strong> or{" "}
        <strong>hoverboard on rent near Faridabad, Haryana</strong>. Looking for
        a <strong>hoverboard on rent near me</strong>? We offer affordable
        rental plans. If you&#39;re considering purchasing one, check the latest{" "}
        <strong>hoverboard price</strong> options available.
      </p>
      <p>
        Explore a wide range of self-balancing scooters, including the{" "}
        <strong>hoverboard scooter</strong>,{" "}
        <strong>hoverboard for adults</strong>, and even{" "}
        <strong>hoverboard cycles</strong>. Get the best deals for short-term
        and long-term rentals today!
      </p>
    </div>
  );
}

// subcat4 - Laptops on Rent
// Meta Description: Rent laptops (Dell, HP) in {location} for students, professionals, or gaming - affordable daily, monthly plans with doorstep delivery.
// Keywords: laptop on rent {location}, Dell laptop rental, HP laptop on rent, gaming laptop rental, laptop for students, affordable laptop rental
function subcat4({ location, store }) {
  if (store === "Buy") {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Refurbished Laptops in ${location}`,
      description: `Shop certified refurbished laptops in ${location} under 5000, 10000, and 20000. Get Dell, HP, Lenovo, and Mac with 1-year warranties.`,
      brand: ["Dell", "HP", "Lenovo", "Apple"],
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: "5000",
        availability: "https://schema.org/InStock",
      },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Are refurbished laptops in ${location} reliable?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes, our refurbished laptops in ${location} undergo rigorous testing and come with 1-year warranties, ensuring like-new performance from brands like Dell, HP, and Lenovo.`,
          },
        },
        {
          "@type": "Question",
          name: `Do you offer refurbished gaming laptops in ${location}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Absolutely! We provide high-performance refurbished gaming laptops in ${location}, featuring brands like Dell and Lenovo, perfect for gamers on a budget.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the warranty on used laptops in ${location}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Our used laptops in ${location} come with 1-year warranties, ensuring peace of mind with every purchase from Rentbean.`,
          },
        },
      ],
    };

    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <h1>Premium Refurbished Laptops in {location}</h1>
        <p>
          Discover top-quality refurbished laptops at Rentbean, the best place
          for <strong>second-hand laptops in {location}</strong> and across
          India! Browse certified pre-owned laptops from leading brands like{" "}
          <Link href={`/${location}/${store}/Search?query=dell`}>Dell</Link>,{" "}
          <Link href={`/${location}/${store}/Search?query=hp`}>HP</Link>,
          <Link href={`/${location}/${store}/Search?query=lenovo`}>Lenovo</Link>
          ,{" "}
          <Link href={`/${location}/${store}/Search?query=thinkpad`}>
            ThinkPad
          </Link>
          , and <Link href={`/${location}/${store}/Search?query=mac`}>Mac</Link>
          , tailored for work,
          <Link href={`/${location}/${store}/Search?query=gaming`}>gaming</Link>
          , or studies. Score unbeatable deals on{" "}
          <strong>refurbished laptops under 15000 and 20000</strong>, outshining
          platforms like Flipkart, Amazon, and OLX, or find local gems in{" "}
          {location}. Our <strong>used laptops in {location}</strong>
          under 5000 and 10000 come with <strong>1-year warranties</strong>,
          rigorous quality checks, and like-new performance. Searching for{" "}
          <strong>refurbished gaming laptops</strong> or budget-friendly options
          near you? We provide <strong>doorstep delivery</strong>, easy EMI, and
          up to <strong>75% savings</strong>. Ideal for students, professionals,
          and gamers, our curated collection guarantees reliability and value.
          Shop now at Rentbean for the best{" "}
          <strong>
            refurbished and second-hand laptop deals in {location}
          </strong>
          !
        </p>
        <div>
          <h2>Frequently Asked Questions</h2>
          <div>
            <h3>Are refurbished laptops in {location} reliable?</h3>
            <p>
              Yes, our refurbished laptops in {location} undergo rigorous
              testing and come with 1-year warranties, ensuring like-new
              performance from brands like Dell, HP, and Lenovo.
            </p>
          </div>
          <div>
            <h3>Do you offer refurbished gaming laptops in {location}?</h3>
            <p>
              Absolutely! We provide high-performance refurbished gaming laptops
              in {location}, featuring brands like Dell and Lenovo, perfect for
              gamers on a budget.
            </p>
          </div>
          <div>
            <h3>What is the warranty on used laptops in {location}?</h3>
            <p>
              Our used laptops in {location} come with 1-year warranties,
              ensuring peace of mind with every purchase from Rentbean.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text">
      <h1>Laptop on Rent in {location}</h1>
      <p>
        Looking for a <strong>laptop on rent near {location}</strong>? Whether
        you&#39;re a student, professional, or gamer, we offer a variety of
        rental options. Get a{" "}
        <strong>Dell laptop on rent near {location}</strong> or choose from top
        brands like HP, available for short-term or long-term rentals. If
        you&#39;re in <strong>Delhi, Gurgaon, or Faridabad</strong>, you can
        easily rent a laptop with a small deposit.
      </p>
      <p>
        We provide flexible rental plans including{" "}
        <strong>laptop rent for 1 month</strong> or even on a daily basis.
        Whether you need a{" "}
        <strong>coding laptop on rent near {location}</strong> for programming
        or a high-performance{" "}
        <strong>gaming laptop on rent near {location}</strong>, we have you
        covered. Choose an affordable option with{" "}
        <strong>laptop on rent near me under 500</strong> or find premium models
        for professional use.
      </p>
      <p>
        Searching for <strong>laptop rental price</strong>? Our pricing is
        competitive, with various plans to suit your needs. If you&#39;re near{" "}
        <strong>Nehru Place</strong> or require a{" "}
        <strong>laptop on rent in Gurgaon</strong>, we provide doorstep
        delivery. Get an{" "}
        <strong>HP laptop on rent near Faridabad, Haryana</strong> or anywhere
        across India without any credit check.
      </p>
      <p>
        Whether you need a <strong>laptop on rent for personal use</strong>, a{" "}
        <strong>laptop on rent for students</strong>, or just a{" "}
        <strong>laptop on rent for a day</strong>, we ensure a seamless rental
        experience. Rent now and get the best laptops at the most affordable
        prices!
      </p>
    </div>
  );
}

// subcat5 - Mobile Phones on Rent
// Meta Description: Rent mobile phones (iPhone, Samsung) in {location} for short or long-term use - affordable, flexible plans with doorstep delivery.
// Keywords: mobile on rent {location}, iPhone rental, Samsung Galaxy on rent, phone rental near me, affordable mobile rental
function subcat5({ location, store }) {
  return (
    <div className="text">
      <h1>Mobile Phone on Rent Near {location}</h1>
      <p>
        Looking for a <strong>mobile phone on rent near {location}</strong>?
        Whether you&#39;re in <strong>Faridabad, Haryana</strong>,{" "}
        <strong>Delhi</strong>, <strong>Noida</strong>, or even{" "}
        <strong>Pune</strong>, we have a wide range of smartphones available for
        rental. From the latest <strong>iPhone on rent</strong> to high-end{" "}
        <strong> Samsung Galaxy on rent</strong>, you can choose from a variety
        of options to suit your needs.
      </p>
      <p>
        Need a phone for a short duration? You can{" "}
        <strong>rent a phone for a month</strong> or even opt for an{" "}
        <strong>iPhone on rent for one day</strong>. Our services extend to
        individuals and businesses looking for reliable{" "}
        <strong>iPhone rental near me</strong>. For Apple enthusiasts, we
        provide exclusive <strong>iPhone on rent in Delhi</strong> and{" "}
        <strong>iPhone on rent near Faridabad, Haryana</strong>.
      </p>
      <p>
        Samsung users can benefit from our{" "}
        <strong>Samsung rental program</strong>, offering the latest models like
        the <strong>Samsung Galaxy on rent in Bangalore</strong> or the premium{" "}
        <strong>Samsung S23 Ultra</strong>. If you&#39;re searching for a{" "}
        <strong>Samsung Galaxy on rent near Delhi</strong> or{" "}
        <strong>Faridabad, Haryana</strong>, we have you covered.
      </p>
      <p>
        Whether you need an <strong>iPhone on rent in India</strong> or a{" "}
        <strong>Samsung mobile phone on rent</strong>, our services cater to all
        your rental needs. Just search for <strong>Phone on Rent</strong> or{" "}
        <strong>Rent a mobile phone near me</strong> and find the perfect rental
        option in {location}.
      </p>
    </div>
  );
}

// subcat6 - Appliance and AC Rentals
// Meta Description: Rent home appliances (fridges, ACs, washing machines) in {location} - affordable monthly plans with doorstep delivery.
// Keywords: fridge on rent {location}, AC rental, washing machine on rent, home appliance rental, inverter on rent, RO rental
function subcat6({ location, store }) {
  return (
    <div className="text">
      <h1>Appliance and AC Rentals in {location}</h1>
      <p>
        Looking for a <strong>fridge on rent near {location}</strong>? We offer
        a variety of options, including <strong>small fridges on rent</strong>{" "}
        and <strong>commercial fridges on rent</strong> in{" "}
        <strong>Delhi, Faridabad, Gurugram, and surrounding areas</strong>.
        Whether you need a <strong>fridge on rent for one month</strong> or a
        long-term rental, we have you covered.
      </p>
      <p>
        Get an <strong>AC on rent per month</strong> in {location}. We provide{" "}
        <strong>window AC on rent</strong>, <strong>standing AC on rent</strong>
        , <strong>tower AC on rent</strong>, and{" "}
        <strong>portable AC on rent</strong>. Looking to{" "}
        <strong>buy AC on rent</strong>? Check our flexible plans for{" "}
        <strong>
          AC rental in Ballabgarh, Faridabad, Delhi, and nearby locations
        </strong>
        .
      </p>
      <p>
        Need a <strong>washing machine on rent near {location}</strong>? We
        offer rentals in{" "}
        <strong>
          Faridabad, Delhi, Gurugram, Noida, Greater Noida, Ghaziabad, and Karol
          Bagh
        </strong>
        . Choose from top brands and get a hassle-free rental experience.
      </p>
      <p>
        Get an <strong>inverter on rent near {location}</strong>. Whether you
        are in <strong>Faridabad, Gurgaon, Noida, Delhi, or Ghaziabad</strong>,
        we provide affordable inverter rentals, including brands like{" "}
        <strong>RentoMojo</strong>.
      </p>
      <p>
        Looking for a <strong>RO on rent near {location}</strong>? We offer{" "}
        <strong>Kent RO on rent</strong>, <strong>Aquaguard RO on rent</strong>,
        and <strong>Livpure RO on rent</strong> in{" "}
        <strong>Faridabad, Gurgaon, Delhi, and nearby locations</strong>. Get a{" "}
        <strong>water purifier on rent</strong> at affordable rates.
      </p>
    </div>
  );
}

// subcat7 - Beds on Rent
// Meta Description: Rent beds (single, double, king size) in {location} - affordable, flexible options with mattresses and doorstep delivery.
// Keywords: bed on rent {location}, single bed rental, double bed on rent, king size bed rental, mattress on rent, furniture rental
function subcat7({ location, store }) {
  return (
    <div className="text">
      <h1>Bed on Rent Near {location}</h1>
      <p>
        Looking for a <strong>bed on rent near {location}</strong>? We offer a
        variety of rental options, including <strong>single bed on rent</strong>
        , <strong>double bed on rent</strong>, and{" "}
        <strong>king size bed on rent near {location}</strong>. Whether you need
        a <strong>bed on rent for 1 month</strong> or longer, we provide the
        best solutions to fit your needs.
      </p>
      <p>
        Our services are available in multiple locations, including{" "}
        <strong>bed on rent in Delhi</strong>,{" "}
        <strong>bed on rent in Gurgaon</strong>, and nearby areas. We also offer{" "}
        <strong>folding bed on rent</strong>, perfect for temporary stays, and{" "}
        <strong>bed with mattress on rent in Delhi</strong> for added comfort.
      </p>
      <p>
        If you&#39;re looking for a{" "}
        <strong>queen size bed on rent near {location}</strong> or a{" "}
        <strong>solid wood bed on rent near {location}</strong>, we have
        high-quality options for you. Our collection includes{" "}
        <strong>double solid wood beds on rent</strong>, ensuring durability and
        elegance. Additionally, we provide{" "}
        <strong>mattress on rent per day</strong> for those who need short-term
        comfort solutions.
      </p>
      <p>
        No matter your requirement— <strong>single bed on rent near me</strong>,{" "}
        <strong>double bed on rent</strong>, or even a{" "}
        <strong>folding bed on rent near me</strong>—we make it easy for you to
        find the perfect bed rental option. Rent a bed today and enjoy
        hassle-free service at an affordable price.
      </p>
    </div>
  );
}

// subcat8 - Study Tables on Rent
// Meta Description: Rent study tables in {location} - ergonomic, affordable options for students and professionals with doorstep delivery.
// Keywords: study table on rent {location}, furniture rental, study table and chair rental, affordable study table rental
function subcat8({ location, store }) {
  return (
    <div className="text">
      <h1>Study Table on Rent in {location}</h1>
      <p>
        Looking for a <strong>study table on rent near {location}</strong>? We
        offer high-quality study tables for rent at affordable prices. Whether
        you need a <strong>study table on rent in Faridabad, Haryana</strong>,{" "}
        <strong>Delhi</strong>, <strong>Noida</strong>, <strong>Gurgaon</strong>
        , or <strong>Ghaziabad</strong>, we have got you covered.
      </p>
      <p>
        Get a comfortable and ergonomic{" "}
        <strong>study table and chair on rent in {location}</strong> to enhance
        your productivity. Our rental service ensures flexibility,
        affordability, and convenience, making it easier for students and
        professionals to set up a perfect study or work-from-home space.
      </p>
      <p>
        Searching for <strong>study table on rent near me</strong>? We provide
        doorstep delivery and hassle-free rental plans. Choose from a variety of
        designs and sizes to suit your needs.
      </p>
      <p>
        Rent today and experience a seamless furniture rental service in{" "}
        {location}!
      </p>
    </div>
  );
}

// subcat9 - Dining Tables on Rent
// Meta Description: Rent dining tables (2, 4, 6-seater) in {location} - affordable, stylish options for your home with doorstep delivery.
// Keywords: dining table on rent {location}, 4-seater dining table rental, 6-seater dining table on rent, furniture rental
function subcat9({ location, store }) {
  return (
    <div className="text">
      <h1>Dining Table on Rent in {location}</h1>
      <p>
        Looking for a dining table on rent near {location}? We offer a variety
        of options including 2-seater, 4-seater, and 6-seater dining tables for
        rent. Whether you need a dining table on rent in Delhi, Gurgaon, Noida,
        Bangalore, Hyderabad, or Faridabad, we have you covered.
      </p>
      <p>
        Get high-quality dining tables for rent near you. Our services include
        dining on rent near Faridabad, Haryana, and other major cities. You can
        find furniture on rent in Faridabad, study tables on rent, and more.
        Choose from a variety of options like Dining Table 4 Seater and Dining
        Table 6 Seater.
      </p>
      <p>
        If you are searching for a 2-seater dining table on rent near {location}{" "}
        or a 4-seater dining table on rent near {location}, we provide flexible
        rental options. Similarly, for larger needs, we also offer 6-seater
        dining tables on rent in {location}.
      </p>
      <p>
        Experience hassle-free furniture rental with us. Whether you need a
        dining table for rent near you or in a specific city like Delhi, Noida,
        Gurgaon, Hyderabad, or Bangalore, we have the perfect solution for your
        home needs.
      </p>
    </div>
  );
}

// subcat10 - Bookshelves on Rent
// Meta Description: Rent bookshelves in {location} - wooden, stylish storage solutions at affordable rates with doorstep delivery.
// Keywords: bookshelf on rent {location}, wooden bookshelf rental, furniture rental, affordable bookshelf rental
function subcat10({ location, store }) {
  return (
    <div className="text">
      <h1>Bookshelf on Rent Near {location}</h1>
      <p>
        Find the perfect bookshelf on rent near {location}, whether you need a
        sturdy wooden bookshelf, a spacious cupboard for storage, or even a
        stylish lamp to enhance your space. We provide rental services in Delhi,
        Faridabad, Ahmedabad, and other locations. Rent a high-quality bookshelf
        at affordable prices and enjoy the convenience of flexible rental
        options.
      </p>
    </div>
  );
}

// subcat11 - Sofas on Rent
// Meta Description: Rent sofas (2-seater, 3-seater, L-shape) in {location} - affordable, stylish options for homes and events with doorstep delivery.
// Keywords: sofa on rent {location}, 2-seater sofa rental, L-shape sofa on rent, furniture rental, wedding sofa rental
function subcat11({ location, store }) {
  return (
    <div className="text">
      <h1>Furniture and Sofa Rental in {location}</h1>
      <p>
        Looking for a <strong>sofa set on rent near {location}</strong>? We
        offer the best <strong>furniture on rent</strong>, including{" "}
        <strong>sofa on rent for one day</strong> and long-term rentals. Whether
        you need a <strong>sofa on rent in Delhi</strong>,{" "}
        <strong>sofa on rent Noida</strong>, or{" "}
        <strong>furniture on rent in Faridabad</strong>, we have you covered.
      </p>
      <p>
        Hosting a special event? Get a <strong>wedding sofa on rent</strong>.
        Need a <strong>2-seater sofa on rent near {location}</strong> or a{" "}
        <strong>3-seater sofa on rent near {location}</strong>? We provide
        comfortable and stylish furniture for every occasion. Rent{" "}
        <strong>cheap furniture in Delhi</strong> or explore{" "}
        <strong>the best furniture rental services in Delhi</strong> for
        high-quality pieces.
      </p>
      <p>
        We also offer <strong>L-shape sofa on rent near {location}</strong> and{" "}
        <strong>L-shape sofa on rent in Hyderabad</strong>. Whether you&#39;re
        in Gurgaon, Noida, Faridabad, or anywhere else, you can{" "}
        <strong>rent furniture</strong> hassle-free. Looking for{" "}
        <strong>Pepperfry furniture on rent in Delhi</strong>? We have options
        available!
      </p>
      <p>
        Get the best deals on <strong>sofa on rent</strong> and find the perfect
        furniture for your home, office, or event. Contact us today and furnish
        your space effortlessly!
      </p>
    </div>
  );
}

// subcat12 - Center Tables on Rent
// Meta Description: Rent center tables (wooden, circular, square) in {location} - affordable, stylish options for homes and offices with doorstep delivery.
// Keywords: center table on rent {location}, wooden table rental, dining table on rent, office table rental, furniture rental
function subcat12({ location, store }) {
  return (
    <div className="text">
      <h1>Table on Rent in {location}</h1>
      <p>
        Looking for a center table on rent near {location}? We offer a variety
        of tables including wooden center tables, small center tables, dining
        center tables, study tables, and sofa tables for rent. Whether you need
        a square center table on rent near {location} or a circular center table
        on rent near you, we have the perfect table for your needs.
      </p>
      <p>
        Our rental services also include office tables, foldable tables, and
        chair tables, making it easy to find the right table for your workspace
        or event. If you are in {location}, you can also rent a recliner or a
        dining table at affordable rates.
      </p>
      <p>
        We provide high-quality wooden circular center tables and round center
        tables on rent in {location}, perfect for any setting. Whether
        you&#39;re looking for a table on rent in Delhi, Gurgaon, or Hyderabad,
        our services extend to multiple locations.
      </p>
      <p>
        Need chairs on rent for a party? We’ve got you covered with a wide range
        of options. Rent a table today and enjoy convenience and affordability
        with our reliable rental services.
      </p>
    </div>
  );
}

// subcat13 - Wardrobes on Rent
// Meta Description: Rent wardrobes (sliding, 3-door, single-door) in {location} - affordable storage solutions with doorstep delivery.
// Keywords: wardrobe on rent {location}, sliding wardrobe rental, furniture rental, affordable wardrobe rental
function subcat13({ location, store }) {
  return (
    <div className="text">
      <h1>Wardrobe on Rent Near {location}</h1>
      <p>
        Looking for a wardrobe on rent near {location}? We provide a variety of
        wardrobes, including sliding wardrobes, 3-door wardrobes, and
        single-door wardrobes. Whether you&#39;re in Faridabad, Delhi, Gurgaon,
        Noida, or Ghaziabad, our rental services ensure you get the best
        wardrobe at an affordable price.
      </p>
    </div>
  );
}

// subcat14 - Party Items on Rent
// Meta Description: Rent party items (DJ lights, hookahs, beer towers, barbeques) in {location} - affordable, premium options for events with delivery.
// Keywords: party items on rent {location}, DJ lights rental, hookah on rent, beer tower rental, barbeque rental, event rentals
function subcat14({ location, store }) {
  return (
    <div className="text">
      <h1>Find Rental Services Near {location}</h1>
      <p>
        Looking for rental services in {location}? Get the best deals on DJ
        lights, Diwali lights, decoration lights, and laser lights for your
        events. We provide DJ lights on rent near Faridabad, Haryana, and other
        locations, ensuring you have the perfect setup for your celebrations.
      </p>
      <p>
        Need a hookah for your party? We offer hookah on rent near Delhi,
        Faridabad, and other locations with home delivery options available.
        Check out our hookah rental prices and get the best rates in Gurgaon and
        Pune.
      </p>
      <p>
        Stay hydrated with our water dispensers available for rent. Whether you
        need an electric dispenser, a Voltas water dispenser, or a water
        dispenser on rent near Noida, we have got you covered.
      </p>
      <p>
        Hosting a party? Get beer towers on rent near Delhi, Faridabad, and
        other cities. Whether you&#39;re planning an event in Hyderabad,
        Gurgaon, or Pune, we provide high-quality beer dispensers to keep your
        guests refreshed.
      </p>
      <p>
        Enjoy a sizzling BBQ experience with our barbeque rentals. Whether
        you&#39;re in Delhi, Pune, Gurgaon, Chennai, Hyderabad, Chandigarh, or
        any other location, we offer top-quality barbeque grills for rent to
        make your gatherings special.
      </p>
      <p>
        No matter your rental needs, we have you covered with the best services
        in {location}. Contact us today to book your rentals!
      </p>
    </div>
  );
}

// subcat15 - Baby Care Items on Rent
// Meta Description: Rent baby gear (car seats, cots, strollers) in {location} - safe, affordable options for parents with doorstep delivery.
// Keywords: baby car seat on rent {location}, baby cot rental, stroller on rent, baby gear rental, affordable baby rentals
function subcat15({ location, store }) {
  return (
    <div className="text">
      <h1>Baby Car Seat, Baby Cot, and Stroller Rentals in {location}</h1>
      <p>
        Looking for a baby car seat on rent near {location}? We offer baby car
        seats on rent in Faridabad, Haryana, Delhi, Pune, Bangalore, Mumbai, and
        other cities. Whether you need a baby car seat rental near you or in a
        specific location, we provide high-quality, safe, and affordable
        options.
      </p>
      <p>
        Our baby cot rental services are available near you, ensuring your
        little one gets a comfortable sleep. If you need a baby carrier on rent
        near {location}, we have a range of options for your convenience. Get a
        baby stroller on rent in Faridabad, Haryana, Delhi, Jaipur, Pune, Goa,
        Mumbai, and Hyderabad with easy booking and doorstep delivery.
      </p>
      <p>
        Whether you&#39;re traveling or need a temporary solution, our baby gear
        rentals provide the perfect convenience. Rent a baby stroller, car seat,
        or baby cot at an affordable price in {location} and other major cities.
      </p>
    </div>
  );
}

// subcat16 - Camping & Event Equipment on Rent
// Meta Description: Rent camping gear (tents, sleeping bags) and event items (chairs) in {location} - affordable, quality options with delivery.
// Keywords: tent on rent {location}, camping equipment rental, sleeping bag on rent, chairs for rent, event equipment rental
function subcat16({ location, store }) {
  return (
    <div className="text">
      <h1>Camping & Event Equipment on Rent Near {location}</h1>
      <p>
        Looking for a <strong>tent on rent near {location}</strong>? We provide
        high-quality <strong> camping tents for rent in {location}</strong> to
        make your outdoor experience comfortable. Whether you need a{" "}
        <strong>4-person tent on rent</strong> or a{" "}
        <strong>camping tent on rent near you</strong>, we have a variety of
        options to choose from.
      </p>
      <p>
        If you are planning a trip and need{" "}
        <strong>sleeping bags on rent near {location}</strong>, we offer premium{" "}
        <strong>Decathlon sleeping bags</strong> for a cozy night outdoors. Get
        the best <strong>camping equipment on rent near {location}</strong>{" "}
        without any hassle.
      </p>
      <p>
        Hosting a party or an event? We offer{" "}
        <strong>chairs on rent for a day near {location}</strong>. Get{" "}
        <strong>folding chairs on rent near {location}</strong> or{" "}
        <strong>plastic chairs on rent near {location}</strong>
        at affordable prices. Whether you need{" "}
        <strong>chairs on rent for a party</strong> or a{" "}
        <strong>chair on rent in Delhi</strong>, we have you covered.
      </p>
    </div>
  );
}

function subcat17({ location, store }) {
  if (store == "Buy") {
    return (
      <div className="text">
        <h1>Buy Gym Equipment in {location} – Build Your Ultimate Home Gym</h1>

        <p>
          Looking for a trusted <strong>gym equipment shop near you</strong> in{" "}
          {location}? Discover a wide range of{" "}
          <strong>home gym equipment</strong> perfect for strength training,
          cardio, and fitness routines. We offer everything you need, including{" "}
          <strong>dumbbells sets (5kg, 10kg, 20kg)</strong> and sturdy{" "}
          <strong>barbell rods</strong> (5 feet and 7 feet).
        </p>

        <h3>Top Products You Can Buy:</h3>
        <ul>
          <li>
            <strong>Home gym equipment all-in-one</strong> setups
          </li>
          <li>
            <strong>Gym weight racks</strong> for home gyms
          </li>
          <li>
            <strong>Weight holders</strong> and storage solutions
          </li>
          <li>
            <strong>Decathlon gym equipment</strong> and premium brands
          </li>
          <li>
            <strong>Multi-purpose gym storage racks</strong> to organize your
            weights
          </li>
        </ul>

        <p>
          Wondering <strong>what is the weight of a rod in the gym</strong>? We
          stock gym rods weighing <strong>20 kg</strong> and provide complete
          details to match your training needs. Get durable gym rods with or
          without plates — ideal for all fitness levels.
        </p>

        <h3>Why Buy From Us?</h3>
        <ul>
          <li>Affordable gym equipment under $500</li>
          <li>Quality-tested products from top brands</li>
          <li>Expert advice to build your perfect home gym</li>
          <li>Fast delivery and setup assistance in {location}</li>
        </ul>

        <p>
          Invest in your fitness journey today with the best{" "}
          <strong>gym equipment in {location}</strong>. Create a space where
          goals are crushed and dreams are built — starting right from your
          home!
        </p>
      </div>
    );
  }
  return (
    <div className="text">
      <h1>
        Rent Gym Equipment in {location} – Affordable and Flexible Options
      </h1>

      <p>
        Looking to set up a fitness zone at home in {location} without a heavy
        investment? We offer premium <strong>gym equipment for rent</strong> at
        unbeatable prices. Choose from our wide range of{" "}
        <strong>dumbbell gym equipment</strong>, including{" "}
        <strong>dumbbell sets of 5kg, 10kg, and 20kg</strong> — perfect for
        beginners and pros alike.
      </p>

      <h3>Our Rental Collection Includes:</h3>
      <ul>
        <li>
          <strong>Home gym equipment all-in-one</strong> packages
        </li>
        <li>
          <strong>Barbell rods</strong> — available in 5 feet and 7 feet sizes
        </li>
        <li>
          <strong>Gym rods with plates</strong> and{" "}
          <strong>weight holders</strong>
        </li>
        <li>
          <strong>Multi-purpose gym storage racks</strong> for easy organization
        </li>
        <li>
          <strong>Decathlon gym equipment</strong> and other top brands
        </li>
      </ul>

      <p>
        Whether you need a simple <strong>dumbbell rack</strong> or a complete{" "}
        <strong>home gym setup</strong>, we've got you covered. Get top brands
        and reliable equipment delivered at your doorstep in {location},
        starting under $500!
      </p>

      <h3>Why Rent From Us?</h3>
      <ul>
        <li>Low upfront cost</li>
        <li>Flexible rental plans</li>
        <li>Quick delivery and pickup</li>
        <li>Well-maintained, sanitized gym equipment</li>
      </ul>

      <p>
        Don't wait! Build your dream gym space with{" "}
        <strong>home gym equipment rental in {location}</strong> today. Achieve
        your fitness goals without the commitment of ownership!
      </p>
    </div>
  );
}

export default Categorydescription;
