"use client"


import { useRouter } from "next/navigation"
import { useState } from "react"


interface Props{
    item: object | any
}

const DrugDetails:React.FC<Props> = ({item}) => {

    const router = useRouter()


const[details,setDetails]=useState(false)

    const onDrugDetails = ()=>{

    
        console.log(router)
    }




    return (
        <div className="  w-2/5 max-sm:w-1/2">
            
                <button onClick={()=>{onDrugDetails(),setDetails(!details)}} className=" btn btn-accent w-full ">
                      details
                </button>

        </div>
    )
}

export default DrugDetails
