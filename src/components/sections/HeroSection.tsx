import { Link } from "react-router"
import { BookmarkButton, SideStoryBox } from "../shared";
import { IoTrendingUp } from "react-icons/io5";
import { container, hoverAnimatedUnderline } from "../../clasess";
import { formatDate } from "../../lib/utils";
import { NoImage } from "../../assets";
import { INewsType } from "../../types";

type props = {
    homeNews: INewsType | undefined
}

const HeroSection = ({ homeNews }: props) => {

    
    return (
        <section className="w-full">
            <div className={container}>
                <div className="flex xl:flex-row flex-col gap-30">
                    <div className="xl:w-[70%] w-full flex-col  mb-10 flex gap-30">
                        <div className="flex lg:flex-row flex-col-reverse items-center lg:gap-40 gap-30">
                            <div className="lg:w-[35%] w-full">
                                <div className="mb-12 flex items-center">
                                    <span className="block w-[1em] h-[1em] mr-[7px] rounded-full bg-hyperlink-line-color" />
                                    <Link to={`category/${homeNews![0]?.section}`} className="capitalize relative text-14 font-dmSans font-medium transition duration-3 group text-black dark:text-white">
                                        {homeNews![0]?.section}
                                        <span className=" absolute left-0 bottom-[-1px] bg-qlink-color dark:bg-white w-0 transition-[width] duration-3 group-hover:w-full h-[1px] " />
                                    </Link>
                                </div>
                                <h2 className="capitalize xl:text-40 lg:text-[35px] text-[27px] font-notoSans font-bold leading-[1.2em] tracking-[-.03em] mb-12">
                                    <Link to={`story-details/${encodeURIComponent(homeNews![0]?.uri)}`} className={hoverAnimatedUnderline}>
                                        {homeNews![0]?.title}
                                    </Link>
                                </h2>
                                <p className="-1 md:mb-12 mb-10 font-dmSans xl:text-[15px] text-[13px] leading-[26px] text-excerpt-color dark:text-heading-tagline-color">
                                    {homeNews![0]?.abstract}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="block text-meta-fcolor dark:text-absolute-light font-dmSans text-12">
                                        {formatDate(homeNews![0]?.published_date)}
                                    </span>
                                    <BookmarkButton storyData={{
                                        category: homeNews![0]?.section,
                                        title: homeNews![0]?.title,
                                        description: homeNews![0]?.abstract,
                                        updated: homeNews![0]?.published_date,
                                        image: homeNews![0]?.multimedia![0] ? `${homeNews![0]?.multimedia[0]?.url}` : NoImage,
                                        uri: homeNews![0]?.uri,
                                    }} />
                                </div>
                            </div>
                            <div className="lg:flex-1 w-full">
                                <Link to={`story-details/${encodeURIComponent(homeNews![0]?.uri)}`} className="w-full transition duration-3 hover:opacity-[.8]">
                                    <img src={homeNews![0]?.multimedia![0] ? `${homeNews![0]?.multimedia[0]?.url}` : NoImage} alt="story image" className="w-full lg:max-h-[400px] lg:h-[400px] object-cover" />
                                </Link>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-30">
                            {
                                homeNews?.slice(1, 5).map(({ section, uri, title, published_date, multimedia, abstract }) => (
                                    <div key={uri}>
                                        <h2 className="text-[15px] leading-[21px] mb-[5px] font-notoSans font-bold text-white capitalize">
                                            <IoTrendingUp className="inline text-[14] mr-8 align-middle text-qlink-color dark:text-white " />
                                            <Link to={`story-details/${encodeURIComponent(uri)}`} className={hoverAnimatedUnderline}>
                                                {title}
                                            </Link>
                                        </h2>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className="font-dmSans text-12">
                                                    <Link to={`category/${section}`} className="group relative text-qlink-color dark:text-white capitalize font-semibold">
                                                        {section}
                                                        <span className="w-0 h-[1px] bg-black dark:bg-white absolute bottom-0 left-0 transition-[width] duration-3 group-hover:w-full" />
                                                    </Link>
                                                    <span className="inline-flex items-center relative pl-16 text-meta-fcolor dark:text-absolute-light">
                                                        {formatDate(published_date)}
                                                        <span className="absolute left-[6px] rounded-[0.8px] w-[3px] h-[2px] bg-meta-fcolor dark:bg-absolute-light" />
                                                    </span>
                                                </div>
                                                <BookmarkButton storyData={{
                                                    category: section,
                                                    title: title,
                                                    description: abstract,
                                                    updated: published_date,
                                                    image: multimedia && multimedia![0] ? `${multimedia[0]?.url}` : NoImage,
                                                    uri: uri,
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="xl:w-[30%] w-full xl:flex xl:flex-col grid  md:grid-cols-2 gap-20 ">
                        {homeNews?.slice(5, 9).map(({ section, uri, title, published_date, abstract, multimedia }, i) => (
                            <SideStoryBox key={uri} abstract={abstract} uri={uri}
                                img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} title={title}
                                parentStyles={`
                                    ${i !== homeNews?.slice(5, 9).length - 1 ? 'xl:pb-20 Mmd:pb-20 xl:border-b-1 Mmd:border-b-1 border-flex-gray-15' : ''}
                                    ${i !== homeNews?.slice(5, 9).length - 1 && i !== homeNews?.slice(5, 9).length - 2 ? 'pb-20 border-b-1 border-flex-gray-15' : ''}
                                    `}
                                updated={formatDate(published_date)} category={section} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection