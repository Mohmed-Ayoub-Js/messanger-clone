"use client";

import { FullMessageType } from "@/types";
import { useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
  messages : FullMessageType;
  props : string;
}

const Body = ({messages , props} : BodyProps) => {
  const [messagesState , setMessage] = useState<any>(messages);
  const buttonRef = useRef<HTMLDivElement>(null);
   
  return (
    <div className=" flex-1 overflow-auto">
      {messagesState.map((message : any, i : any) => (
        <div> 
          <MessageBox 
           isLast = {i === messagesState.length - 1}
           key={message.id}
           data ={message}
          />
        </div>
      ))}
      <div ref={buttonRef} className=" pt-24"/>
    </div>
  )
}

export default Body