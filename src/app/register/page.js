   "use client"
   import Image from "next/image"
import googlelogo from "../../../public/googlelogo.png"
import pizzaslice from "../../../public/hd4.svg"
import { useState } from "react"
import Link from "next/link"
import {signIn} from "next-auth/react";
 


export default function RegisterPage() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [creatingUser, setCreatingUser] = useState(false);
    const [error, setError] = useState(false);


    //function for handle submit

   async function handleFormSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true)
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method:'POST',
            body: JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'}
        });
        if (response.ok) {
            setUserCreated(true);
          }
          else {
            setError(true);
          }
          setCreatingUser(false);
        
    }


    return(
        <div className="flex justify-evenly items-center ">
        <section>
            <Image  className="h-100 w-auto relative top-20" src={pizzaslice} alt="pixxa image" />
        </section>
      <section className="mt-32">
        <h1 className="text-center text-primary text-4xl">Register</h1>
        {userCreated && (
        <div className="my-4 text-center">
          User created.<br />
          Now you can{' '}
          <Link className="underline" href={'/login'}>Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className=" text-primary my-4 text-center">
          Seams User already exists..<br />
          Check the credentials again..<br />
          Or there can be an error
        </div>
      )}
        <form className="block max-w-sm mx-auto my-10" onSubmit={handleFormSubmit}>
            <input type="email" placeholder="email" value={email} disabled={creatingUser} onChange={ev => setemail(ev.target.value)} />
            <input type="password" placeholder="password" value={password} disabled={creatingUser} onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit" className="mt-3" disabled={creatingUser}>Resister</button>
            <div className="my-4 text-center text-gray-500">
                or login with Provider

            </div>
            <button type="button" onClick={()=> signIn('google',{callbackUrl:'/'})}  className="flex items-center gap-3 justify-center"><Image className="h-7 w-auto" src={googlelogo} alt="google logo " />Login with Google</button>
            <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{' '}
          <Link className="underline" href={'/login'}>Login here &raquo;</Link>
        </div>
        </form>

        <div>
        </div>
      </section>
      </div>
        )
}