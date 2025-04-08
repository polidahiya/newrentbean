import Herosection from "./_comps/herosection/Herosection";
import Events from "./_comps/Events";
import Footer from "./_comps/Footer";
import Testimonials from "./_comps/Testimonials";

export default function page() {
  return (
    <div className="">
      <Herosection />
      <div className="px-10 mt-20">
        <Events />
      </div>
      <div className="px-10 mt-20">
        <Testimonials />
      </div>
      <div className="px-10 mt-20 text">
        <section>
          <h1>Professional Event Planning Services in Delhi & NCR</h1>
          <p>
            Welcome to our premier event planning company, your trusted partner
            in organizing unforgettable experiences across Delhi and the NCR
            region. Whether it{"'"}s a birthday celebration, wedding, corporate
            event, private party, school function, or a grand New Year’s Eve
            bash, we specialize in crafting tailored and memorable occasions.
          </p>

          <p>
            We proudly serve all major locations in Delhi and NCR, including:
            Delhi, Noida, Gurugram (Gurgaon), Faridabad, Ghaziabad, and Greater
            Noida.
          </p>

          <p>
            Our commitment to excellence has earned the trust of renowned
            companies like Airtel, IBM, HSBC, Wynk Music, Pizza Hut, Reebok, and
            The Lalit. Their continued association with us speaks volumes about
            our professionalism, creativity, and flawless execution.
          </p>

          <p>
            Let us bring your vision to life with seamless coordination,
            thematic decor, curated entertainment, and end-to-end event
            management. Get in touch today and make your next event truly
            extraordinary!
          </p>
        </section>
      </div>

      <div className="px-10 mt-20">
        <Footer />
      </div>
    </div>
  );
}
