import { Link } from "react-router"
import BookmarkButton from "./BookmarkButton"
import { hoverAnimatedUnderline } from "../../clasess"
import { formatDate } from "../../lib/utils"
type props = {
    title: string
    uri: string
    img: string
    abstract: string
    published_date: string
    isAbstractDisplayed: boolean
    category: string
    titleStyles?: string
    containerStyles?: string

}

const FancyNewsCard = ({ category, containerStyles, titleStyles, isAbstractDisplayed, title, uri, img, abstract, published_date }: props) => {
    return (
        <div className={`${containerStyles} group relative h-full flex items-end`}>
            <div className="flex flex-col justify-end w-full h-auto  relative z-10 p-[25px_25px]"
                style={{ backgroundImage: 'linear-gradient(to top, #191c20 0,#191c20f2 calc(100% - 150px),#191c2000 100%)' }}>
                <Link to={category.toLowerCase() === 'blogs' ? '/blog' :  `/category/${category}`} className="capitalize mb-[7px] font-dmSans text-16 text-white font-medium duration-3 hover:opacity-[.7] ">
                    {category}
                </Link>
                <h2 className={`mb-[7px] ${titleStyles}  font-notoSans font-bold  `}>
                    <Link to={`/story-details/${encodeURIComponent(uri)}`} className={` text-white !from-white !to-white ${hoverAnimatedUnderline}`}>
                        {title}
                    </Link>
                </h2>
                {isAbstractDisplayed && (
                    <p className="mb-[7px] text-absolute-light text-[15px] leading-[26px] font-dmSans">
                        {abstract}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <span className="font-dmSans text-12 leading-[20px] text-absolute-light">{formatDate(published_date)}</span>
                    <BookmarkButton iconColor="white" storyData={{
                                        category: category,
                                        title: title,
                                        description: abstract,
                                        updated: published_date,
                                        image: img,
                                        uri: uri,
                                    }}/>
                </div>
            </div>
            <Link to={`/story-details/${encodeURIComponent(uri)}`} className="z-[1] absolute bottom-0 left-0 w-full h-full">
                <img src={img} alt="news Image" className="h-full object-cover w-full group-hover:opacity-[.8] duration-3 " />
            </Link>
        </div>
    )
}

export default FancyNewsCard