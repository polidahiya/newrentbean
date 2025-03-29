const categoryComponents = {
  "Health-&-Fitness": category1,
  Electronic: category2,
  Furniture: category3,
  "Event-&-Parties": category4,
  Others: category5,
};

const subcategoryComponents = {};

function Categorydescription({ category, subcat, location }) {
  if (!category || category == "Search") return;
  const CategoryComponent = categoryComponents[category];
  const SubcatComponent = subcategoryComponents[subcat];

  return (
    <div className="text px-5 md:px-10 text-sm my-10 text-justify ">
      {/* {subcat ? (
        <SubcatComponent location={location} />
      ) : ( */}
      <CategoryComponent location={location} />
      {/* )} */}
    </div>
  );
}
function category1({ location }) {
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
function category2({ location }) {
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
function category3({ location }) {
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
function category4({ location }) {
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
function category5({ location }) {
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

export default Categorydescription;
