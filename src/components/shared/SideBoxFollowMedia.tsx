import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";

const media = [
    {
        icon: <FaXTwitter />,
        label: 'X',
        link: 'https://x.com/AXGflash'
    },
    {
        icon: <FaFacebookF />,
        label: 'Facebook',
        link: 'https://www.facebook.com/profile.php?id=100053501469803'
    },
    {
        icon: <FaTiktok />,
        label: 'TikTok',
        link: 'https://www.tiktok.com/@zigzagxz3'
    },
    {
        icon: <FaLinkedinIn />,
        label: 'Linkedin',
        link: 'https://www.linkedin.com/in/abdellah-gou-93b5a430a/'
    },
    {
        icon: <FaMedium />,
        label: 'Medium',
        link: 'https://medium.com/@abdellahgoy40'
    },
]
const SideBoxFollowMedia = () => {
    const [mediaHover, setMediaHover] = useState<number | null>(null)
    return (
        <ul className="mt-15 flex flex-col gap-10">
            {media.map(({ link, label, icon }, i) => (
                <li key={label} onMouseEnter={() => setMediaHover(i)} onMouseLeave={() => setMediaHover(null)}>
                    <a target="_blank" href={link} className={`group duration-3 hover:bg-qlink-color ${mediaHover === null || mediaHover === i ? "opacity-100" : "opacity-50"
                        }
                        px-20 py-8 border-1 text-black hover:text-white dark:text-white border-qlink-color flex items-center justify-between`}>
                        <div className="flex items-center gap-[7.5px]">
                            <span className="text-18">{icon}</span>
                            <span className="w-[1px] h-[12px] bg-meta-fcolor dark:bg-absolute-light" />
                            <span className="font-dmSans text-12">{label}</span>
                        </div>
                        <span className={`text-12 font-bold font-dmSans text-meta-fcolor group-hover:text-white dark:text-absolute-light duration-3`}>Follew</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default SideBoxFollowMedia