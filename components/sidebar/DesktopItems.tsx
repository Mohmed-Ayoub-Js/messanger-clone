"use client";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
interface DesktopItemsProps {
    lable: string,
    icon : any ,
    href: string,
    onClick? : () => void;
    active? : boolean;
    user : any;
    functions : any;
}
const DesktopItems : React.FC<DesktopItemsProps>= (
    {
        lable,
        icon : Icon,
        href,
        onClick,
        active,
        functions,
    } 
) => {
  const handelClick = () => {
    if(onClick){
        return onClick();
    }
  }
  return (
    <div onClick={handelClick}>
        <Link onClick={functions} href={href} className={clsx("flex group gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-bkacj hover:bg-gray-100" , active && 'bg-gray-100 text-black')}>
        <Icon className=' h-6 w-6'/>
         <span className=" sr-only">
            {lable}
         </span>
        </Link>
    </div>
  )
}

export default DesktopItems