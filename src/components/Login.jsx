import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.service";
import { login as authLogin } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError(null);
    console.log(data);
    try {
      const session = await authService.loginUser(data);
      console.log(session);
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(authLogin({ userData: user }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center text-black justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black">
          Don't have a account?{" "}
          <Link
            to={"/register"}
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div>
            <Input
              label={"Email: "}
              placeHolder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label={"Password: "}
              type="password"
              placeHolder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button textColor="text-white" type={"submit"}>Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
