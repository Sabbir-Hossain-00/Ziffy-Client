import { Link } from "react-router"

export const LogoZiffy = ()=>{
    return(
        <Link to="/">
          <div className="flex items-center">
            <img className="w-13" src="https://i.ibb.co/fdV6gwQD/Chat-GPT-Image-Jul-16-2025-12-27-06-AM.png" alt="" />
          <h1 className="text-2xl font-semibold mb-2">Ziffy</h1>
          </div>
        </Link>
    )
}