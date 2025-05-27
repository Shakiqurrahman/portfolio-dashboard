import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "../Redux/features/project/projectApi";

// --- Zod Schema ---
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  sourceLink: z.string().url("Invalid source link").optional().or(z.literal("")),
  liveLink: z.string().url("Invalid live link").optional().or(z.literal("")),
  thumbnail: z
    .any()
    .refine((file) => !file || file instanceof File, {
      message: "Invalid file",
    })
    .optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const EditProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const { data, isLoading: isFetching } = useGetProjectByIdQuery(projectId);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("subTitle", data.subTitle ?? "");
      setValue("description", data.description);
      setValue("sourceLink", data.sourceLink ?? "");
      setValue("liveLink", data.liveLink ?? "");
      if (data.thumbnail) {
        setPreview(data.thumbnail);
      }
    } else if (!data && !isFetching) {
      navigate("/not-found");
    }
  }, [data, setValue, isFetching, navigate]);

  const onSubmit = async (formData: ProjectFormData) => {
    if (!projectId) return;

    const payload = new FormData();
    payload.append("title", formData.title);
    if (formData.subTitle) payload.append("subTitle", formData.subTitle);
    payload.append("description", formData.description);
    if (formData.sourceLink) payload.append("sourceLink", formData.sourceLink);
    if (formData.liveLink) payload.append("liveLink", formData.liveLink);
    if (formData.thumbnail) payload.append("thumbnail", formData.thumbnail);

    try {
      await updateProject({ projectId, payload }).unwrap();
      toast.success("Project updated successfully!");
      navigate("/project-management");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update project!");
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

  if (isFetching) return <p className="mt-5">Loading project details...</p>;

  return (
    <section className="mt-5">
      <h1 className="text-2xl font-semibold">Edit Project Details</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Enter project title"
            {...register("title")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
            )}
          {preview && (
            <img src={preview} alt="Preview" className="w-32 h-auto rounded mt-2" />
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter project sub title"
            {...register("subTitle")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter project source link"
            {...register("sourceLink")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.sourceLink && (
            <p className="text-red-500 text-sm mt-1">{errors.sourceLink.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.liveLink.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-primary px-4 py-2.5 rounded-lg text-white font-semibold disabled:bg-primary/60"
        >
          {isUpdating ? "Updating..." : "Update Project"}
        </button>
      </form>
    </section>
  );
};

export default EditProjectPage;
