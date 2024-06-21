import React from "react";
import { IconType } from "react-icons"

interface AuthSocialProps {
    icon : IconType,
    onClick : () => void;
    children?: React.ReactNode
}

const AuthSocial : React.FC<AuthSocialProps>= ({
    icon : Icon,
    onClick,
    children,
}) => {
  return (
    <button
    type="button"
    onClick={onClick}
    className=" inline-flex w-full justify-center bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset hover:bg-gray-50 focus:outline-offset-0"
    >
        <Icon />
    </button>
  )
}

export default AuthSocial