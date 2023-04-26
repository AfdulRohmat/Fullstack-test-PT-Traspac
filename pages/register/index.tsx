import { checkTokenFromCookie } from "@/auth/cookieSetup";
import Button from "@/components/button/Button";
import TextInput from "@/components/inputs/TextInput";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import {
  headersConfig,
  baseUrl,
} from "@/network/NetworkSetup";

interface RegisterPageProps {}

const RegisterPage = () => {
  const [loading, setLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
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
    setRegisterLoading(true);
    axios
      .post(`${baseUrl}/register`, data, headersConfig)
      .then((response) => {
        toast.success("Success create account, please login!");
        router.push("/login");
      })
      .catch((e) => {
        console.log("error", e.response.data.message);
        toast.error(e.response.data.message);
        setRegisterLoading(false);
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

          {/* USERNAME */}
          <TextInput
            id="username"
            label="Username"
            disabled={registerLoading}
            register={register}
            errors={errors}
            required={true}
          />

          {/* EMAIL */}
          <TextInput
            id="email"
            label="Email"
            disabled={registerLoading}
            register={register}
            errors={errors}
            required={true}
          />

          {/* PASSWORD */}
          <TextInput
            id="password"
            label="Password"
            disabled={registerLoading}
            register={register}
            type="password"
            errors={errors}
            required={true}
          />

          {/* BUTTON */}
          <Button
            disabled={registerLoading}
            label="Register"
            onButtonClick={handleSubmit(onSubmit)}
          />

          {/* GO TO LOGIN */}
          <div className="flex flex-col md:flex-row justify-center items-center py-4 gap-2">
            <p className="">Already have an account ? </p>
            <p className="font-semibold text-neutral-600 hover:text-rose-500 hover:cursor-pointer ">
              <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
