"use client"
import { useState,useEffect } from "react";
import { LiaCommentSolid } from "react-icons/lia";
interface Props{
    item: object |any
}
const CommentBtn:React.FC<Props> = ({item}) => {
    const[commentLength,setCommentLength]=useState(0)
    const[commentFlag,setCommentFlag]=useState(false)
    const onComments = async()=>{
        console.log(item)
    }



    const onWindowClickingEvent = ()=>{
      window.addEventListener("click",()=>{
          setCommentFlag(false)
      })
  }
  
  
    useEffect(() => {
      onWindowClickingEvent()
  
    }, []);


    return (
    <div onClick={(e)=>{ e.stopPropagation(), setCommentLength((prev)=>prev+1), onComments()}} className="max-md:stats shadow cursor-pointer hover:scale-110 md:rounded-md  md:w-1/2 w-full max-md:flex max-md:flex-col  ">
        <div onClick={()=>setCommentFlag(!commentFlag)} className="stat md:flex-col md:flex md:items-center">
          <div className="stat-figure text-primary ">
            <LiaCommentSolid className=" w-8 h-8"/>
          </div>
          <div className="stat-title md:text-xs ">Total Comments</div>
          <div className="stat-value text-primary md:text-sm">{commentLength}</div>
          <div className="stat-desc md:hidden">21% more than last month</div>
        </div>
        {/* ------------------------------ */}
        <div className={`${!commentFlag?"hidden":" block border text-sm "}  `}>
            <div className="">
              <form action="">
              <textarea name="comment" id="comment" placeholder="comments" className=" pl-2 border w-full h-24 max-sm:px-10 outline-none "></textarea>
              <div className=" flex items-center justify-center">
                <button className=" w-1/2 bg-primary text-base-100 py-1 rounded-lg my-1 ">submit</button>
              </div>
            </form>
            {/* ........................ */}
            <div className=" p-2 max-sm:px-10 border-t h-32 overflow-y-scroll ">
                <ul>
                  <li>fdg</li>
                  <li>sdfd</li>
                  <li>sdfd</li>
                  <li>sdfd</li>
                  <li>sdfd</li>
                  <li>sdfd</li>
                  <li>sdfd</li>
                  <li>sdfd</li>
                  <li>sdfd</li>
                  <li>sdfd</li>

                </ul>
            </div>
            </div>
        </div>

      </div>
    )
}

export default CommentBtn
