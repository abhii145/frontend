import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const couponSchema = z.object({
  size: z.number().min(4).max(25),
  prefix: z.string().optional(),
  includeNumbers: z.boolean(),
  includeCharacters: z.boolean(),
  includeSymbols: z.boolean(),
});

type CouponFormValues = z.infer<typeof couponSchema>;

const Coupon = () => {
  const [coupon, setCoupon] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      size: 4,
      prefix: "",
      includeNumbers: false,
      includeCharacters: false,
      includeSymbols: false,
    },
  });

  const copyText = async (coupon: string) => {
    await navigator.clipboard.writeText(coupon);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const onSubmit = (data: CouponFormValues) => {
    if (
      !data.includeNumbers &&
      !data.includeCharacters &&
      !data.includeSymbols
    ) {
      return alert("Please select at least one option to include.");
    }

    let result: string = data.prefix || "";
    const loopLength: number = data.size - result.length;

    let entireString: string = "";
    if (data.includeCharacters) entireString += allLetters;
    if (data.includeNumbers) entireString += allNumbers;
    if (data.includeSymbols) entireString += allSymbols;

    for (let i = 0; i < loopLength; i++) {
      const randomNum: number = Math.floor(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Coupon Generator
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-gray-600">Prefix</label>
            <input
              type="text"
              placeholder="Optional prefix"
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("prefix")}
            />
            {errors.prefix && (
              <p className="text-red-500 text-xs">{errors.prefix.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600">Coupon Length</label>
            <input
              type="number"
              placeholder="Length between 4 and 25"
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("size", { valueAsNumber: true })}
              min={4}
              max={25}
            />
            {errors.size && (
              <p className="text-red-500 text-xs">{errors.size.message}</p>
            )}
          </div>

          <fieldset className="space-y-2">
            <legend className="text-gray-600">Include</legend>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeNumbers"
                {...register("includeNumbers")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeNumbers" className="ml-2 text-gray-600">
                Numbers
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeCharacters"
                {...register("includeCharacters")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeCharacters" className="ml-2 text-gray-600">
                Characters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeSymbols"
                {...register("includeSymbols")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeSymbols" className="ml-2 text-gray-600">
                Symbols
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate
          </button>
        </form>

        {coupon && (
          <div className="mt-4 bg-gray-200 p-4 rounded-md flex justify-between items-center">
            <code className="text-sm text-gray-800">{coupon}</code>
            <button
              onClick={() => copyText(coupon)}
              className="ml-4 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Coupon;
