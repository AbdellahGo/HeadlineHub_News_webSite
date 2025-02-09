import { LogoDarkMode, LogoLightMode, search, user } from "../../assets"
import { navBarLinks, qlinks } from "../../lib/constants"
import { Link, NavLink } from "react-router"
import { DropDawnMenu, MySocialMedia, NavBarMenu, SearchBar, ToolTip } from "../shared"
import { useAppContext } from "../../context/AppContext";
import { IoTrendingUp } from "react-icons/io5";


import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { container } from "../../clasess";


type props = {
  setNavBarHeight: Dispatch<SetStateAction<number | null>>
  navBarHeight: number | null
}

const NavBar = ({ setNavBarHeight, navBarHeight }: props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isNavBarMoved, setIsNavBarMoved] = useState(false)
  const [toggleSearchBar, setToggleSearchBar] = useState(false)
  const { handleSwitchTheme, isDarkMode, isAuthenticated } = useAppContext()

  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null)

  const handleToggleMenu = () => {
    setIsMenuVisible(prev => !prev);
    document.body.style.overflow = isMenuVisible ? 'auto' : 'hidden';
  };

  const handleClickOutsideToggleSearchbar = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setToggleSearchBar(false);
    }
  };

  const handleScroll = () => {
    if (headerRef.current) {
      setNavBarHeight(headerRef.current?.clientHeight)
    }
    if (window.scrollY > 80) {
      setIsNavBarMoved(true)
    } else {
      setIsNavBarMoved(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideToggleSearchbar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideToggleSearchbar);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.addEventListener('scroll', handleScroll)
  }, [])



  return (
    <header ref={headerRef} className={`fixed w-full`}>
      <div className="relative z-[9999999] bg-white xl:dark:bg-solid-white dark:bg-[#131518]">
        <div className={`w-full relative z-10 ${isNavBarMoved ? 'shadow-shadow-12 bg-[#fafafa] xl:dark:bg-[#111] dark:bg-[#131518]' : ''}`}>
          <div className={`${container}`}>
            <div className="flex items-center justify-between gap-20">
              <div className="links flex items-center gap-20 py-8">
                <div className="logo">
                  <Link to='/' className="relative group overflow-hidden transition duration-3 hover:opacity-[.66]">
                    <img src={isDarkMode ? LogoDarkMode : LogoLightMode} alt="logo" className="max-w-[190px] w-[190px] " />
                  </Link>
                </div>
                <nav className="Mxl:hidden">
                  <ul className="flex items-center gap-[5px]">
                    {navBarLinks.map((item, i) => (
                      <li key={i} className="font-notoSans flex items-center text-nav-color dark:text-white text-14 font-semibold">
                        {!item.type ? (
                          <NavLink to={item.link!} className="dark:hover:bg-[#282828] hover:bg-flex-gray-15 transition duration-3 py-[5px] px-12 whitespace-nowrap">
                            <span>{item.text}</span>
                          </NavLink>
                        ) : (
                          <DropDawnMenu menuName={item.type} items={item.more} />
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end gap-10">
                <div className="Mxl:hidden">
                  <NavLink to='/my-news' className={`my-nems  ${isDarkMode ? ' bg-[#282828] border-1 border-flex-gray-40' : 'bg-black'}   text-[11px] font-semibold fill-white text-white py-[7px] px-20
                       font-notoSans hover:bg-hyperlink-line-color transition duration-3`}>
                    My News
                  </NavLink>
                </div>
                <div className="px-[5px] Msm:hidden">
                  <ToolTip title={isAuthenticated ? 'Account' : 'Sign In'}>
                    <Link to={isAuthenticated ? '/account' : '/sign-in'}>
                      <img src={user} alt="user icon" className={` w-28 h-28 ${isDarkMode ? 'invert-[1] brightness-[100%]' : ''}`} />
                    </Link>
                  </ToolTip>
                </div>
                <div className="Msm:hidden pl-[5px] pr-[20px] relative" ref={searchBarRef}>
                  <span className="dark:block hidden absolute text-flex-gray-40 right-0 top-[40%] -translate-y-[40%]">|</span>
                  <ToolTip title="Search">
                    <button className="flex items-center" onClick={() => setToggleSearchBar(prev => !prev)}>
                      <img src={search} alt="search icon" className={`w-24 h-24 ${isDarkMode ? 'invert-[1] brightness-[100%]' : ''}`} />
                    </button>
                  </ToolTip>
                  <SearchBar setToggleSearchBar={setToggleSearchBar} toggleSearchBar={toggleSearchBar} />
                </div>
                <div>
                  <ToolTip title="Switch Theme">
                    <label className="ui-switch">
                      <input type="checkbox" checked={isDarkMode} onChange={handleSwitchTheme} />
                      <div className="slider">
                        <div className={`circle ${isDarkMode ? 'dark' : 'light'}`}></div>
                      </div>
                    </label>
                  </ToolTip>
                </div>
                <div className="xl:hidden block">
                  <label className="hamburger">
                    <input type="checkbox" checked={isMenuVisible} onChange={handleToggleMenu} />
                    <svg viewBox="0 0 32 32" height={30} width={30}>
                      <path stroke={isDarkMode ? 'white' : 'black'} className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                      <path stroke={isDarkMode ? 'white' : 'black'} className="line" d="M7 16 27 16"></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`xl:border-y-1 border-t-1 border-flex-gray-30 -z-[10] ${isNavBarMoved ? 'hidden' : 'block '}`}>
          <div className={`${container}`}>
            <div className="flex items-center justify-between">
              <ul className="qlinks-nav flex items-center Mxl:w-full Mlg:overflow-x-scroll py-6">
                <li className="leading-[1.5]">
                  <IoTrendingUp className="text-meta-fcolor dark:text-white" />
                </li>
                {qlinks.map(({ text, link }, i) => (
                  <li key={link} className="relative px-16 group">
                    {i + 1 !== qlinks.length && (
                      <span className='absolute top-1/2 -translate-y-1/2 right-[0] text-[0.7em] text-flex-gray-40'>|</span>
                    )}
                    <Link to={link} className="dark:text-white relative block min-w-max xl:hover:text-hyperlink-line-color transition duration-3 font-inter font-medium text-12">
                      {text}
                      <span className="block xl:hidden absolute  bottom-[-2px] w-full h-[2px] group-hover:bg-hyperlink-line-color" />
                    </Link>
                  </li>
                ))}
              </ul>
              <MySocialMedia
                containerStyles="xl:flex hidden items-center justify-end"
                iconStyles="text-black dark:text-white block px-[5px] text-[13px]" />
            </div>
          </div>
        </div>
      </div>
      <NavBarMenu isMenuVisible={isMenuVisible} navBarHeight={navBarHeight} setIsMenuVisible={setIsMenuVisible} />
    </header>
  )
}

export default NavBar