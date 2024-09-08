"use client"

import axios from "axios"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
interface FormData{
    email:string
}
const Forgot_passwordPage = () => {
    const router = useRouter()
    const{register,handleSubmit,reset,formState:{errors}}=useForm()
    const onForgot:SubmitHandler<FormData> = async(data)=>{
        const email = data.email
       const reqApi = await axios.post("/pages/api/user/forgot_password",{email})
       if(reqApi?.data.success){
        toast.success("Account is found")
        // router.push("/user/verifyemail")
       }
       else{
        toast.success("Account is not found")
       }
    }

    return (
    <main className=" min-h-screen">
        <section className=" ">
            <div className=" rounded-md bg-base-100 shadow-lg lg:w-1/2 mx-auto md:w-4/6  mt-10 p-5">
               <h1 className=" text-center">Finding account put you right emil.</h1> 
               <p className=" text-center mt-20">
                Enter the email address associated with your account and we'll send you a link to reset your password. 

               </p>
               <form onSubmit={handleSubmit((data:any)=>onForgot(data))} className=" mt-10">
                <h2>Email</h2>
                <input {...register("email",{required:"Need to fill!"})} type="email" name="email" id="email" placeholder="Enter your email" className=" h-10 pl-2 rounded-md w-full outline-none border-b-2" />
                <button type="submit" className=" mt-5 btn btn-primary w-full">Continue</button>
               </form>
               <div className=" mt-10">
               <h2>Don't have an account?<Link href={"/user/signup"} className=" text-primary">Sign Up</Link></h2> 
               </div>
            </div>
        </section>
    </main>
    )
}

export default Forgot_passwordPage
