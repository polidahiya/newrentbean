import Link from "next/link";
import { MdOutlineEditNote } from "react-icons/md";

function UserAddress({ userdata }) {
  return (
    <div className="bg-white p-2 pl-5">
      <Link
        href="/updateuserdetails"
        className="h-9 w-full flex items-center justify-between"
      >
        <span>Address: {userdata?.address}</span>
        <button
          className="flex items-center justify-center gap-1 h-full rounded bg-theme text-white px-5"
          aria-label="Change Address"
          title="Change Address"
        >
          <MdOutlineEditNote className="text-lg" />
          <span className="hidden md:block">Change</span>
        </button>
      </Link>
    </div>
  );
}

export default UserAddress;
