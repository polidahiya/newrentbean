import Mobile from "./Mobile";
import Desktop from "./Desktop";
export default function Homestoreswitch({ location, store, Device }) {
  return Device === "mobile" || Device === "tablet" ? (
    <Mobile location={location} store={store} />
  ) : (
    <Desktop location={location} store={store} />
  );
}
