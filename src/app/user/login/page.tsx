"use client";
import Style from "./login.module.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const inter = Inter({
  weight: ["400", "400"],
  subsets: ["latin"],
});
interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}
const LoginPage = () => {
  const router = useRouter();

  const [seePassword, setSeePassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const setCookies = () => {
    const savedEmail = Cookies.get("email");
    const savedPassword = Cookies.get("password");
    const savedRememberMe = Cookies.get("rememberMe") === "true";

    if (savedRememberMe) {
      setValue("email", savedEmail || "");
      setValue("password", savedPassword || "");
      setValue("rememberMe", savedRememberMe);
    }
  };

  const onLogin: SubmitHandler<IFormInput> = async (data: any) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!res?.ok) {
        toast.success("password or email incorrect");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      throw new Error("something went wrong", error);
    }

    // Save to cookies if "Remember Me" is checked
    console.log(data.rememberMe);
    if (data.rememberMe) {
      Cookies.set("email", data.email, { expires: 7 }); // Expires in 7 days
      Cookies.set("password", data.password, { expires: 7 });
      Cookies.set("rememberMe", "true", { expires: 7 });
    } else {
      Cookies.remove("email");
      Cookies.remove("password");
      Cookies.remove("rememberMe");
    }

    // Simulate login process (replace this with your authentication logic)
    //   console.log('User Logged In:', data);
  };

  const googleAuth = async () => {
    signIn("google", { callbackUrl: "/" });
  };
  useEffect(() => {
    setCookies();
  }, [setValue]);

  return (
    <main
      className={` ${Style.main}  flex items-center py-10  ${inter.className}`}
    >
      <section className=" flex max-md:flex-col shadow-2xl bg-base-200 lg:w-5/6 rounded-sm">
        {/* ---------------------- */}
        <div className=" my-10 ">
          <div className=" bg-base-100 p-5 rounded-md shadow-lg">
            <h2 className=" text-xl font">Login</h2>
            <div className=" flex items-center sm:text-nowrap max-sm:flex-col">
              {" "}
              <p>Doesn't have an account yet?</p>{" "}
              <Link href={"/user/signup"}>
                <div className=" text-primary cursor-pointer select-none">
                  Sign Up
                </div>
              </Link>
            </div>
            <form
              onSubmit={handleSubmit((data) => onLogin(data))}
              className=" mt-5"
            >
              <div className="">
                <h2>Email Address</h2>
                {/* <input type="email" name="email" id="email" placeholder="you@example.com" className=" w-full h-10 pl-2 rounded-md outline-none border border-black  "  /> */}
                <input
                  {...register("email", { required: "Need to fill up!" })}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <div className="">
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
              </div>
              <div className=" mt-5">
                <div className=" flex items-center justify-between">
                  <h2>Password</h2>
                  <div className=" text-primary cursor-pointer select-none">
                    Forgot Password?
                  </div>
                </div>
                <div className=" w-full relative flex items-center">
                  <input
                    {...register("password", { required: "Need to fill up!" })}
                    type={`${!seePassword ? "password" : "text"}`}
                    name="password"
                    id="password"
                    placeholder="Enter 6 character or more"
                    className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <div
                    onClick={() => setSeePassword(!seePassword)}
                    className=" absolute right-5 cursor-pointer select-none"
                  >
                    <TbEyeglass2
                      size={20}
                      className={`${!seePassword ? "block" : "hidden"}`}
                    />
                    <TbEyeglassOff
                      size={20}
                      className={`${!seePassword ? "hidden" : "block"}`}
                    />
                  </div>
                </div>
                <div className="">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
              <div className=" flex items-center gap-2 mt-5">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  id="rememberMe"
                />
                <h2>Remember me</h2>
              </div>
              <div className="mt-5">
                <button type="submit" className=" btn btn-primary w-full">
                  Login
                </button>
              </div>
            </form>
            <div className=" my-5 flex items-center">
              <div className=" border w-full h-[1px] bg-base-300 rounded-full"></div>
              <h2 className=" text-nowrap mx-2">or login with</h2>
              <div className="border w-full h-[1px] bg-base-300 rounded-full"></div>
            </div>
            <div className=" flex justify-between gap-4 items-center">
              <button
                onClick={googleAuth}
                className="  w-1/2 flex items-center justify-center gap-2 py-2 text-red-800 rounded-md border-warning border-2 hover:bg-slate-200  hover:border-slate-200 active:bg-slate-300"
              >
                <FcGoogle />
                <h2>Google</h2>
              </button>
              <button className=" text-primary w-1/2 flex items-center justify-center gap-2 py-2 rounded-md border-primary border-2 hover:bg-slate-200  hover:border-slate-200 active:bg-slate-300">
                <GrFacebookOption className=" text-primary" />
                <h2>Google</h2>
              </button>
            </div>
          </div>
        </div>
        {/* ---------------------- */}
        <div className="  w-full flex items-center justify-center">
          <Image
            src={"/images/login.png"}
            alt="login"
            width={500}
            height={500}
          />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
