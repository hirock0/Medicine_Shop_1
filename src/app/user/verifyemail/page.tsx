"use client";

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface FormData {
  password: string;
  reTypePassword: string;
}
const VerifyemailPage = (props: any) => {

    const router = useRouter()
  const token = props?.searchParams.token.toString() || "";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onVerify: SubmitHandler<FormData> = async (data) => {
    const password = data.password;
    if (data.password !== data.reTypePassword) {
      toast.success("password does not match!");
    } else {
      const response = await axios.post("/pages/api/user/verifyEmail", {
        token,
        password,
      });
      if (response?.data.success) {
        toast.success("Password is updated");
        router.push("/user/login")
      } else {
        toast.success("something went wrong!");
      }
    }
  };

  return (
    <main className=" h-screen">
      <section className=" flex items-center justify-center h-full w-full ">
        <div className=" rounded-md bg-base-100 mx-auto lg:w-1/2 md:w-4/6  w-full shadow-lg p-10">
          <h1> Reset Password</h1>
          <form
            onSubmit={handleSubmit((data: any) => onVerify(data))}
            className=" mt-10"
          >
            <div className="">
              <h2>New Password</h2>
              <input
                {...register("password", { required: "Need to fll it!" })}
                type="password"
                name="password"
                placeholder="New Password"
                className=" focus:h-12 h-10 rounded-md w-full outline-none border-b-2"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className=" mt-5">
              <h2>Re-type Password</h2>
              <input
                {...register("reTypePassword", { required: "Need to fll it!" })}
                type="password"
                placeholder="Re-type Password"
                className="  focus:h-12  h-10 rounded-md w-full outline-none border-b-2"
              />
              {errors.reTypePassword && <p>{errors.reTypePassword.message}</p>}
            </div>
            <button type="submit" className=" btn btn-primary w-full mt-5">
              Continue
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default VerifyemailPage;
