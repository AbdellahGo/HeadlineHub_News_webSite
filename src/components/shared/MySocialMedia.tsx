import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRedditAlien } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import ToolTip from "./ToolTip";

type props = {
    containerStyles?: string
    iconStyles?: string
    tooltipPosition?: 'bottom' | 'top'
}

const MySocialMedia = ({containerStyles, iconStyles, tooltipPosition}: props) => {
    const mySocialMedia = [
        {
            label: 'Facebook',
            icon: <FaFacebookF />,
            link: 'https://www.facebook.com/profile.php?id=100053501469803'
        },
        {
            label: 'Twitter',
            icon: <FaXTwitter />,
            link: 'https://x.com/AXGflash'
        },
        {
            label: 'Reddit',
            icon: <FaRedditAlien />,
            link: 'https://www.reddit.com/user/Helpful-Cap-8092/'
        },
        {
            label: 'Medium',
            icon: <FaMedium />,
            link: 'https://medium.com/@abdellahgoy40'
        },
    ]

    return (
        <ul className={`${containerStyles} items-center justify-end`}>
            {mySocialMedia.map(({ icon, link, label }) => (
                <li key={link}>
                    <ToolTip title={label} tooltipPosition={tooltipPosition || 'bottom'}>
                        <a href={link} target="_blank" className={`${iconStyles} hover:scale-[1.2] transition duration-3`}>
                            {icon}
                        </a>
                    </ToolTip>
                </li>
            ))}
        </ul>
    )
}

export default MySocialMedia