"use client"
import './globals.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthWrapper from "./contexts/auth";
import ThemeWrapper from "./contexts/theme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <ThemeWrapper>

      <AuthWrapper>
        <body>

          <Header />



          <main >{children}</main>


          <Footer />
        </body>
      </AuthWrapper>
      </ThemeWrapper>
    </html>
  )
}
