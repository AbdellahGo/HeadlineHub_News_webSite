import { Link } from "react-router"
import BookmarkButton from "./BookmarkButton"
import { hoverAnimatedUnderline } from "../../clasess"
import { filterCategory, formatDate } from "../../lib/utils"

type props = {
  uri: string
  img: string
  title: string
  updated: string
  category: string
  imgStyles?: string
}

const StoryCategoryCard = ({ category, uri, img, title, updated, imgStyles }: props) => {
  
  return (
    <div className="flex flex-col gap-[7px]">
      <Link to={`/story-details/${encodeURIComponent(uri)}`} >
        <img src={img} alt="story image" className={`w-full xl:h-[200px] lg:h-[150px] md:h-[250px] max-h-[350px] hover:opacity-[.8] duration-3 object-cover ${imgStyles}`} />
      </Link>
      <Link to={filterCategory(category)?.link} className="font-dmSans dark:text-white text-qlink-color text-12 leading-[18px] font-medium hover:opacity-[.7] duration-3">
        {filterCategory(category)?.name}
      </Link>
      <h2 className="xl:text-[17px] lg:text-[15px] text-[13px] leading-[24px] text-qlink-color font-notoSans font-bold">
        <Link to={`/story-details/${encodeURIComponent(uri)}`} className={hoverAnimatedUnderline}>
          {title}
        </Link>
      </h2>
      <div className="flex items-center justify-between">
        <span className="text-meta-fcolor dark:text-absolute-light text-12 font-dmSans">{formatDate(updated)}</span>
        <BookmarkButton />
      </div>
    </div>
  )
}

export default StoryCategoryCard