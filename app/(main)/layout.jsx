import Navbar from "../_components/Navbar/Navbar";
import Footer from "../_components/footer/Footer";
import Mobilenav from "../_components/Navbar/bottomnav/Mobilenav";

export default async function RootLayout({ children, params }) {
  return (
    <div>
      <Navbar params={params} />
      {children}
      <Footer />
      <Mobilenav params={params} />
    </div>
  );
}
