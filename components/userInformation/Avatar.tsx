"use client";


import { User } from '@prisma/client'
import React from 'react'
import Image from 'next/image';


interface AvatarProps{
    currentUser : User;
}

const Avatar : React.FC<AvatarProps>= ({currentUser}) => {
  return (
   <div className=' relative'>
     <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
      <Image alt='avatar' fill src={currentUser?.image || "/user.png"} />  
    </div>
    <span
     className=' absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3'
    />
   </div>
  )
}

export default Avatar