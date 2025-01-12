"use client";

import useRoutes from "@/hooks/useRoutes";
import React, { useState } from "react";
import DesktopItems from "./DesktopItems";
import { User } from "@prisma/client";
import Avatar from "../userInformation/Avatar";
interface DesktopSideBarProps {
    currentUser? : any;
}

const DesktopSideBar : React.FC<DesktopSideBarProps> = ({
    currentUser
} : DesktopSideBarProps) => {
const routes = useRoutes();
const [isOpen , setIsOpen] = useState(false);
console.log({currentUser});

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav
         className=" mt-4 flex flex-col justify-between"
        >
         <ul
          role="list"
          className="flex flex-col items-center space-y-1"
         >  
            {routes.map((item) => (
                <DesktopItems functions={item.function} icon={item.icon} lable={item.lable} href={item.href} user={undefined} />
            ))}
         </ul>
        </nav>
        <nav className=" mt-4 flex flex-col justify-between items-center">
            <div
             onClick={() => {
                setIsOpen(true);
             }}
             className=" cursor-pointer hover:opacity-75 transition"
            >
                <Avatar currentUser={currentUser} />

            </div>
        </nav>
    </div>
  )
}

export default DesktopSideBar