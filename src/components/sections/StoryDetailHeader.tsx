import { Link } from "react-router"
import { BookmarkButton, ToolTip } from "../shared"
import { INewsType } from "../../types"
import { NoImage } from "../../assets"
import { formatDate } from "../../lib/utils"
import { FaShareFromSquare } from "react-icons/fa6";
import { GoInbox } from "react-icons/go";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";


type props = {
    storyData: INewsType
}

const StoryDetailHeader = ({ storyData }: props) => {

    const storyDataForBookmarkButton = {
        category: storyData[0]?.section,
        title: storyData[0]?.title,
        description: storyData[0]?.abstract,
        updated: storyData[0]?.published_date,
        image: storyData[0]?.multimedia?.length ? (`https://www.nytimes.com/${(storyData[0]?.multimedia[1]?.url ? storyData[0]?.multimedia[1].url : storyData[0]?.multimedia[0]?.url)}`) : NoImage,
        uri: storyData[0]?.uri
    }

    const shareLinks = [
        {
            icon: <FaXTwitter />,
            link: `https://twitter.com/intent/tweet?text=${storyData[0]?.title}&url=${storyData[0]?.uri}`,
            label: 'X',
        },
        {
            icon: <FaInstagramSquare />,
            link: `https://www.instagram.com/?url=${storyData[0]?.uri}`,
            label: 'Instagram',
        },
        {
            icon: <FaFacebookF />,
            link: `https://www.facebook.com/sharer/sharer.php?u=${storyData[0]?.uri}`,
            label: 'Facebook',
        },
        {
            icon: <FaTiktok />,
            link: `https://www.tiktok.com/share?url=${storyData[0]?.uri}`,
            label: 'TikTok',
        },
        {
            icon: <FaLinkedinIn />,
            link: `https://www.linkedin.com/sharing/share-offsite/?url=${storyData[0]?.uri}`,
            label: 'LinkedinIn',
        },
    ];



    return (
        <div>
            <div className="mb-15 flex items-center gap-[5px]">
                <span className="w-[16px] h-[16px] rounded-full bg-hyperlink-line-color" />
                <Link to={`/category/${storyData[0]?.section}`} className="relative group font-dmSans text-12 text-qlink-color dark:text-white font-medium">
                    {storyData[0]?.section}
                    <span className=" absolute left-0 bottom-[-1px] bg-qlink-color dark:bg-white w-0 transition-[width] duration-3 group-hover:w-full h-[1px] " />
                </Link>
            </div>
            <h1 className="xl:mb-20 mb-15 xl:text-[45px] lg:text-[35px] text-[27px] xl:leading-[51px] lg:leaing-[40px] leaing-[30px] font-notoSans font-extrabold  text-qlink-color dark:text-white ">
                {storyData[0]?.title}
            </h1>
            <p className="xl:mb-20 mb-15 xl:text-18 lg:text-16 text-[15px] font-dmSans text-qlink-color dark:text-white">
                {storyData[0]?.abstract}
            </p>
            <div>
                <ul className="flex items-center gap-15">
                    <li className="flex items-center pr-[5px] relative text-qlink-color dark:text-white">
                        <FaShareFromSquare className="text-22" />
                        <span className="absolute right-[-5px] w-[2px] h-full bg-meta-fcolor dark:bg-absolute-light" />
                    </li>
                    {shareLinks.map(({ link, label, icon }) => (
                        <ToolTip key={label} title={label} tooltipPosition='top'>
                            <li>
                                <a target="_blank" href={link} className="text-22 text-qlink-color dark:text-white">
                                    {icon}
                                </a>
                            </li>
                        </ToolTip>
                    ))}
                </ul>
                <div className="mt-20">
                    <div className="flex items-center">
                        <h4 className="relative flex items-center gap-[5px] pr-15 mr-10 group font-dmSans text-14 text-meta-fcolor dark:text-absolute-light">By
                            <span className="font-semibold text-14 underline group-hover:text-hyperlink-line-color text-black dark:text-white duration-3">
                                {storyData[0]?.byline}
                            </span>
                            <span className="w-[4px] h-[4px] right-0 rounded-full bg-meta-fcolor dark:bg-absolute-light absolute" />
                        </h4>
                        <BookmarkButton buttonStyles={'text-14 font-bold'} showText storyData={storyDataForBookmarkButton} />
                    </div>
                    <span className="font-dmSans text-14 text-qlink-color dark:text-white">
                        Last Updated: {formatDate(storyData[0]?.published_date, true)}
                    </span>
                    {storyData[0]?.webUrl &&  (
                    <div className="flex items-center text-14 gap-[5px]">
                        <GoInbox className="text-meta-fcolor dark:text-absolute-light"/>
                        <span className="font-dmSans text-meta-fcolor dark:text-absolute-light">SOURCES:</span>
                        <a href={storyData[0]?.webUrl} target="_blank" className="ml-[5px] font-dmSans font-semibold bg-flex-gray-7 dark:text-white hover:bg-hyperlink-line-color hover:text-white duration-3 py-[4px] px-[12px]">Web Url</a>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StoryDetailHeader