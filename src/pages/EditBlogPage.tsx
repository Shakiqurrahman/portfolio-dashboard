import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../Redux/features/blog/blogApi";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z
    .union([z.instanceof(File), z.string().url(), z.undefined()])
    .optional(),
});

export type BlogFormData = z.infer<typeof blogSchema>;

const EditBlogPage = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading: isFetching } = useGetBlogByIdQuery(blogId);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    if (blog) {
      setValue("title", blog.title);
      setValue("description", blog.description);
      setValue("thumbnail", blog.thumbnail);
      setPreview(blog.thumbnail);
    } else if (!blog && !isFetching) {
      navigate("/not-found");
    }
  }, [blog, navigate, isFetching, setValue]);

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

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    try {
      await updateBlog({ blogId, payload: formData }).unwrap();
      navigate("/blog-management");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (isFetching) return <p>Loading blog...</p>;

  return (
    <section className="mt-5">
      <h1 className="text-2xl font-semibold">Edit Blog</h1>
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
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-auto rounded mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary px-4 py-2.5 rounded-lg text-white font-semibold disabled:bg-primary/60"
        >
          {isLoading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </section>
  );
};

export default EditBlogPage;
