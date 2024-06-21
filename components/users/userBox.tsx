"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Avatar from "../userInformation/Avatar";

interface UserBoxProps{
    data : User;
}

const userBox : React.FC<UserBoxProps>= ({data}) => {
  const router = useRouter();
  const [loading , setLoading] = useState(false);

  const handelClick = useCallback(() => {
    setLoading(true);
    axios.post("/api/conversation" , {
        userId : data.id,
    }).then((data) => {
        console.log(`data : ${data}`);
        
        router.push(`/conversation/${data.data.id}`)
    }).catch((err) =>{
        console.log(err);
    }).finally(() => {
        setLoading(false);
    })
  } , [])
    return (
    <div className="w-full relative flex gap-1 items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg cursor-pointer" onClick={handelClick}>
        <Avatar currentUser={data}/>
        <div className=" min-w-0 flex-1">
            <div className=" focus:outline-0">
                <div className=" flex justify-between items-center mb-1">
                <p
                 className=" text-sm font-medium text-gray-900"
                >
                 {data.name}
                </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default userBox