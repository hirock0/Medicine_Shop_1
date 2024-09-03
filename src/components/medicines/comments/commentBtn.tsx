"use client"
import { useState } from "react";
import { LiaCommentSolid } from "react-icons/lia";
interface Props{
    item: object |any
}
const CommentBtn:React.FC<Props> = ({item}) => {
    const[commentLength,setCommentLength]=useState(0)
    const onComments = async()=>{
        console.log(item)
    }

    return (
    <div onClick={()=>{ setCommentLength((prev)=>prev+1), onComments()}} className="max-md:stats shadow cursor-pointer hover:scale-110 md:rounded-md  md:w-1/2 w-full ">
        <div className="stat md:flex-col md:flex md:items-center">
          <div className="stat-figure text-primary ">
            <LiaCommentSolid className=" w-8 h-8"/>
          </div>
          <div className="stat-title md:text-xs ">Total Comments</div>
          <div className="stat-value text-primary md:text-sm">{commentLength}</div>
          <div className="stat-desc md:hidden">21% more than last month</div>
        </div>

      </div>
    )
}

export default CommentBtn
