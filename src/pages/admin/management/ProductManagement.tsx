import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

// Zod schema for form validation
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be at least 1"),
  stock: z.number().min(0, "Stock cannot be negative"),
  photo: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductManagement = () => {
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(10);
  const [photo, setPhoto] = useState<string>(img);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: name,
      price: price,
      stock: stock,
      photo: photo,
    },
  });

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setValue("photo", reader.result);
      };
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    setName(data.name);
    setPrice(data.price);
    setStock(data.stock);
    setPhoto(data.photo || img);
  };

  const photoUpdate = watch("photo", photo);

  return (
    <main className="product-management">
      <section>
        <strong>ID - asnmdkasndmsan</strong>
        <img src={photo} alt="Product" />
        <p>{name}</p>
        {stock > 0 ? (
          <span className="green">{stock} Available</span>
        ) : (
          <span className="red">Not Available</span>
        )}
        <h3>${price}</h3>
      </section>

      <article>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Manage</h2>
          <div>
            <label>Name</label>
            <input type="text" placeholder="Name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              placeholder="Stock"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text-red-500 text-xs">{errors.stock.message}</p>
            )}
          </div>

          <div>
            <label>Photo</label>
            <input type="file" onChange={changeImageHandler} />
          </div>

          {photoUpdate && <img src={photoUpdate} alt="New Image" />}

          <button type="submit">Update</button>
        </form>
      </article>
    </main>
  );
};

export default ProductManagement;
