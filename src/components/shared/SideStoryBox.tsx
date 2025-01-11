import { Link } from "react-router"
import BookmarkButton from "./BookmarkButton"
import { hoverAnimatedUnderline } from "../../clasess"

type props = {
    img: string
    title: string
    updated: string
    category: string
    uri: string
    parentStyles: string
    abstract: string
}

const SideStoryBox = ({ abstract, img, title, updated, category, uri, parentStyles }: props) => {

    return (
        <div className={`flex items-center gap-20 ${parentStyles}`}>
            <div className="flex-1 flex gap-[2px] flex-col">
                <Link to={`category/${category}`} className='capitalize leading-[18px] font-dmSans text-12 font-medium text-qlink-color dark:text-white hover:opacity-[.7] transition'>
                    {category}
                </Link>
                <h2 className="text-12 leading-[20px] font-notoSans font-bold text-qlink-color dark:text-white">
                    <Link to={`/story-details/${encodeURIComponent(uri)}`} className={hoverAnimatedUnderline}>
                        {title}
                    </Link>
                </h2>
                <div className="flex items-center justify-between">
                    <span className="text-12 inline-flex items-center relative text-meta-fcolor dark:text-absolute-light">
                        {updated}
                    </span>
                    <BookmarkButton storyData={{
                        category: category,
                        title: title,
                        description: abstract,
                        updated: updated,
                        image: img,
                        uri: uri,
                    }} />
                </div>
            </div>
            <div className=" w-[125px]">
                <Link to={`/story-details/${encodeURIComponent(uri)}`} className="transition duration-3 hover:opacity-[.8]">
                    <img src={img} alt="story image" className=" w-full object-cover h-[90px]" />
                </Link>
            </div>
        </div>
    )
}

export default SideStoryBox