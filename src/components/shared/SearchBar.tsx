import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from "react";
import { search } from "../../assets"
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";

type props = {
    toggleSearchBar?: boolean
    isInsideNavBarMenu?: boolean
    setIsMenuVisible?: Dispatch<SetStateAction<boolean>>
    setToggleSearchBar?: Dispatch<SetStateAction<boolean>>
}

const SearchBar = ({ setToggleSearchBar, toggleSearchBar, isInsideNavBarMenu, setIsMenuVisible }: props) => {
    const navigate = useNavigate()
    const searchBarRef = useRef<null | HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { setSearchQuery } = useAppContext()

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()
        const searchValue = inputRef.current?.value
        if (searchValue) {
            setSearchQuery(searchValue)
            inputRef.current!.value = ''
            navigate('/search')
            if (setIsMenuVisible) {
                setIsMenuVisible(false)
            }
        }
        if (setToggleSearchBar) {
            setToggleSearchBar(false)
        }
    }

    useEffect(() => {
        let hideElement: ReturnType<typeof setTimeout>;
        if (!toggleSearchBar) {
            hideElement = setTimeout(() => {
                if (searchBarRef.current) {
                    searchBarRef.current.style.visibility = 'hidden';
                }
            }, 400);
        } else {
            if (searchBarRef.current) {
                searchBarRef.current.style.visibility = 'visible';
            }
        }
        return () => {
            clearTimeout(hideElement);
        };
    }, [toggleSearchBar])

    return (
        <div>
            <div ref={!isInsideNavBarMenu ? searchBarRef : null}
                className={`${isInsideNavBarMenu ? 'px-20 mb-15' : `shadow-shadow-12 absolute right-[-65px] top-[35px] transition duration-4 z-[99999] 
                                border-1 border-subnav-color-10 dark:border-none bg-white dark:bg-dark-accent bg  w-[340px] p-[5px]
                                ${toggleSearchBar ? 'opacity-1 translate-y-0' : 'translate-y-[40px] opacity-0'}`}`}>
                {isInsideNavBarMenu && (<span className="block mb-15 font-notoSans text-[15px] font-bold text-black dark:text-white leading-[22px]">Search</span>)}
                <form className="relative w-full" onSubmit={handleSubmitForm}>
                    <div className={`flex items-center relative
                            ${isInsideNavBarMenu ? 'border-1 border-flex-gray-15' : ''}
                            `}>
                        <span className={`${isInsideNavBarMenu ? 'opacity-[0.5]' : ''} block mx-[10px]`}>
                            <img src={search} alt="search" className={`w-16 h-16 dark:invert-[1] dark:brightness-[100%]`} />
                        </span>
                        <button className="z-10 absolute right-[15px] ">
                            <IoArrowForwardCircleOutline className=" dark:text-white font-semibold text-[18px]" />
                        </button>
                        <input ref={inputRef}
                            className={`w-full bg-white outline-none border-none font-dmSans text-14 
                                        dark:bg-dark-accent dark:placeholder:text-white dark:text-white
                                        ${isInsideNavBarMenu ? 'py-12' : 'py-8'
                                }`}
                            type="text" placeholder="Search Headlines, News..." />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar