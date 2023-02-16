import { createContext, useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
// 1.1 create the context
export const AuthContext = createContext();

// 1.2 create the context wrapper (provider)
export default function AuthWrapper({ children }) {

    const [globalState, SetGlobalState] = useState({
        tokens: null,
        login,
        logout,
        refresh,
        username: "",
    })

    useEffect(() => {
        SetGlobalState({
            tokens: localStorage.getItem("tokens"),
            login,
            logout,
            refresh,
            username: localStorage.getItem("username"),

        })

    }, [])

    async function login(userInfo) {
        const url = "http://127.0.0.1:8000/api/token/";
        try {

            const res = await axios.post(url, userInfo);

            SetGlobalState({
                tokens: res.data,
                login,
                logout,
                refresh,
                username: userInfo.username

            })

            localStorage.setItem("tokens", res.data);
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("username", userInfo.username);
        } catch {
            
            Swal.fire({
                icon: 'error',
                title: `Sorry, your username or password is incorrect`,
                showConfirmButton: false,
                timer: 1500
            })
            console.log('error2')
        }



    }

    async function logout() {
        SetGlobalState({
            tokens: null,
            login,
            logout,
            refresh,
            username: null,


        })

        localStorage.removeItem("tokens");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");


    }

    async function refresh(refresh) {

        const url = "http://127.0.0.1:8000/api/token/refresh/";
        try {

            const res = await axios.post(url, { "refresh": refresh })
                .then((res) => {
                    SetGlobalState({
                        tokens: res.data,
                        login,
                        logout,
                        refresh,
                        username: localStorage.getItem("username")

                    })
                    localStorage.setItem("access", res.data.access);
                })
                .catch((err) => {
                    console.log(err);
                });


        } catch {
            console.log("error")
        }

    }

    return (
        <AuthContext.Provider value={globalState}>
            {children}
        </AuthContext.Provider>
    )

}