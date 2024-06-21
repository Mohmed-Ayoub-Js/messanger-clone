"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/inputs/Input";
import Button from "../ui/button/Button";
import AuthSocial from "./AuthSocial";
import {  BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
type variant = "LOGIN" | "REGISTER";
import {signIn, useSession} from "next-auth/react";
import { Session } from "inspector";
import { useRouter } from "next/navigation";

const AuthForm = () => {
  const sesion = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<variant>("LOGIN");
  const [loading, setLoading] = useState(false);  
  useEffect(() => {
    if(sesion?.status === "authenticated"){
      router.push("/users");
    }
  } , [sesion])
  const ToggleVarient = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (variant == "REGISTER") {
      
      console.log(data);
      try{
       await axios.post("/api/register" , data).then(() => {
        signIn('credentials' , data)
       })
        .catch((err) => {
         toast.error("حدث خطأ ما")
        }).finally(() => {
          setLoading(false);
        })
      }
      catch(err){
        console.log(`[COMPONENT_AUTH_AUTHFORM] : ${err}`);
      }
    }
    if (variant == "LOGIN") {
      //axios login
      signIn("credentials" , {
        ...data,
        redirect:false,
      }).then((callback) => {
        if(callback?.error){
          toast.error("حدث مشكلة ما");
        }
        if(callback?.ok && !callback?.error){
          toast.success("تم تسجيل الدخول بنجاح");
          router.push("/users");

        }
      }).catch((err) => {console.log(err);
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const socialAciotn = (action: string) => {
    setLoading(true);
    signIn(action , {redirect:false}).then((callback) => {
      if(callback?.error){
        toast.error("حدث مشكلة ما");
      }
      if(callback?.ok && !callback?.error){
        toast.success("تم تسجيل الدخول في حسابك على جوجل بنجاح");
        router.push("/users");

      }
    }).finally(() => {
      setLoading(false);
    });
  };
  return (
    <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className=" bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              register={register}
              
              lable="اسم المستخدم"
              errors={errors}
              disabaled={loading}
            />
          )}
          <Input
            id="email"
            register={register}
            lable="البريد الالكتروني"
            type="email"
            errors={errors}
            disabaled={loading}

          />
          <Input
            id="password"
            register={register}
            lable="كلمة السر"
            type="password"
            errors={errors}
            disabaled={loading}

          />
          <Button
          disabeld={loading}
          fullWidth
          type="submit"
          >
            {variant == "LOGIN" ? ' تسجيل الدخول' : 'انشاء الحساب'} 
          </Button>
        </form>
        <div className=" mt-6">
          <div className=" relative">
            <div
             className=" absolute inset-0 flex items-center"
            >
              <div
               className="w-full border-t border-gray-300"
              />
            </div>
            <div
             className=" relative flex justify-center text-sm"
            >
              <span
                className=" bg-white px-2 text-gray-500"
               >
                او الاستمرار باستخدام 
               </span>
            </div>
          </div>
          <div
           className=" mt-5 flex gap-2"
          >
            <AuthSocial 
             icon={BsGoogle}
             onClick={() => {
              socialAciotn("google")
             }}
            />
          </div>
        </div>
        <div className=" flex  gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN" ? 'جديد في منصة المحادثة ؟' : 'لديك حساب بالفعل ؟' }
          </div>
          <div
           onClick={ToggleVarient}
           className='underline cursor-pointer'
          >
            {variant === "LOGIN" ? "انشاء خساب" : "تسجيل في حسابك " }

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
