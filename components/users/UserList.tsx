"use client";

import { User } from "@prisma/client"
import React from "react";
import UserBox from "./userBox";

interface userListProps {
    items : User[];
}
const UserList : React.FC<userListProps> = ({items} : userListProps) => {
    const dataArray = items;
  return (
    <aside
     className=" fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-auto border-r border-gray-200 block w-full left-0"
    >   
<div className=" px-5">
    <div className=" flex-col">
        <div className=" text-2xl font-bold text-neutral-800 py-4">
            المستخدمين
        </div>
    </div>
    {dataArray.map((item : any) => (
        <UserBox 
         key={item.id}
         data={item}
         
        />
    ))}
</div>

    </aside>
  )
}

export default UserList;