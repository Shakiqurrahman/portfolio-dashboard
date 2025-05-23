import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCreateProjectMutation } from "../Redux/features/project/projectApi";

const AddProjectPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    sourceLink: "",
    liveLink: "",
    file: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const [addProject, { isLoading }] = useCreateProjectMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("subTitle", formData.subTitle);
    payload.append("description", formData.description);
    payload.append("sourceLink", formData.sourceLink);
    payload.append("liveLink", formData.liveLink);
    if (formData.file) payload.append("thumbnail", formData.file);

    try {
      await addProject(payload).unwrap();
      toast.success("Project created successfully!");
      navigate("/project-management");
    } catch (err) {
      toast.error("Failed to create project!");
      console.error("Submit failed:", err);
    }
  };

  return (
    <section className="mt-5">
      <h1 className="text-2xl font-semibold">Add Project Details</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <input
          className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter project title"
        />
        <textarea
          name="description"
          placeholder="Enter project description"
          className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          rows={5}
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          onChange={handleFileChange}
        />
        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-auto rounded" />
        )}
        <input
          className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          type="text"
          name="subTitle"
          value={formData.subTitle}
          onChange={handleChange}
          placeholder="Enter project sub title"
        />
        <input
          className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          type="text"
          name="sourceLink"
          value={formData.sourceLink}
          onChange={handleChange}
          placeholder="Enter project source link"
        />
        <input
          className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          type="text"
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          placeholder="Enter project live link"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary px-4 py-2.5 rounded-lg text-white font-semibold disabled:bg-primary/60"
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </section>
  );
};

export default AddProjectPage;
