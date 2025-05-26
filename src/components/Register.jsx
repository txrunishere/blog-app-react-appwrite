import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.service";
import { Button, Input } from "./";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const registerUser = async (data) => {
    setError(null);
    try {
      const user = await authService.createAccount(data);
      console.log(user);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold">Create a Account</h2>
        <p className="mt-2 text-center text-base text-black">
          Already have a account?{" "}
          <Link
            to={"/login"}
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}
        <form onSubmit={handleSubmit(registerUser)} className="mt-8">
          <div>
            <Input
              label={"Name: "}
              placeHolder="Enter your Name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
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
            <Button type={"submit"}>Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
