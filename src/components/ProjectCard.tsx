import { FiEdit3 } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router";

const CoursesCard = () => {
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
      <img
        src=""
        // src={course.image}
        alt="Course Thumbnail"
        className="w-full rounded-lg"
      />
      <h1
        className="line-clamp-2 text-lg group-hover:text-primary duration-300 mt-3"
        // title={course.title}
      >
        {/* {course.title} */}
        hahaha
      </h1>
    </div>
  );
};

export default CoursesCard;
