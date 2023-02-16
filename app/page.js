"use client"
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useContext } from 'react'
import  Main  from './components/Main'
import  Login  from './components/Login'
import { AuthContext } from "./contexts/auth";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {tokens} = useContext(AuthContext);

  return (
    <main className={styles.main}>

      {tokens? 
      
      <Main/>
      :
      <Login/>
      }



  
    </main>
  )
}
