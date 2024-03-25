'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import pizzaslice from "../../../public/hd4.svg";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', { email, password, callbackUrl: '/' });

    setLoginInProgress(false);
  }

  return (
    <div className="flex justify-evenly items-center">
      <section className="hidden md:block">
        {/* Render pizza image only on medium and larger screens */}
        <Image className="h-100 w-auto relative top-20" src={pizzaslice} alt="pizza image" />
      </section>
      <section className="mt-8 w-[400px]">
        <h1 className="text-center text-primary text-4xl mb-4">
          Login
        </h1>
        <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
          <input type="email" name="email" placeholder="email" value={email}
            disabled={loginInProgress}
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password" name="password" placeholder="password" value={password}
            disabled={loginInProgress}
            onChange={ev => setPassword(ev.target.value)} />
          <button disabled={loginInProgress} type="submit">Login</button>
          <div className="my-4 text-center text-gray-100">
            or login with provider
          </div>
          <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex gap-4 justify-center">
            <Image src={'/google.png'} alt={''} width={24} height={24} />
            Login with google
          </button>
        </form>
      </section>
    </div>
  );
}
