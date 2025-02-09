import { useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const mySocial = [
    {
        name: 'Youtube',
        link: 'https://www.youtube.com/channel/UCUt9al29hKG2evxP18-QjHg',
        icon: <FaYoutube />,
        label: 'Subscribe',
    },
    {
        name: 'X',
        link: 'https://x.com/AXGflash',
        icon: <FaXTwitter />,
        label: 'Follow',
    },
    {
        name: 'Tiktok',
        link: 'https://www.tiktok.com/@zigzagxz3',
        icon: <FaTiktok />,
        label: 'Follow',
    },
    {
        name: 'Github',
        link: 'https://github.com/AbdellahGo',
        icon: <FaGithub />,
        label: 'Follow',
    }

]

const ContactSocial = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


    const handleMouseEnter = (i: number) => {
        setHoveredIndex(i); // Set index of pressed item

    };

    const onMouseLeave = () => {
        setHoveredIndex(null); // Reset on mouse leave
    };


    return (
        <section className="w-full mt-[30px]">
            <h3 className="font-notoSans text-20 text-black dark:text-white font-semibold">
                Join Me on Social Networks
            </h3>
            <ul className="grid lg:grid-cols-4 grid-cols-2 gap-[5px] mt-15">
                {mySocial.map(({ icon, name, label, link }, i) => {
                    const opacityClass = hoveredIndex !== null && hoveredIndex !== i ? 'opacity-80' : '';
                    return (
                        <li key={link}>
                            <a href={link} target="_blank"
                                className={`group duration-4 hover:mt-[-4px] hover:bg-dark-accent py-12 px-[7px] flex items-center gap-[8px] border-1 border-flex-gray-15 ${opacityClass}`}
                                onMouseEnter={() => handleMouseEnter(i)}
                                onMouseLeave={onMouseLeave}
                            >
                                <span className={`duration-4 text-[25px] text-black dark:text-white group-hover:text-white ${opacityClass}`}>{icon}</span>
                                <div className="flex flex-col">
                                    <h2 className={`duration-4 text-14 text-black dark:text-white group-hover:text-white font-semibold font-notoSans ${opacityClass}`}>{name}</h2>
                                    <span className={`duration-4 mt-[px] font-dmSans text-meta-fcolor group-hover:text-white text-12 ${opacityClass}`}>{label}</span>
                                </div>
                            </a>
                        </li>
                    )
                })}
            </ul>

        </section>
    )
}

export default ContactSocial