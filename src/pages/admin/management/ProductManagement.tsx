import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";

const ProductManagement = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSingleProductQuery(params.id!);

  const { price, photo, title, stock, category, description } =
    data?.product || {
      photo: "",
      description: "",
      category: "",
      title: "",
      stock: 0,
      price: 0,
    };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [descriptionUpdate, setDescriptionUpdate] =
    useState<string>(description);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(title);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("title", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (descriptionUpdate) formData.set("description", descriptionUpdate);
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    navigate("/admin/product");
    console.log(res);
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });

    navigate("/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.title);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setDescriptionUpdate(data.product.description);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <section className="md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
              <strong className="block mb-2 text-gray-700">
                ID - {data?.product._id}
              </strong>
              <div className="flex flex-col items-center">
                <img
                  src={photoUpdate || photo}
                  alt="Product"
                  className="w-full h-64 object-contain rounded-lg shadow-md mb-4"
                />
                <p className="text-lg font-semibold mb-2">{nameUpdate}</p>
                {stockUpdate > 0 ? (
                  <span className="text-green-600">
                    {stockUpdate} Available
                  </span>
                ) : (
                  <span className="text-red-600">Not Available</span>
                )}
                <h3 className="text-2xl font-bold mt-4">₹{priceUpdate}</h3>
              </div>
            </section>

            <article className="md:w-1/2 bg-white p-4 rounded-lg shadow-lg">
              <form onSubmit={submitHandler} className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Manage Product</h2>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title:
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description:
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
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
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
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
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category:
                  </label>
                  <input
                    id="category"
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
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
                {photoUpdate && (
                  <img
                    src={photoUpdate}
                    alt="New Image"
                    className="w-full h-64 object-contain rounded-lg shadow-md mb-4"
                  />
                )}

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className=" bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className=" bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </article>
          </>
        )}
      </div>
    </main>
  );
};

export default ProductManagement;
