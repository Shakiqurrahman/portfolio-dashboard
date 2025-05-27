import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useCreateBlogMutation } from "../Redux/features/blog/blogApi";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z
    .any()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

const AddBlogPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("thumbnail", file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

    try {
      await createBlog(formData).unwrap();
      toast.success("Blog created successfully!");
      navigate("/blog-management");
    } catch (err) {
      toast.error("Failed to create blog!");
      console.error("Blog creation failed", err);
    }
  };
  return (
    <section className="mt-5">
      <h1 className="text-2xl font-semibold">Add Blog Details</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Enter blog title"
            {...register("title")}
            className="outline-none border border-gray-300 px-4 py-2 rounded-lg w-full"
          />
          {errors.title && (
            <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Enter blog description"
            rows={15}
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

export default AddBlogPage;
