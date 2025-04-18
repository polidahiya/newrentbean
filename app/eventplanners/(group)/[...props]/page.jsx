import { categories } from "../../commondata";

const BirthdayPartyService = async ({ params }) => {
  const { props } = await params;
  const category = props && props[0] ? decodeURIComponent(props[0]) : null;
  const subcat = props && props[1] ? decodeURIComponent(props[1]) : null;
  const supsubcat = props && props[2] ? decodeURIComponent(props[2]) : null;

  const selectcategory =
    (supsubcat && categories[category]?.subcat[subcat]?.subcat[supsubcat]) ||
    (subcat && categories[category]?.subcat[subcat]) ||
    (category && categories[category]);

  return (
    <>
      <style>
        {`
          .bgimage {
            background-image: url('${selectcategory?.images[0] || ""}');
          }

          @media (min-width: 1024px) {
            .bgimage {
              background-image: url('${selectcategory?.images[1] || ""}');
            }
          }
        `}
      </style>
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 font-sans">
        {/* Hero Section */}
        <section
          className="bgimage relative bg-cover bg-center h-[700px] lg:min-h-[720px] lg:max-h-[720px] flex items-center justify-center"
          style={{
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
              {selectcategory?.heading}
            </h1>
            <p className="text-xl md:text-2xl mt-4 font-semibold">
              {selectcategory?.subheading}
            </p>
            <a
              href="#booking"
              className="mt-6 inline-block bg-pink-500 text-white py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300"
            >
              Book Your Party Now!
            </a>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 px-4 md:px-16 bg-white">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-lg shadow-md text-center">
              <span className="text-4xl mb-4 block">🎉</span>
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                Customized Themes
              </h3>
              <p className="text-gray-700">
                From superheroes to princesses, we create personalized themes
                tailored to your vision.
              </p>
            </div>
            <div className="bg-pink-50 p-8 rounded-lg shadow-md text-center">
              <span className="text-4xl mb-4 block">🍰</span>
              <h3 className="text-2xl font-semibold text-pink-700 mb-4">
                All-Inclusive Planning
              </h3>
              <p className="text-gray-700">
                Venue, catering, decorations, and entertainment—we handle every
                detail.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg shadow-md text-center">
              <span className="text-4xl mb-4 block">📸</span>
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                Memorable Experiences
              </h3>
              <p className="text-gray-700">
                Photo booths, live performances, and more to make your party
                unforgettable.
              </p>
            </div>
          </div>
        </section>

        {/* Party Packages */}
        <section className="py-16 px-4 md:px-16 bg-gradient-to-r from-yellow-100 to-orange-100">
          <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
            Our Party Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                Classic Celebration
              </h3>
              <p className="text-3xl font-bold text-pink-500 mb-4">$499</p>
              <ul className="text-gray-700 text-left space-y-2">
                <li>✔ Basic decorations</li>
                <li>✔ 2-hour venue rental</li>
                <li>✔ Cake and snacks</li>
                <li>✔ Up to 20 guests</li>
              </ul>
              <a
                href="#booking"
                className="mt-6 inline-block bg-purple-500 text-white py-2 px-6 rounded-full hover:bg-purple-600 transition duration-300"
              >
                Choose Package
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-4 border-pink-500 relative">
              <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                Deluxe Party
              </h3>
              <p className="text-3xl font-bold text-pink-500 mb-4">$799</p>
              <ul className="text-gray-700 text-left space-y-2">
                <li>✔ Custom theme decorations</li>
                <li>✔ 3-hour venue rental</li>
                <li>✔ Full catering</li>
                <li>✔ Photo booth</li>
                <li>✔ Up to 40 guests</li>
              </ul>
              <a
                href="#booking"
                className="mt-6 inline-block bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 transition duration-300"
              >
                Choose Package
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-purple-800 mb-4">
                Ultimate Extravaganza
              </h3>
              <p className="text-3xl font-bold text-pink-500 mb-4">$1,499</p>
              <ul className="text-gray-700 text-left space-y-2">
                <li>✔ Premium theme decorations</li>
                <li>✔ 4-hour venue rental</li>
                <li>✔ Gourmet catering</li>
                <li>✔ Live entertainment</li>
                <li>✔ Up to 60 guests</li>
              </ul>
              <a
                href="#booking"
                className="mt-6 inline-block bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Choose Package
              </a>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 px-4 md:px-16 bg-yellow-100">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">
            Our Past Celebrations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1517457373958-b4bdd8b50e05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1519227357091-79a1b0d3b8fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1602631985686-1bb0e6a8a6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1530103862295-878a74e3d31b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            ].map((src, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg group"
              >
                <img
                  src={src}
                  alt={`Past event ${index + 1}`}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 md:px-16 bg-white">
          <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
            Happy Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Lisa M.",
                quote:
                  "Joyful Moments made my daughter's 5th birthday magical! Everything was perfect.",
              },
              {
                name: "James R.",
                quote:
                  "The team handled every detail for my 30th. Best party I've ever had!",
              },
              {
                name: "Priya S.",
                quote:
                  "Their creativity and professionalism blew us away. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-purple-50 p-6 rounded-lg shadow-md text-center"
              >
                <p className="text-gray-700 italic">
                  {'"'}
                  {testimonial.quote}
                  {'"'}
                </p>
                <p className="mt-4 text-purple-700 font-semibold">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-500 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Throw an Unforgettable Party?
          </h2>
          <p className="text-xl mb-6">
            Let Joyful Moments bring your birthday vision to life!
          </p>
          <a
            href="#booking"
            className="inline-block bg-white text-pink-500 py-3 px-8 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Get Started Today
          </a>
        </section>
      </div>
    </>
  );
};

export default BirthdayPartyService;
