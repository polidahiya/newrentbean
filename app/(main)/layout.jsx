import Navbar from "../_components/Navbar/Navbar";
import Footer from "../_components/footer/Footer";
import Mobilenav from "../_components/Navbar/bottomnav/Mobilenav";

export default async function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Mobilenav />
    </div>
  );
}
