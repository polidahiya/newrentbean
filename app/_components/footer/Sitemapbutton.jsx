import { FaSitemap } from "react-icons/fa";
import Link from "next/link";

function Sitemapbutton({ store, location }) {
  return (
    <Link
      href={`/Sitemap/${location}/${store}`}
      className="flex items-center gap-1"
      prefetch={false}
    >
      <FaSitemap className="text-yellow-500" />
      Site map
    </Link>
  );
}

export default Sitemapbutton;
