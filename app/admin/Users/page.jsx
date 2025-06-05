import React from "react";
import Searchbox from "./_comps/Searchbox";
import { get_users } from "./Serveractions";
import Pagination from "../_comps/Pagenation";

export default async function page({ searchParams }) {
  const { page, query, filter } = await searchParams;

  const users_at_once = 50;
  const res = await get_users(users_at_once, page, query, filter);

  if (res.status != 200) {
    return (
      <>
        <Adminnavcomp />
        <div className="h-screen w-full flex items-center justify-center text-red-500">
          {res.message}
        </div>
      </>
    );
  }

  const pages = Math.ceil(res?.total_users / users_at_once);

  return (
    <div className="relative flex flex-col h-[calc(100vh-50px)]">
      <Adminnavcomp />
      <UserTable users={res?.users} />
      <Pagination pages={pages} currentPage={Number(page) || 1} />
    </div>
  );
}
const Adminnavcomp = () => {
  return (
    <div className="sticky top-0 bg-white pb-2 px-2 md:px-10  shadow-md z-30">
      <Searchbox />
    </div>
  );
};

const UserTable = ({ users }) => {
  return (
    <div className="relative overflow-x-auto h-full my-2 px-2 md:px-10">
      <table className="min-w-full table-auto border border-gray-200 rounded-md shadow-sm text-sm">
        <thead className="bg-gray-100 sticky top-0 -translate-y-px">
          <tr>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border whitespace-nowrap">User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?._id} className="even:bg-gray-50">
              <td className="p-2 border whitespace-nowrap">{user?.username}</td>
              <td className="p-2 border whitespace-nowrap">{user?.email}</td>
              <td className="p-2 border">{user?.phonenum}</td>
              <td className="p-2 border">{user?.address}</td>
              <td className="p-2 border capitalize">{user?.usertype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
