import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Link } from "react-router"
type props = {
    sectionLink: string
    sectionName: string
}
const CategorySectionHeader = ({sectionLink, sectionName}: props) => {
    return (
        <div className="pt-8 w-full border-t-1 border-flex-gray-30">
            <h2>
                <Link to={sectionLink} className="w-fit flex items-center font-notoSans font-semibold  xl:text-20 text-black dark:text-white lg:text-18 text-16 hover:opacity-[.7] hover:pl-12  duration-3">
                    {sectionName}
                    <MdOutlineKeyboardArrowRight />
                </Link>
            </h2>
        </div>
    )
}

export default CategorySectionHeader