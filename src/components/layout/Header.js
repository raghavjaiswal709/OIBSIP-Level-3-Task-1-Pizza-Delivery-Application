"use client"

import {signOut, useSession} from "next-auth/react";
import Image from 'next/image'
import Link from 'next/link'
import {useContext, useState} from "react";


export default function Header(){
  const session = useSession();
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if(userName && userName.includes(' ')){
    userName= userName.split(' ')[0];
  }
  const status = session.status;
    return(
        <header className='flex items-center justify-between'>
      <Link className='text-primary font-bold text-3xl' href=''>Tandoori Twist </Link>
      <nav className='flex gap-8 text-gray-800 items-center'>
        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
        {/* <Link href={''} className='bg-primary rounded-full text-white px-8 py-2'>Login</Link> */}
      </nav>
      <nav className='flex gap-7 items-center '>
        {status === 'authenticated' &&(
          <>
          <Link href="/profile" className="whitespace-nowrap" > 
           Hello, {userName}</Link>
                <button onClick={() => signOut()} href={'/register'} className='bg-primary rounded-full text-white px-8 py-2'>Logout</button>
                </>
        )}
        {status === 'unauthenticated' &&(
          <>
            <Link href={'/login'}>Login</Link>

            <Link href={'/register'} className='bg-primary rounded-full text-white px-8 py-2'>Register</Link>
            </>
        )}
      {/* <Link href={'/login'}>Login</Link>
      

      <Link href={'/register'} className='bg-primary rounded-full text-white px-8 py-2'>Register</Link> */}

    </nav>
    </header>

    
    );
}