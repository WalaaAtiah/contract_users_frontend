import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from 'app/contexts/theme.js'
import { AuthContext } from 'app/contexts/auth.js'
import "./header.css"
import { Icon } from '@iconify/react';

export default function Header() {
    const { isDarkTheme, toggleThemeHandler } = useContext(ThemeContext)
    const { tokens, logout } = useContext(AuthContext);
    // console.log(useContext(ThemeContext));
    const logoutHandler = () => {
        console.log('logout')
        logout();
      };
   

    return (
        <header className='dark:shadow-[0_10px_30px_10px_rgba(250,250,250,0.3)] '>
            <nav className='flex flex-wrap items-center  bg-[#251749]  px-28 '>
                <Link className='inline-flex items-center px-2 mr-4' href='/'>
                    <Image
                        src="/assets/logo.png"
                        width={70}
                        height={50}
                        alt="logo"
                    >
                    </Image>

                    <span className='px-3 py-2 ml-5 text-xl tracking-wide text-[#FFFBEB] uppercase rounded-lg  font-bold hover:bg-[#495579] '>Contract Users</span>
                </Link>
                <section className='hidden w-full lg:inline-flex lg:flex-grow lg:w-auto'>
                    <section className='flex flex-col items-start w-full lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center lg:h-auto'>
                        <Link className='items-center text-lg justify-center w-full mx-3 px-3 py-2 text-[#FFFBEB]   lg:inline-flex lg:w-auto rounded-lg  font-bold hover:bg-[#495579]' href='/'>Home</Link>
                        {tokens&&
                        
                        <Link className='items-center text-lg justify-center w-full mx-3 px-3 py-2 text-[#FFFBEB]   lg:inline-flex lg:w-auto rounded-lg  font-bold hover:bg-[#495579]' href='' onClick={logoutHandler}>Log Out</Link>
                        }
                        {/* <button
                            type="button"
                            className="py-1 sm:py-2.5 px-2 sm:px-5 mr-2 bg-zinc-300 text-black dark:bg-slate-800 dark:text-white rounded"
                            onClick={toggleThemeHandler}
                        >Toggel Theme</button> */}

                        <center>
                            <input type="checkbox" id="switch"
                                class="checkbox" />
                            <label for="switch" class="toggle" onClick={toggleThemeHandler} >


                                <p className='flex '>
                                    <Icon icon="material-symbols:clear-night" width="40" />

                                    <Icon icon="noto-v1:sun-with-face" width="40" />

                                </p>


                            </label>
                        </center>


                    </section>
                </section>
            </nav>
        </header>
    )
}