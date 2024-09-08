"use client"

import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
interface FormData{
    password:string,
    reTypePassword:string

}
const VerifyemailPage = (props:any) => {
    const token = props?.searchParams.token.toString() || ""
    console.log(token)


    const {register,handleSubmit,reset,formState:{errors}}=useForm()

    const onVerify:SubmitHandler<FormData>  = async(data)=>{
        const password = data.password
        if(data.password !== data.reTypePassword){
            toast.success("password does not match!")
        }else{
            const response =  await axios.post("/pages/api/user/verifyEmail",{token,password})
            if(response?.data.success){
                toast.success("Password is updated")
            }else{
                toast.success("something went wrong!")
            }
        }

    }

    
    return (
        <main className=" h-screen">
            <section className=" mt-10">
                
                    <div className=" border bg-base-100 mx-auto lg:w-1/2 md:w-4/6 shadow-lg p-10">
                        <h1> Reset Password</h1>
                        <form onSubmit={handleSubmit((data:any)=>onVerify(data))} className=" mt-10">
                            <div className="">
                                <h2>New Password</h2>
                                <input {...register("password",{required:"Need to fll it!"})} type="password" name="password" placeholder="New Password" className="  h-10 rounded-md w-full outline-none border-b-2" />
                            </div>
                            <div className=" mt-5">
                                <h2>Re-type Password</h2>
                                <input {...register("reTypePassword",{required:"Need to fll it!"})} type="password" placeholder="Re-type Password" className="  h-10 rounded-md w-full outline-none border-b-2" />
                            </div>
                            <button type="submit" className=" btn btn-primary w-full mt-5">Continue</button>
                        </form>
                    </div>
    
            </section>
        </main>
    )
}

export default VerifyemailPage
