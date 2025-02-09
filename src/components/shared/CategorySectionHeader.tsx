import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Link } from "react-router"
type props = {
    sectionInfo: {name: string, link: string}
    containerStyles?: string
}
const CategorySectionHeader = ({containerStyles, sectionInfo}: props) => {
    return (
        <div className={`pt-8 w-full border-t-1 border-flex-gray-30 ${containerStyles}`}>
            <h2>
                <Link to={`${sectionInfo.link.toLowerCase()}`} className="w-fit flex items-center font-notoSans font-semibold  xl:text-20 text-black dark:text-white lg:text-18 text-16 hover:opacity-[.7] hover:pl-12  duration-3">
                    {sectionInfo.name}
                    <MdOutlineKeyboardArrowRight />
                </Link>
            </h2>
        </div>
    )
}

export default CategorySectionHeader