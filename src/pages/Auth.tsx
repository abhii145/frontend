import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { loginUser, signupUser } from "../redux/reducer/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = loginSchema
  .extend({
    name: z.string().min(1),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type SignupFormInputs = z.infer<typeof signupSchema>;

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", name: "" },
  });

  const onLoginSubmit = async (data: LoginFormInputs) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const onSignupSubmit = async (data: SignupFormInputs) => {
    const result = await dispatch(signupUser(data));
    if (signupUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  const toggleForm = () => {
    if (isLogin) {
      loginForm.reset();
    } else {
      signupForm.reset();
    }
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <button
            className={`w-1/2 py-2 rounded-l-lg ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={toggleForm}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-r-lg ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={toggleForm}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                {...loginForm.register("email")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  loginForm.formState.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-xs italic">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                {...loginForm.register("password")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  loginForm.formState.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            onSubmit={signupForm.handleSubmit(onSignupSubmit)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="signup-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="signup-name"
                type="text"
                {...signupForm.register("name")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  signupForm.formState.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {signupForm.formState.errors.name && (
                <p className="text-red-500 text-xs italic">
                  {signupForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                {...signupForm.register("email")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  signupForm.formState.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {signupForm.formState.errors.email && (
                <p className="text-red-500 text-xs italic">
                  {signupForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                {...signupForm.register("password")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  signupForm.formState.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {signupForm.formState.errors.password && (
                <p className="text-red-500 text-xs italic">
                  {signupForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                {...signupForm.register("confirmPassword")}
                className={`mt-1 block w-full px-3 py-2 border ${
                  signupForm.formState.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {signupForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
