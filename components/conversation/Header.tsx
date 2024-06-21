"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import Avatar from "../userInformation/Avatar";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "../ui/drawer/ProfileDrawer";

interface HeaderProps {
    convseration : Conversation;
}

const Header : React.FC<HeaderProps> = ({convseration} : any) => {
  const otherUser = useOtherUser(convseration);
  const [dataUser , setDataUser] = useState<User>();
  const [drawerOpen , setDrawerOpen] = useState(false);
  useEffect(() => {
      setDataUser(otherUser);
  } , [])
  const statusText = useMemo(() => {
    if(convseration.isGroup){
        return `${convseration.users.length} مستخدم`
    }
    return "نشط";
  }
   , [])
  return (
    <>
    <div>
        <ProfileDrawer 
         data={convseration}
         isOpen={drawerOpen}
         onClose={() => setDrawerOpen(false)}
        />
    </div>
    <div className=" bg-white w-full flex border-b-[1px] py-3 sm:px-4 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className=" flex gap-3 items-center">
            <Link 
            className="lg:hidden block text-sky-500 hover:bg-sky-600 transition cursor-pointer"
            href="/conversation">
               <HiChevronLeft size={32}/>
            </Link>
            <Avatar currentUser={convseration}/>
            <div className="flex flex-col">
                <div>
                    {convseration.name || dataUser?.name}
                </div>
                <div className=" text-sm font-light text-neutral-400">
                    {statusText}
                </div>
            </div>
        </div>
        <HiEllipsisHorizontal 
         size={32}
         onClick={() => {setDrawerOpen(true)}}
         className=" text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
    </div>
    </>
  )
}

export default Header