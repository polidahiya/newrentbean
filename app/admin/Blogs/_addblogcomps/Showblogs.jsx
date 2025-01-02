import { Getblogs } from "@/app/_serveractions/Getblogs";
import { useEffect, useState } from "react";
import { AppContextfn } from "@/app/Context";
import { LuRefreshCw } from "react-icons/lu";
import { Deleteblog } from "../Serveraction";

function Showblogs({ setblogdata, seteditmode, setdeletedimages }) {
  const { setmessagefn } = AppContextfn();
  const [blogs, setblogs] = useState([]);
  const [blogsindex, setblogsindex] = useState(0); // This is the page index
  const [loading, setloading] = useState(false);
  const [noMoreBlogs, setnoMoreBlogs] = useState(false);
  const [refresh, setrefresh] = useState(0);
  const [totalPages, settotalPages] = useState(1); // Track total pages
  const [currentPage, setcurrentPage] = useState(1); // Track current page

  const blogsPerPage = 10; // Blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      setloading(true); // Start loading state
      const res = await Getblogs(blogsPerPage, blogsindex); // Fetch blogs based on current index

      setmessagefn(res?.message);

      if (res.status !== 200) {
        setloading(false);
        return;
      }

      setblogs(res?.blogdata); // Update blogs
      settotalPages(res?.totalPages || 1); // Set total pages from response
      setnoMoreBlogs(res.noMoreBlogs);
      setloading(false); // Stop loading state
    };

    fetchBlogs();
  }, [blogsindex, refresh]); // Watch for changes in blogsindex and refresh

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setblogsindex(currentPage); // Set blogsindex to current page
      setcurrentPage((prev) => prev + 1); // Move to next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setblogsindex(currentPage - 2); // Set blogsindex to the previous page
      setcurrentPage((prev) => prev - 1); // Move to previous page
    }
  };

  return (
    <div className="flex-1 py-2 w-full">
      <h1 className="text-[25px] font-bold flex items-center justify-center gap-2">
        More Blogs
        <button onClick={() => setrefresh((pre) => pre + 1)}>
          <LuRefreshCw
            className="bg-green-500 text-white p-1 rounded-full"
            title="Refresh"
          />
        </button>
      </h1>
      <div className="flex flex-row md:flex-col gap-2 mt-2 overflow-x-scroll w-full p-[10px] md:p-0 md:overflow-auto">
        {blogs.map((blog, i) => {
          const mainHeading = blog?.blogdata?.find(
            (item) => item.type === "mainheading"
          )?.content;
          const firstImage = blog?.blogdata?.find(
            (item) => item.type === "image"
          )?.content;

          return (
            <div
              key={i}
              className="group relative rounded-xl shadow-md p-2 min-w-64 md:min-w-full"
            >
              <img
                className="w-full aspect-video rounded-md object-cover object-center"
                src={firstImage}
                alt={`Blog image ${i + 1}`} // Add descriptive alt text
              />
              <p className="mt-1 line-clamp-2">{mainHeading}</p>
              <div className="absolute top-2 right-2 text-white hidden group-hover:flex gap-2">
                <button
                  className="bg-green-500 px-2 py-1 text-sm rounded-md hover:bg-green-600"
                  onClick={() => {
                    setblogdata(blog?.blogdata);
                    setdeletedimages([]);
                    seteditmode((pre) => ({
                      ...pre,
                      mode: true,
                      id: blog._id,
                    }));
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-2 py-1 text-sm rounded-md hover:bg-red-600"
                  onClick={async () => {
                    const res = await Deleteblog(blog);
                    setmessagefn(res?.message);

                    if (res?.status == 200)
                      setblogs((pre) => {
                        let temp = [...pre];
                        temp.splice(i, 1);
                        return temp;
                      });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={handlePreviousPage}
          className={`bg-gray-300 px-3 py-1 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`bg-sky-500 text-white px-3 py-1 rounded-md ${
            currentPage === totalPages || noMoreBlogs
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={currentPage === totalPages || noMoreBlogs || loading}
        >
          Next
        </button>
      </div>

      {noMoreBlogs && (
        <p className="mt-2 text-gray-500 text-center">
          No more blogs available.
        </p>
      )}
    </div>
  );
}

export default Showblogs;
