import { createContext, useEffect, useState } from "react"
// 1.1 create the context
export const ThemeContext = createContext();

// 1.2 create the context wrapper (provider)
export default function ThemeWrapper({children}){

    const [isDarkTheme, setIsDarkTheme] = useState(true);

    function initialThemeHandle(){
        const mode = JSON.parse(localStorage.getItem('mode'))
        if (mode==false){
            // console.log(1,isDarkTheme)
            setIsDarkTheme(false)   
            document.querySelector("body").classList.remove("dark"); 
        }
        // take the initial value
        else{
        // console.log(2,isDarkTheme)
        isDarkTheme && document.querySelector("body").classList.add("dark"); // add dark class to the body element
    }}
    
    function toggleThemeHandler() {
        setIsDarkTheme(!isDarkTheme);
        document.querySelector("body").classList.toggle("dark"); // toggle dark class to the body element
        localStorage.setItem('mode', JSON.stringify(!isDarkTheme))
    }
    
    const globalState = {
        isDarkTheme: true,
        toggleThemeHandler
    }

    useEffect(()=>initialThemeHandle());

    return(
        <ThemeContext.Provider value={globalState}>
            {children}
        </ThemeContext.Provider>
    )

}