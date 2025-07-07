import { Outlet } from "react-router"
import { Navbar } from "../../Components/Navbar/Navbar"
import { Footer } from "../../Components/Footer/Footer"

export const MainLayout = ()=>{
    return(
        <>
        <header>
            <Navbar/>
        </header>
        <main className="min-h-screen">
            <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}