const AddProjectPage = () => {
  return (
    <section className="mt-5">
      <h1 className="text-2xl font-semibold">Add Project Details</h1>
      <form className="mt-5">
        <input
          className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          type="text"
          name=""
          placeholder="Enter project title"
        />
      </form>
    </section>
  );
};

export default AddProjectPage;
