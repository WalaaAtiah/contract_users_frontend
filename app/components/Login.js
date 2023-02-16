"use client";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
// import Profile from "../profile/page";
import style from "../styles/login.module.css";
import home_img from 'public/assets/home.jpg';
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { tokens, login } = useContext(AuthContext);
  

  const usernameHandler = (e) => {
    console.log(e.target.value)
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitt')
    login({
      username,
      password,
    });
  };

  return (
    <>
    
       <div class={style.wp_caption}>
      <Image
                src={home_img}
                alt="background"
                className={style.demo} />
      <div class={style.wp_caption_text}>
        <div class="w-full h-full">
          <div class="leading-loose ml-96 pl-20 ">
            <form class="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl" onSubmit={submitHandler}>
              <div class="mb-4">
                <label class="block text-xl text-[#e5f2c4] mb-4" for="username">
                  UserName 
                </label>
                <input
                  class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white text-center"
                  type="username"
                  id="username"
                  aria-label="username"
                  required
                  onChange={usernameHandler}
                />
              </div>
              <div class="mt-2">
                <label class="block  text-xl text-[#e5f2c4] mb-4"> Password</label>
                <input
                  class="w-full px-5 py-1 text-gray-700 bg-gray-300 text-center rounded focus:outline-none focus:bg-white"
                  type="password"
                  id="password"
                  arial-label="password"
                  required
                  onChange={passwordHandler}
                />
              </div>

              <div class="mt-4">
                <button
                  class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                  type="submit"
                >
                  Login 
                </button>
                
              </div>
              <div class="mt-4">
                {/* <Link
                  class="px-4 py-3 text-white font-light tracking-wider bg-gray-700 hover:bg-gray-800 rounded"
                  href='/SignUp'
                >
                  إنشاء حساب جديد
                </Link> */}
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   
      {/* <h1>welcam {username}</h1> */}
       {/* <Profile/> */}
      
      
     
  
   </> 
  );
}
