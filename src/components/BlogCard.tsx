import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { MdEditCalendar } from "react-icons/md";
import { Link } from "react-router";
import type { IBlog } from "../types";
import { formatDate } from "../utils/formatDate";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <div className="bg-white rounded-lg p-5 group relative overflow-hidden">
      <div className="absolute right-[12px] top-[12px] flex flex-col gap-2 translate-x-[150%] group-hover:translate-x-0 duration-300">
        <Link
          to="edit"
          className="hover:bg-primary bg-white border border-gray-300 hover:text-white p-2 rounded-lg"
        >
          <FiEdit3 className="size-4" />
        </Link>
        <button className="hover:bg-red-700 bg-white border border-gray-300 hover:text-white p-2 rounded-lg cursor-pointer">
          <GoTrash className="size-4" />
        </button>
      </div>
      {blog.thumbnail ? (
        <img
          src={blog.thumbnail}
          alt="Course Thumbnail"
          className="w-full rounded-lg h-[230px] object-cover"
        />
      ) : (
        <div className="bg-gray-300 h-[250px] w-full rounded-lg"></div>
      )}
      <h1
        className="line-clamp-2 text-lg font-semibold group-hover:text-primary duration-300 mt-3"
        title={blog.title}
      >
        {blog.title}
      </h1>
      <p className="flex items-center gap-2 font-medium text-gray-500 mt-2">
        <MdEditCalendar />
        {formatDate(blog.createdAt)}
      </p>
    </div>
  );
};

export default BlogCard;
