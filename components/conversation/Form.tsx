"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "../ui/inputs/MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import {CldUploadButton} from "next-cloudinary"

const Form = ({params} : any) => {
  const {conversationId} = useConversation();

  const {register,handleSubmit,setValue,formState : {errors}} = useForm<FieldValues>({
    defaultValues : {
        message:'',
    }
  });
  const onSubmit : SubmitHandler<FieldValues> = (data) => {
    setValue('message' , '' , {shouldValidate:true});
    console.log(params);
    
    axios.post("/api/messages" , {
        ...data,
        conversationId : params,
    }).then((res) =>{
      console.log(res);
      
    }).catch((err) => {
      console.log(err);
      
    })
  }
  const handelUpload =(resault : any) => {
    axios.post("/api/messages" , {image: resault?.info?.secure_url , conversationId : params})
  }
  return (
    <div className="py-4 px-4 bg-white border-t items-center gap-2 lg:gap-4 w-full flex">
        <CldUploadButton
         options={{maxFiles:1}}
         onUpload={handelUpload}
         uploadPreset="wr8clrjo"
        >
        <HiPhoto size={30} className=" text-sky-500"/>
        </CldUploadButton>

        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
        >
            <MessageInput 
            id="message"
            register={register}
            erros={errors}
            required
            placeholder="كتابة رسالة"
            />
            <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
                <HiPaperAirplane size={18} className=" text-white" />
            </button>
        </form>
    </div>
  )
}

export default Form