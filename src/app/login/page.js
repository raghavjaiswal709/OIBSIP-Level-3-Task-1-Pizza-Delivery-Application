"use client"
import {signIn} from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import googlelogo from "../../../public/googlelogo.png"
import pizzaslice from "../../../public/hd4.svg"
import { useState } from "react"

export default function LoginPage(){
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProcess, setLoginInProcess] = useState('');

        async function handelFormSubmit(ev){
            ev.preventDefault();
            setLoginInProcess(true);
            await signIn('credentials',{email, password, callbackUrl:'/'})
             setLoginInProcess(false);

    }

    return(
        <div className="flex justify-evenly items-center ">
            <section>
            <Image  className="h-100 w-auto relative top-20" src={pizzaslice} alt="pixxa image" />
        </section>
        <section className="mt-32 flex justify-evenly items-center flex-col">
            <h1 className="text-center text-primary mb-10 text-4xl">Login</h1>
            <form className=" block max-w-96 mx-auto" onSubmit={handelFormSubmit}>
            <input type="email" name="email" placeholder="email" value={email} disabled={loginInProcess} onChange={ev => setemail(ev.target.value)} />
            <input type="password" className="mb-10" name="password" placeholder="password" value={password} disabled={loginInProcess} onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit" className="mt-3" disabled={loginInProcess}>Login</button>
            <div className="my-4 text-center text-gray-500">
                or login with Provider

            </div>
            <button    type="button" onClick={()=> signIn('google',{callbackUrl:'/'})} className="flex items-center gap-3 justify-center"><Image className="h-7 w-auto" src={googlelogo} alt="google logo " />Login with Google</button>
            <div className="text-center my-4 text-gray-500 border-t pt-4">
          don't have an account?{' '}
          <Link className="underline" href={'/register'}>Register here &raquo;</Link>
        </div>
        </form>

        </section>
        </div>
    )
}