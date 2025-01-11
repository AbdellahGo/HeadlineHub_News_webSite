import { Link } from "react-router"
import { container, hoverAnimatedUnderline } from "../../clasess"
import { useGetBusinessNews } from "../../lib/react-query/queries"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { BookmarkButton, SideStoryBox } from "../shared"
import { formatDate } from "../../lib/utils"
import { NoImage } from "../../assets"

const BusinessCategory = () => {
    const { data: businessNews = [], isPending } = useGetBusinessNews()

    if (isPending) return 'loading ...'
    const firstNews = businessNews![0]
    const secondNews = businessNews![1]


    return (
        <section className="w-full lg:mt-40 mt-30">
            <div className={container}>
                <div className="border-t-1 border-flex-gray-30 pt-12">
                    <div className="flex xl:flex-row  Mxl:flex-wrap xl:gap-30 gap-20">
                        <div className="xl:w-[45%] w-full">
                            <Link to={`/category/${firstNews?.section}`} className="flex items-center font-notoSans font-semibold lg:text-18 text-16 text-black dark:text-white hover:opacity-[.7] duration-3">
                                Bussiness News
                                <MdOutlineKeyboardArrowRight className="text-20" />
                            </Link>
                            <div className="mt-[7px]">
                                <h2 className="font-notoSans font-bold leading-[48px] text-qlink-color dark:text-white xl:text-40 md:text-[35px] text-[27px]">
                                    <Link to={`/story-details/${encodeURIComponent(firstNews?.uri)}`}
                                        className={hoverAnimatedUnderline}>
                                        {firstNews?.title}
                                    </Link>
                                </h2>
                                <div className="mt-[7px] flex items-center justify-between">
                                    <div className="text-12 font-dmSans font-semibold">
                                        <Link to={`category/${firstNews?.section}`} className="inline-block text-qlink-color dark:text-white">Business</Link>
                                        <span className=" inline-flex items-center relative pl-16 text-meta-fcolor dark:text-absolute-light">
                                            {formatDate(firstNews?.published_date)}
                                            <span className="absolute left-[6px] rounded-[0.8px] w-[3px] h-[2px] bg-meta-fcolor dark:bg-absolute-light" />
                                        </span>
                                    </div>
                                    <BookmarkButton storyData={{
                                        category: firstNews?.section,
                                        title: firstNews?.title,
                                        description: firstNews?.abstract,
                                        updated: firstNews?.published_date,
                                        image: firstNews?.multimedia![0] ? `${firstNews?.multimedia[0]?.url}` : NoImage,
                                        uri: firstNews?.uri,
                                    }} />
                                </div>
                                <div className="mt-[15px]">
                                    <Link to={`/story-details/${encodeURIComponent(firstNews?.uri)}`}>
                                        <img src={firstNews?.multimedia ? (firstNews?.multimedia[1]?.url ? firstNews?.multimedia[1].url : firstNews?.multimedia[0]?.url) : NoImage} alt="news image"
                                            className="w-full xl:max-h-[350px] lg:max-h-[550px] md:max-h-[450px]  object-cover hover:opacity-[.8] duration-3" />
                                    </Link>
                                </div>
                                <p className="mt-[15px] text-[15px] text-excerpt-color dark:text-heading-tagline-color">
                                    {firstNews?.abstract}
                                </p>
                            </div>
                        </div>
                        <div className="xl:w-[55%] flex md:flex-row flex-col gap-30 Mxl:border-t-1 border-flex-gray-30 Mxl:pt-30">
                            <div className="xl:w-[50%] md:w-1/2 w-full">
                                <Link to={`/story-details/${encodeURIComponent(secondNews?.uri)}`}>
                                    <img src={secondNews?.multimedia ? (secondNews?.multimedia[1]?.url ? secondNews?.multimedia[1].url : secondNews?.multimedia[0]?.url) : NoImage}
                                        alt="news Image" className="w-full md:h-[420px] duration-3 hover:opacity-[.8] object-cover" />
                                </Link>
                                <h2 className="mt-12 font-notoSans font-bold xl:text-[25px] lg:text-[21px] text-[18px] text-qlink-color dark:text-white">
                                    <Link to={`story-details/${encodeURIComponent(secondNews?.uri)}`}
                                        className={hoverAnimatedUnderline}>
                                        {secondNews?.title}
                                    </Link>
                                </h2>
                                <div className="flex items-center justify-between">
                                    <span className="font-dmSans text-12  text-meta-fcolor dark:text-absolute-light">
                                        {formatDate(firstNews?.published_date)}
                                    </span>
                                    <BookmarkButton storyData={{
                                        category: secondNews?.section,
                                        title: secondNews?.title,
                                        description: secondNews?.abstract,
                                        updated: secondNews?.published_date,
                                        image: secondNews?.multimedia![0] ? `${secondNews?.multimedia[0]?.url}` : NoImage,
                                        uri: secondNews?.uri,
                                    }}/>
                                </div>
                            </div>
                            <div className="xl:w-[55%] md:w-1/2 w-full md:flex md:flex-col grid sm:grid-cols-2 gap-20 ">
                                {businessNews?.slice(2, 7)?.map(({ title, uri, published_date, abstract, multimedia }, i) => (
                                    <SideStoryBox key={uri} title={title} updated={published_date} abstract={abstract} category='Business' uri={uri}
                                        parentStyles={i !== businessNews?.slice(2, 7).length - 1 ? 'lg:pb-20 Mmd:pb-20 lg:border-b-1 Mmd:border-b-1 border-flex-gray-15 ' : ''}
                                        img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default BusinessCategory