import { PiPlus } from "react-icons/pi";
import { Link } from "react-router";
import ProjectCard from "../components/ProjectCard";

const ProjectManagementPage = () => {
  return (
    <section className="mt-5">
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link to={"/project-management/add-project"}>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold"
            type="button"
          >
            <PiPlus />
            Add Project
          </button>
        </Link>
      </div>
      <p className="text-sm text-gray-600">Display all the project list.</p>
      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(5)].map((_, idx) => (
          <ProjectCard key={idx} />
        ))}
      </div>
    </section>
  );
};

export default ProjectManagementPage;
