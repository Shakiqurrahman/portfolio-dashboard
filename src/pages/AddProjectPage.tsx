import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useCreateProjectMutation } from "../Redux/features/project/projectApi";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  sourceLink: z
    .string()
    .url("Invalid source link")
    .optional()
    .or(z.literal("")),
  liveLink: z.string().url("Invalid live link").optional().or(z.literal("")),
  thumbnail: z
    .any()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const AddProjectPage = () => {
  const navigate = useNavigate();
  const [addProject, { isLoading }] = useCreateProjectMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.subTitle) formData.append("subTitle", data.subTitle);
    formData.append("description", data.description);
    if (data.sourceLink) formData.append("sourceLink", data.sourceLink);
    if (data.liveLink) formData.append("liveLink", data.liveLink);
    formData.append("thumbnail", data.thumbnail);

    try {
      await addProject(formData).unwrap();
      toast.success("Project created successfully!");
      navigate("/project-management");
    } catch (err) {
      console.error("Submit failed:", err);
      toast.error("Failed to create project!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="mt-5">
      <h1 className="text-2xl font-semibold">Add Project Details</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Enter project title"
            {...register("title")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Enter project description"
            rows={5}
            {...register("description")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.thumbnail?.message &&
            typeof errors.thumbnail.message === "string" && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.thumbnail.message}
              </p>
            )}

          {preview && (
            <img src={preview} alt="Preview" className="w-32 h-auto rounded" />
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter project sub title"
            {...register("subTitle")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.subTitle && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.subTitle.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter project source link"
            {...register("sourceLink")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.sourceLink && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.sourceLink.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter project live link"
            {...register("liveLink")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.liveLink && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.liveLink.message}
            </p>
          )}
        </div>

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
