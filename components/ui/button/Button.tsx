"use client";
import clsx from "clsx";
import React from "react";
interface ButtonProps{
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth? : boolean;
    children?: React.ReactNode;
    onClick? : () => void;
    secondary? : boolean;
    disabeld?: boolean;
    danger? : boolean;
}
const Button : React.FC<ButtonProps> = (
    {
        type,
        fullWidth,
        children,
        onClick,
        secondary,
        danger,
        disabeld
    }
) => {
  return (
    <button
    onClick={onClick}
    type={type}
    disabled={disabeld}
    className={clsx("flex justify-center rounded-md px-2 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ", 
    disabeld && "opacity-15 cursor-default" , 
    fullWidth && "w-full" , secondary ? ' text-gray-900' : 'text-white' , 
    danger && " bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
    !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
    )}
    >
        {children}
    </button>
  )
}

export default Button