'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

 export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    
    // console.log(session);
    const [userName , setUserName] = useState('');

    useEffect(() => {
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
        }
    },[session,status])

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
      const response = await fetch('/api/profile',{
            method: 'PUT',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({name:  userName})
        })
    }


    if(status==='loading'){
        return 'Loading...';

    }

    if(status=== 'unauthenticated'){
        return 'redirecting to login page'
    }

    const userImage = session.data.user.image;

    return(
        <section>
            <h1 className="text-center text-primary text-4xl mt-20 mb-4">Profile</h1>
            <div className='max-w-md mx-auto '>
                <div className="flex gap-5 items-center">
               
                <div className="flex flex-col gap-7">
                <Image src={userImage} className="rounded-full" width={125} height={125} alt="profile photo"></Image>
                <button type="button" className="">Edit</button>
                </div>
                <form className="grow" onSubmit={handleProfileInfoUpdate}>
                    <input type="text" placeholder="first and last name" value={userName} onChange={ev => setUserName(ev.target.value)} />
                    <input type="email" disabled={true} value={session.data.user.email} /> 
                    <button type="submit">Save</button>
                </form>
                </div>
            </div>
        </section>
    )
 }