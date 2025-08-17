import { Outlet } from "react-router"
import { Navbar } from "../../Components/Navbar/Navbar"
import { Footer } from "../../Components/Footer/Footer"
import { use } from "react"
import { AuthContext } from "../../context/AuthContext"

export const MainLayout = ()=>{
    const {isDark} = use(AuthContext)
    return(
        <>
        <header>
            <Navbar/>
        </header>
        <main className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}