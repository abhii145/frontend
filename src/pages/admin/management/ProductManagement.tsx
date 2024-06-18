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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <section className="md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <strong className="block mb-2 text-gray-700">
            ID - asnmdkasndmsan
          </strong>
          <div className="flex flex-col items-center">
            <img
              src={photo}
              alt="Product"
              className="w-full h-64 object-contain rounded-lg shadow-md mb-4"
            />
            <p className="text-lg font-semibold mb-2">{name}</p>
            {stock > 0 ? (
              <span className="text-green-600">{stock} Available</span>
            ) : (
              <span className="text-red-600">Not Available</span>
            )}
            <h3 className="text-2xl font-bold mt-4">${price}</h3>
          </div>
        </section>

        <article className="md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Product</h2>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price:
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock:
              </label>
              <input
                id="stock"
                type="number"
                {...register("stock", { valueAsNumber: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.stock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo:
              </label>
              <input
                id="photo"
                type="file"
                onChange={changeImageHandler}
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </form>
        </article>
      </div>
    </main>
  );
};

export default ProductManagement;
