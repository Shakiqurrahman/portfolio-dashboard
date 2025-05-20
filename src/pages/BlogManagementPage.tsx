import ProjectCard from "../components/ProjectCard";

const BlogManagementPage = () => {
  return (
    <section className="mt-5">
      <h1 className="text-2xl font-semibold">Blogs</h1>
      <p className="text-sm text-gray-600">Display all the blog list.</p>
      <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(5)].map((_, idx) => (
          <ProjectCard key={idx} />
        ))}
      </div>
    </section>
  );
};

export default BlogManagementPage;
