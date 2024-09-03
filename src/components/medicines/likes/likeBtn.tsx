"use client"

import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface Props{
    item:object | any
}

const LikeBtn:React.FC<Props> = ({item}) => {
  const[array,setArray]=useState(500)

    const[likeFlag,setLikeFlag]=useState<boolean>(false)
    const onLike = async()=>{
        console.log(item)
    }

    const onLikeBtn = ()=>{
        if(!likeFlag){
          setArray((prev)=>prev + 1)
        }else{
          setArray((prev)=>prev - 1)
        }
        
    }


    return (
        <button onClick={()=>{onLike(),setLikeFlag(!likeFlag),onLikeBtn()}} className="max-md:stats shadow cursor-pointer hover:scale-110 md:rounded-md md:w-1/2 w-full ">
        <div className="stat md:flex-col md:flex md:items-center">
          <div className="stat-figure text-primary ">
            <FaHeart className={`${!likeFlag?"null":"text-red-600"} w-8 h-8 `}/>
          </div>
          <div className="stat-title md:text-xs ">Total Likes</div>
          <div className="stat-value text-primary md:text-sm">{array}K</div>
          <div className="stat-desc md:hidden">21% more than last month</div>
        </div>

      </button>
    )
}

export default LikeBtn
