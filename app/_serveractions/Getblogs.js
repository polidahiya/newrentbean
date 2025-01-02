"use server";
import { getcollection } from "../Mongodb";

export const Getblogs = async (numberofblogs, blogsindex) => {
  try {
    const { blogscollection } = await getcollection();
    // Get the total count of blogs
    const totalBlogsCount = await blogscollection.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalBlogsCount / numberofblogs);

    // Fetch the blogs for the current page
    let blogdata = await blogscollection
      .find()
      .sort({ _id: -1 }) // Sort in descending order (newest first)
      .limit(numberofblogs)
      .skip(numberofblogs * blogsindex)
      .toArray();

    // Convert MongoDB ObjectID to string
    blogdata.forEach((blog) => {
      blog._id = blog._id.toString();
    });

    // Check if fewer blogs were fetched than requested, meaning there are no more blogs
    const noMoreBlogs = blogdata.length < numberofblogs;

    return {
      status: 200,
      message: noMoreBlogs ? "No more blogs" : "Blogs here",
      blogdata,
      noMoreBlogs,
      totalPages, // Include total pages for pagination
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server error!" };
  }
};
