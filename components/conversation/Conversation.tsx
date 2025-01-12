"use client";

import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps{
    initialItems? : FullConversationType[];
}

const ConversationList = ({initialItems} : ConversationListProps) => {
  const [items , setItems] = useState(initialItems);
  const router = useRouter();

   const { conversationId , isOpen } = useConversation();

  return (
      <aside className={clsx("fixed  inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200" , isOpen ? "block w-full left-0" : "hidden")}>
        <div className="flex justify-between mb-4 pt-4">
          <div className=" text-2xl font-bold  text-neutral-500">
            الرسائل
          </div>
          <div
           className=" rounded-e-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        <div>
          {items?.map((item) => (
            <div
             key={item.id}
            > 
              <ConversationBox data={item} selcted={conversationId === item.id} />
            </div>
          ))}
        </div>
      </aside>
  )
}

export default ConversationList