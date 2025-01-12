"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import {Dialog, Transition} from "@headlessui/react"
import { MdClose } from "react-icons/md";
import Avatar from "@/components/userInformation/Avatar";
import { DeleteIcon, Trash } from "lucide-react";
interface ProfileDrawerProps {
    data : Conversation & {
        users : User[]
    };
    isOpen : boolean;
    onClose : () => void;
}


const ProfileDrawer = ({data , isOpen , onClose} : ProfileDrawerProps) => {
    const otherUser = useOtherUser(data);
    const joinedData = useMemo(() => {
        return format(new Date(otherUser.createdAt) , "PP")
    } , [otherUser.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser?.name;
    } , [data.name || otherUser?.name]);

    const statusText = useMemo(() => {
        if(data.isGroup){
            return `${data.users.length} عضو`
        };

        return "نشط";
    } , [])
   return (
    <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-500 " leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className=" fixed inset-0 overflow-hidden">
            <div className=" absolute inset-0 overflow-hidden">
                <div className=" pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                     as={Fragment}
                     enter="transform transition ease-in-out duration-500"
                     enterFrom="translate-x-full"
                     enterTo="translate-x-0"
                     leave="transform transition ease-in-out duration-500"
                     leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className=" pointer-events-none w-screen max-w-md" >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl" >
                               <div className=" px-4 sm:px-6">
                                 <div className="flex items-start justify-end">
                                 <div className='ml-3 flex h-7 items-center'>
                                    <button onClick={onClose} className=" rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" type="button" >
                                        <span className="sr-only">
                                            غلق
                                        </span>
                                        <MdClose size={24} />
                                    </button>
                                </div>    
                                </div> 
                                </div> 
                                <div className='relative mt-5 flex-1 px-4 sm:px-6'>
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2">
                                            <Avatar currentUser={otherUser}/>
                                        </div>
                                        <div>
                                            {title}
                                        </div>
                                        <div className=' text-sm text-gray-500'>
                                            {statusText}
                                        </div>
                                        <div className="flex gap-10 my-10">
                                            <div className="flex flex-col gap-2 items-center cursor-pointer hover:opacity-75" onClick={() => {}}>
                                                <div className=" w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                               <Trash size={25}/>
                                                </div>
                                                <div>
                                                    Delete
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </div>
        </Dialog>
    </Transition.Root>
  )
}

export default ProfileDrawer