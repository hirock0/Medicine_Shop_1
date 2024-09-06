"use client";

import axios from "axios";
import Style from "./signup.module.css";
import { Roboto } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
const roboto = Roboto({
  weight: ["700", "700"],
  subsets: ["latin"],
});
const roboto2 = Roboto({
  weight: ["400", "400"],
  subsets: ["latin"],
});

import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  username: string;
  password: string;
  repeat_password: string;
  user_terms: boolean;
  userImage: string;
  recentDate: string;
}

const SignupPage = () => {
  const router = useRouter();

  const [userImage, setUserImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSignUp: SubmitHandler<FormData> = async (data: any) => {
    setLoading(true);
    try {
      data.userImage = userImage;
      data.recentDate = new Date().toLocaleDateString();

      if (data.password !== data.repeat_password) {
        toast.success("Password does not matched!");
      } else {
        const sendData = await axios.post("/pages/api/user/signup", data);
        if (sendData?.data.success) {
          toast.success("Sign Up successful!");
          setLoading(false);
          reset();
          router.push("/");
        } else {
          toast.success("something went wrong!");
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const base64 = (e: any) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (result: any) => {
        setUserImage(result?.target.result);
      };
      reader.onerror = (error: any) => {
        throw new Error(error);
      };
    } catch (error: any) {
      throw new Error("Image not converted to base64");
    }
  };

  return (
    <main className={` ${roboto.className}  `}>
      <section className=" flex h-full max-md:flex-col-reverse p-0 my-5 shadow-2xl ">
        {/* ------------------------------- */}
        <div
          className={`${Style.left} w-4/6 max-md:h-screen  max-md:w-full max-md:mt-0`}
        >
          <div className=" bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 w-full h-full"></div>
        </div>
        {/* -------------------------------- */}
        <div className="  w-2/6 max-md:w-full  bg-base-100 px-5 pt-5 pb-20">
          <div className="">
            <h2 className="text-2xl font-extrabold">Sign Up</h2>
            <form
              onSubmit={handleSubmit((data) => onSignUp(data))}
              className={`${roboto2.className} mt-5 opacity-90`}
            >
              <div className=" ">
                <h2>Full Name</h2>
                <input
                  {...register("name", { required: "Need to fill up!" })}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name..."
                  className=" bg-transparent outline-none border-b-2 border-slate-300 focus:h-12  w-full"
                />
                {errors.name && (
                  <p className="text-sm text-amber-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className=" mt-5">
                <h2>Email</h2>
                <input
                  {...register("email", { required: "Need to fill up!" })}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email Address..."
                  className=" bg-transparent outline-none border-b-2 border-slate-300 focus:h-12  w-full"
                />
                {errors.email && (
                  <p className="text-sm text-amber-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className=" mt-5">
                <h2>Username</h2>
                <input
                  {...register("username", { required: "Need to fill up!" })}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="User Name..."
                  className=" bg-transparent outline-none border-b-2 border-slate-300 focus:h-12  w-full"
                />
                {errors.username && (
                  <p className="text-sm text-amber-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className=" mt-5">
                <h2>Password</h2>
                <input
                  {...register("password", { required: "Need to fill up!" })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password..."
                  className=" bg-transparent outline-none border-b-2 border-slate-300 focus:h-12  w-full"
                />
                {errors.password && (
                  <p className="text-sm text-amber-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className=" mt-5">
                <h2>Repeat Password</h2>
                <input
                  {...register("repeat_password", {
                    required: "Need to fill up!",
                  })}
                  type="text"
                  name="repeat_password"
                  id="repeat_password"
                  placeholder="Repeat Password..."
                  className=" bg-transparent outline-none border-b-2 border-slate-300 focus:h-12  w-full"
                />
                {errors.repeat_password && (
                  <p className="text-sm text-amber-600">
                    {errors.repeat_password.message}
                  </p>
                )}
              </div>
              <div className=" mt-5 flex items-center w-full text-nowrap  gap-2">
                <input
                  {...register("user_terms")}
                  type="checkbox"
                  id="fullName"
                  placeholder="Name..."
                  className=" "
                />
                <h2 className=" text-xs">
                  <span>I agree to the </span>
                  <span className=" font-semibold">Terms of User</span>
                </h2>
              </div>
              <div className=" mt-5">
                <h2>Image</h2>
                <label
                  htmlFor="Image"
                  className=" flex items-center rounded-md pl-2 border h-10"
                >
                  Choose you image
                </label>
                <input
                  onChange={base64}
                  type="file"
                  accept="image/**"
                  name="Image"
                  id="Image"
                  className=" bg-transparent outline-none  w-full hidden"
                />
                <div
                  className={`${
                    userImage !== "" ? " block" : " hidden"
                  } mt-2 flex items-center justify-center`}
                >
                  <Image
                    src={userImage}
                    alt="userImage"
                    width={300}
                    height={300}
                    className=""
                  />
                </div>
              </div>
              <div className=" mt-5">
                <button className=" btn btn-secondary w-full rounded-full ">
                  Sign Up
                </button>
              </div>
            </form>
            {loading && (
              <div className="flex justify-center items-center mt-4">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            )}
          </div>
        </div>
        {/* --------------------------- */}
      </section>
    </main>
  );
};

export default SignupPage;
