import { Link } from "react-router"
import { navBarMenuLinks } from "../../lib/constants"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SearchBar, MySocialMedia } from "../shared"
import { useAppContext } from "../../context/AppContext"

type props = {
  isMenuVisible: boolean
  navBarHeight: number | null
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>
}

const NavBarMenu = ({ isMenuVisible, navBarHeight, setIsMenuVisible }: props) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const { isAuthenticated, user: { name } } = useAppContext()


  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`xl:hidden block transition duration-4 ${isMenuVisible ? ' translate-x-0 opacity-1' : 'translate-y-[-2300px]'} absolute w-full overflow-y-auto bg-white dark:bg-[#191c20] top-full`}
      style={{ height: `${windowHeight - navBarHeight!}px` }}>
      <div className="pt-15 min-h-max">
        <div className="h-fit">
          <SearchBar isInsideNavBarMenu />
          <div className="px-20">
            <ul>
              {navBarMenuLinks.map(({ title, links }, i) => (
                <li key={title} className={`${i != 0 ? 'mt-20' : ''}`}>
                  <h3 className="text-black dark:text-white py-10 font-notoSans font-normal text-[13px]">
                    {title}
                  </h3>
                  <ul className="flex flex-wrap pt-[5px] border-t-1 border-subnav-color-12 dark:border-subnav-color-10 ">
                    {links.map(({ text, link }) => (
                      <li key={link} className="basis-1/2">
                        <Link to={link} className="text-black dark:text-white hover:text-hyperlink-line-color transition 
                                    duration-3 font-notoSans font-medium text-14 block py-[7px] w-full"
                          onClick={() => setIsMenuVisible(prev => !prev)}>
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-20 mt-20 relative flex gap-15 w-full flex-col">
            <span className="absolute z-1 top-0 right-0 left-0 overflow-hidden h-[1px] border-1 border-dashed border-subnav-color-12 dark:border-subnav-color-10" />
            <div className="flex items-center justify-between flex-wrap gap-20">
              <span className="dark:text-white block font-notoSans text-[13px] font-semibold break-words">
                {isAuthenticated ? `Manage your account, ${name}` : 'Have an existing account?'}
              </span>
              <Link to={isAuthenticated ? '/account' : '/sign-in'} className="font-notoSans font-semibold text-12 leading-[30px] px-20 text-white bg-black dark:bg-flex-gray-40 hover:bg-hyperlink-line-color"
                onClick={() => setIsMenuVisible(prev => !prev)}>
                {isAuthenticated ? 'My Account' : 'Sign In'}
              </Link>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-20 pt-15 border-t-1 border-flex-gray-15">
              <span className="dark:text-white text-black break-words font-notoSans text-[13px] font-semibold">Follow Me</span>
              <MySocialMedia
                containerStyles="flex items-center justify-end"
                iconStyles="text-black dark:text-white block px-12 text-16" />
            </div>
          </div>
        </div>
        <div className="p-[15px_15px_150px_15px] dark:bg-subnav-color-10 bg-subnav-color-12">
          <p className="dark:text-white font-dmSans text-qlink-color text-[13px] leading-[22px] opacity-[0.7]">
            &copy; 2025{" "}
            <a href="https://github.com/AbdellahGo/HeadlineHub_News_webSite" className="inline-block text-hyperlink-line-color font-bold">HeadlineHub</a>
            . Developed by {" "}
            <a href={'https://github.com/AbdellahGo'} className="inline-block text-hyperlink-line-color font-bold">AbdellahGX</a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NavBarMenu