"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps{
    placeholder?: string;
    id: string;
    type?:string;
    required:boolean;
    register: UseFormRegister<FieldValues>
    erros: FieldErrors


}

const MessageInput = ( {
    placeholder,
    id,
    type,
    register,
    required,
    erros,
} : MessageInputProps ) => {
  return (
    <div className=" relative w-full">
        <input id={id} type={type} autoComplete={id} {...register(id , {required})} placeholder={placeholder} className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-lg focus:outline-none"/>
    </div>
  )
}

export default MessageInput