"use client";

import axios from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { Inter } from "next/font/google";
const inter = Inter({
    weight:["400","400"],
    subsets:["latin"]
})




interface FormData {
  email: string;
}
const Forgot_passwordPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const[checkEmailFlag,setCheckEmailFlag]=useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onForgot: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const email = data.email;
    const reqApi = await axios.post("/pages/api/user/forgot_password", {
      email,
    });
    if (reqApi?.data.success) {
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Account is found, please check your email.");
        setCheckEmailFlag(true)
      }, 1000);
    } else {
      toast.success("Account is not found");
    }
  };

  return (
    <main className={`${inter.className} min-h-screen`}>
      <section className=" ">
        {!checkEmailFlag ? (
          <div className=" rounded-md bg-base-100 shadow-lg lg:w-1/2 mx-auto md:w-4/6  mt-10 p-5">
            <h2 className=" text-center text-3xl font-semibold max-md:text-2xl max-sm:text-xl">
              Finding account put you right emil.
            </h2>
            <p className=" text-center max-sm:text-sm mt-10">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
            <form
              onSubmit={handleSubmit((data: any) => onForgot(data))}
              className=" mt-10"
            >
              <h2>Email</h2>
              <input
                {...register("email", { required: "Need to fill!" })}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className=" h-10 pl-2 rounded-md w-full outline-none border-b-2"
              />
              <button type="submit" className=" mt-5 btn btn-primary w-full">
                {!isLoading ? (
                  "Continue"
                ) : (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </button>
            </form>
            <div className=" mt-10">
              <h2>
                Don't have an account?
                <Link href={"/user/signup"} className=" text-primary">
                  Sign Up
                </Link>
              </h2>
            </div>
          </div>
        ) : (
          <div className="">
            <h2 className="text-center mt-20">Please check the email.</h2>
            <div className=" flex items-center justify-center">
                <Link href={"https://mail.google.com/"} className=" flex items-center gap-3 btn btn-primary  mt-5 ">
                    <MdMarkEmailUnread size={25}/><h2>Email</h2>
                </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Forgot_passwordPage;
