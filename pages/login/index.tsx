import { checkTokenFromCookie } from "@/auth/cookieSetup";
import Button from "@/components/button/Button";
import TextInput from "@/components/inputs/TextInput";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { headersConfig, baseUrl } from "@/network/NetworkSetup";
import { Toaster, toast } from "react-hot-toast";
import { setCookie } from "cookies-next";

interface LoginProps {}

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    const token = checkTokenFromCookie();
    if (token) {
      router.push("/");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data", data);
    setLoginLoading(true);
    axios
      .post(`${baseUrl}/login`, data, headersConfig)
      .then((response) => {
        toast.success("Login success!");
        setCookie("token", response.data.access_token.token);
        router.push("/");
      })
      .catch(() => {
        toast.error("Something went wrong. Please cek your email or password");
        setLoginLoading(false);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

          {/* EMAIL */}
          <TextInput
            id="email"
            label="Email"
            disabled={loginLoading}
            register={register}
            errors={errors}
            required={true}
          />

          {/* PASSWORD */}
          <TextInput
            id="password"
            label="Password"
            disabled={loginLoading}
            register={register}
            type="password"
            errors={errors}
            required={true}
          />

          {/* BUTTON */}
          <Button
            disabled={loginLoading}
            label="Login"
            onButtonClick={handleSubmit(onSubmit)}
          />

          {/* GO TO LOGIN */}
          <div className="flex flex-col md:flex-row justify-center items-center py-4 gap-2">
            <p className="">Dont have an account ?</p>
            <p className="font-semibold text-neutral-600 hover:text-rose-500 hover:cursor-pointer ">
              <Link href="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
