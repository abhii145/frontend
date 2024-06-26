import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const couponSchema = z.object({
  size: z.number().min(4).max(25),
  prefix: z.string().optional(),
  amount: z.number().min(1, "Amount must be at least 1"),
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
      amount: 0,
      includeNumbers: false,
      includeCharacters: false,
      includeSymbols: false,
    },
  });

  const createCoupon = async (discountcode: string, amount: number) => {
    const coupon = await axios.post(
      "http://localhost:5005/api/v1/payment//coupon/new?id=666df7f2f299c6e181010798",
      { coupon: discountcode, amount }
    );
    console.log(coupon);
  };

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

    createCoupon(result, data.amount);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Coupon Generator
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Prefix</label>
            <input
              type="text"
              placeholder="Optional prefix"
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("prefix")}
            />
            {errors.prefix && (
              <p className="text-red-500 text-xs">{errors.prefix.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Coupon Length</label>
            <input
              type="number"
              placeholder="Length between 4 and 25"
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("size", { valueAsNumber: true })}
              min={4}
              max={25}
            />
            {errors.size && (
              <p className="text-red-500 text-xs">{errors.size.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Amount</label>
            <input
              type="number"
              placeholder="Enter the discount amount"
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("amount", { valueAsNumber: true })}
              min={3}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount.message}</p>
            )}
          </div>

          <fieldset className="space-y-2">
            <legend className="text-gray-700 font-semibold">Include</legend>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeNumbers"
                {...register("includeNumbers")}
                className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="includeNumbers" className="ml-2 text-gray-700">
                Numbers
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeCharacters"
                {...register("includeCharacters")}
                className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="includeCharacters" className="ml-2 text-gray-700">
                Characters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeSymbols"
                {...register("includeSymbols")}
                className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="includeSymbols" className="ml-2 text-gray-700">
                Symbols
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate
          </button>
        </form>

        {coupon && (
          <div className="mt-4 bg-gray-200 p-4 rounded-lg flex justify-between items-center">
            <code className="text-sm text-gray-800">{coupon}</code>
            <button
              onClick={() => copyText(coupon)}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
