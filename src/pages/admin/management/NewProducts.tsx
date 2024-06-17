import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  photo: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type ProductFormInputs = z.infer<typeof productSchema>;

const NewProducts: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormInputs) => {
    console.log(data);
    // Handle form submission, e.g., send data to an API
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <main className="product-management">
      <article>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>New Product</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="stock">Stock:</label>
            <input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text-red-500 text-xs">{errors.stock.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="photo">Photo:</label>
            <input
              id="photo"
              type="file"
              {...register("photo")}
              onChange={handleFileChange}
            />
            {errors.photo && (
              <p className="text-red-500 text-xs">
                {errors.photo.message?.toString()}
              </p>
            )}
            {previewUrl && (
              <div>
                <img
                  src={previewUrl}
                  alt="Image Preview"
                  style={{ maxHeight: "200px", marginTop: "10px" }}
                />
              </div>
            )}
          </div>

          <button type="submit">Create</button>
        </form>
      </article>
    </main>
  );
};

export default NewProducts;
