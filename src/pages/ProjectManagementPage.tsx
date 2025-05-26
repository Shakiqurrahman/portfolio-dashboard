import { ImSpinner8 } from "react-icons/im";
import { PiPlus } from "react-icons/pi";
import { Link } from "react-router";
import { useGetAllProjectsQuery } from "../Redux/features/project/projectApi";
import ProjectCard from "../components/ProjectCard";
import type { IProject } from "../types";

const ProjectManagementPage = () => {
  const { data: response, isLoading } = useGetAllProjectsQuery(null);
  const projects = response?.data || [];

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
      <div className="mt-5 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {!isLoading && projects?.length === 0 ? (
          <p>Project not found!</p>
        ) : (
          projects?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))
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

export default ProjectManagementPage;
