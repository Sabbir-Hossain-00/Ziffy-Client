import { Outlet } from "react-router"
import { Navbar } from "../../Components/Navbar/Navbar"
import { Footer } from "../../Components/Footer/Footer"

export const MainLayout = ()=>{
    return(
        <>
        <header>
            <Navbar/>
        </header>
        <main className="bg-gray-100 min-h-screen container mx-auto px-3 md:px-6 lg:px-8 xl:px-14">
            <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}