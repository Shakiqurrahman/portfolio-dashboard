import { ImSpinner8 } from "react-icons/im";
import { PiPlus } from "react-icons/pi";
import { Link } from "react-router";
import BlogCard from "../components/BlogCard";
import { useGetAllBlogsQuery } from "../Redux/features/blog/blogApi";
import type { IBlog } from "../types";

const BlogManagementPage = () => {
  const { data: response, isLoading } = useGetAllBlogsQuery(null);
  const blogs = response?.data || [];

  return (
    <section className="mt-5">
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Link to={"/blog-management/add-blog"}>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold"
            type="button"
          >
            <PiPlus />
            Add Blog
          </button>
        </Link>
      </div>
      <p className="text-sm text-gray-600">Display all the blog list.</p>
      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!isLoading && blogs?.length === 0 ? (
          <p>Blog not found!</p>
        ) : (
          blogs?.map((blog: IBlog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
      {isLoading && (
        <div className="h-screen w-full flex justify-center items-center absolute top-0 left-0">
          <ImSpinner8 className="animate-spin text-black text-4xl" />
        </div>
      )}
    </section>
  );
};

export default BlogManagementPage;
