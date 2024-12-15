import { LogoLightMode } from "../../assets"
import { navBarLinks } from "../../lib/constants"
import { Link } from "react-router"




const NavBar = () => {
  return (
    <header>
      <div className="md:max-w-[1400px] w-full  m-auto px-20">
        <div className="flex items-center justify-between gap-20">
          <div className="flex items-center gap-20 py-8">
            <div className="logo">
              <Link to='/' className="relative group overflow-hidden">
                <span className="absolute transition duration-3 group-hover:bg-[#eeeeee44] w-full h-full" />
                <img src={LogoLightMode} alt="logo" className="max-w-[190px] w-[190px] " />
              </Link>
            </div>
            <nav>
              <ul className="flex items-center gap-20">
                {navBarLinks.map((item, i) => (
                  <li key={i} className="font-inter flex items-center text-nav-color text-14 font-semibold">
                    {!item.type ? (
                      <Link to={item.link!} className="hover:bg-flex-gray-15 transition duration-3 py-[5px] px-12 whitespace-nowrap">
                        <span>{item.text}</span>
                      </Link>
                    ) : (
                      <div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>

          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar