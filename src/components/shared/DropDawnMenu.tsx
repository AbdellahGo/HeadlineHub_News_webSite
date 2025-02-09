import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
    menuName: string,
    items: {
        link: string,
        text: string
    }[]
}

const DropDawnMenu = ({ menuName, items }: Props) => {
    const dropDownMenuRef = useRef<null | HTMLDivElement>(null)
    const [dropDownMenu, setDropDownMenu] = useState(false)

    useEffect(() => {
        let hideElement: ReturnType<typeof setTimeout>;
        if (!dropDownMenu) {
            hideElement = setTimeout(() => {
                if (dropDownMenuRef.current) {
                    dropDownMenuRef.current.style.visibility = 'hidden';
                }
            }, 300);
        } else {
            if (dropDownMenuRef.current) {
                dropDownMenuRef.current.style.visibility = 'visible';
            }
        }
        return () => {
            clearTimeout(hideElement);
        };
    }, [dropDownMenu])


    return (
        <div className="relative"
            onMouseLeave={() => setDropDownMenu(false)}>
            <button onMouseEnter={() => setDropDownMenu(true)} className="dark:hover:bg-[#282828] hover:bg-flex-gray-15 transition duration-3 py-[5px] px-12 whitespace-nowrap">
                <span className="flex items-center font-notoSans capitalize text-nav-color dark:text-white text-14 font-semibold">
                    {menuName}
                    <MdOutlineKeyboardArrowDown size={16} className={`transition duration-3 ${dropDownMenu ? 'rotate-180' : 'rotate-0'}`} />
                </span>
            </button>
            <div ref={dropDownMenuRef} className={`flex gap-[5px] absolute max-w-[210px] w-[210px] transition duration-4 flex-col top-[110%]  z-[9999999] border-2 border-flex-gray-15 bg-white dark:bg-dark-accent py-10
                    ${dropDownMenu ? 'visible translate-y-[0px] opacity-1' : 'translate-y-[80px] opacity-0'}`} onMouseLeave={() => setDropDownMenu(false)}>
                {items.map((el) => (
                    <NavLink to={el.link} key={el.link} className="py-[7px] px-[20px] border-l-3 border-transparent font-notoSans font-normal text-[14px] text-nav-color dark:text-white hover:bg-flex-gray-15 transition duration-3"
                    onClick={() => setDropDownMenu(false)}>
                        {el.text}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default DropDawnMenu