"use client";
import { useCallback , useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Conversation , Message , User } from "@prisma/client";
import {format} from "date-fns";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "../userInformation/Avatar";
interface ConversationBoxProps{
   data : FullConversationType;
   selcted?:boolean;
}

const ConversationBox = (
    {data , selcted} : ConversationBoxProps
) => {
    const othUser : User | undefined  = useOtherUser(data);
    const [dataUser , setDataUser] = useState<User>();
    useEffect(() => {
        setDataUser(othUser);
    } , [])
    console.log(othUser);
    
    const session = useSession();
    const router = useRouter();
    const handelClick = useCallback( () => {
        router.push(`/conversation/${data.id}`)
    } , [data.id , router] );
    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    } , []);
    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);
    const HasSeend = useMemo(() => {
        if(!lastMessage){
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if(!userEmail) {
            return false;
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0;
    } , [userEmail , lastMessage]);

    const lastMessageText = useMemo(()=> {
        if(lastMessage?.image){
            return "رسل صورة"
        }
        if(lastMessage?.body){
            return lastMessage.body;
        }

        return "بدأ المحادثة";
    } , [lastMessage]);
  return (
    <div className={clsx("w-full  p-5 relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer" , selcted ? 'bg-neutral-100' : 'bg-white')} onClick={handelClick}>
        <Avatar currentUser={othUser}/>
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
                <p className="text-md font-medium text-gray-900">
                {data.name || dataUser?.name}
                </p>
                    {lastMessage?.createdAt && (
                        <p
                         className=" text-xs text-gray-400 font-light "
                        >
                            {format(new Date(lastMessage.createdAt) , "p")}
                       </p>
                    )}
            </div>
            <p
             className={clsx(" truncate text-sm " , HasSeend ?  'text-gray-500':'text-black font-medium')}
            >
                {lastMessageText}
            </p>
          </div>
        </div>
    </div>
  )
}

export default ConversationBox