import React, { FormEvent, useState } from "react";

import { AiFillGoogleCircle } from "react-icons/ai";

import { signIn, signOut } from "next-auth/react";

import { ToastContainer, toast } from "react-toastify";

import Router from "next/router";


const LoginSection = () => {
  const [email, setEmail] = useState("");

  const [psswd, setPsswd] = useState("");

  const handleClickLogin = (e: FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: psswd,
      name:"gabriel",
      redirect: false,
    }).then((res) => {
      if(res?.ok){
        console.log(res)
        Router.push("/home")
      }else{
        console.log(res)
        toast.error("⚠ Dados incorretos!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  return (
    <div className="w-screen h-full flex justify-center items-center">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md md:w-[30vw] space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Faça seu login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{" "}
              <a
                href="/createAccount"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                crie sua conta
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Senha"
                  onChange={(e) => {
                    setPsswd(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={(e) => {
                  handleClickLogin(e);
                }}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
