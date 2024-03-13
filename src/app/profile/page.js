"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from '../../components/layout/Tabs'

export default function ProfilePage() {
  const session = useSession();

  // console.log(session);
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const { status } = session;
  const [phone, setPhone]= useState('');
  const [streetAddress, setSreetAddress]= useState('');
  const [postalCode, setPostalCode]= useState('');
  const [city, setCity]= useState('');
  const [country, setCountry]= useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);


  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
     fetch('/api/profile').then(response => {
        response.json().then(data =>{
            setPhone(data.phone);
            setSreetAddress(data.streetAddress),
            setPostalCode(data.postalCode);
            setCity(data.city);
            setCountry(data.country);
            setIsAdmin(data.admin);
            setProfileFetched(true);
        })
     }); 
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ 
            name: userName, 
            image,
            streetAddress,
            phone,
            postalCode,
            city,
            country, 
        }),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "User info updated!",
      error: (err) => "Error",
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      await toast.promise(
        fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (response.ok) {
            return response.json().then((link) => {
              setImage(link);
            });
          }
          throw new Error("Something went wrong");
        }),
        {
          loading: "Uploading",
          success: "Upload Complete",
          error: "Upload error",
        }
      );
    }
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return "redirecting to login page";
  }

  return (
    <section className="mt-8">
    <UserTabs isAdmin={isAdmin} />
      <h1 className="text-center text-primary text-4xl mt-20 mb-4"></h1>
      <div className="max-w-lg mt-20 mx-auto">
        <div className="flex gap-4 ">
            
          <div className="flex flex-col gap-7 max-w-[120px] ">
            {image && (
              <Image
                src={image}
                className="rounded-lg"
                width={425}
                height={425}
                alt="profile photo"
              ></Image>
            )}
            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block border rounded-lg p-2 text-center border-gray-700 cursor-pointer">
                Edit
              </span>
            </label>
            {/* <button type="button" className="">Edit</button> */}
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
          <label>
          First and last name
        </label>
            
            <input
              type="text"
              placeholder="first and last name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>
                email
        </label>
            <input
              type="email"
              disabled={true}
              value={session.data.user.email}
            />
            <label>
          Street
        </label>
            <input type="text" placeholder="Street Address" value={streetAddress} onChange={ev=>setSreetAddress(ev.target.value)} />
            <label>
          Phone
        </label>
            <input type="tel" placeholder="Phone Number" value={phone} onChange={ev=>setPhone(ev.target.value)} />
            <div className="flex gap-4">
                <div>
            <label>
          City
        </label>
            <input type="text" placeholder="City" value={city} onChange={ev=>setCity(ev.target.value)} />
            </div>
            <div>
            <label>
          Postal code
        </label>
            <input type="text" placeholder="Postal code" value={postalCode} onChange={ev=>setPostalCode(ev.target.value)} />
            </div>
            </div>
            <label>
          Country
        </label>
            <input type="text" placeholder="Country" value={country} onChange={ev=>setCountry(ev.target.value)} />
            {/* <input type="text" placeholder="Street Address"></input> */}
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
