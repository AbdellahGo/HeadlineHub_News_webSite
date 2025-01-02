import { Link } from "react-router"
import { BookmarkButton, SideStoryBox } from "../shared";
import { IoTrendingUp } from "react-icons/io5";
import { container, hoverAnimatedUnderline } from "../../clasess";
import { useGetTopNews } from "../../lib/react-query/queries";
import { filterCategory, formatDate } from "../../lib/utils";
import { NoImage } from "../../assets";



const HeroSection = () => {
    const { data, isPending, isLoading } = useGetTopNews()

    if (isPending || isLoading) return 'loading...'

    const worldNews = data || []

    return (
        <section className="w-full mt-20">
            <div className={container}>
                <div className="flex xl:flex-row flex-col xl:gap-30 gap-20">
                    <div className="xl:w-[70%] w-full flex-col  mb-10 flex gap-30">
                        <div className="flex lg:flex-row flex-col-reverse items-center lg:gap-40 gap-30">
                            <div className="lg:w-[35%] w-full">
                                <div className="mb-12 flex items-center">
                                    <span className="block w-[1em] h-[1em] mr-[7px] rounded-full bg-hyperlink-line-color" />
                                    <Link to={filterCategory(worldNews![0]?.section_name)?.link} className="capitalize relative text-14 font-dmSans font-medium transition duration-3 group text-black dark:text-white">
                                        {filterCategory(worldNews![0]?.section_name)?.name}
                                        <span className=" absolute left-0 bottom-[-1px] bg-qlink-color dark:bg-white w-0 transition-[width] duration-3 group-hover:w-full h-[1px] " />
                                    </Link>
                                </div>
                                <h2 className="capitalize xl:text-40 lg:text-[35px] text-[27px] font-notoSans font-bold leading-[1.2em] tracking-[-.03em] mb-12">
                                    <Link to={`story-details/${encodeURIComponent(worldNews![0]?.uri)}`} className={hoverAnimatedUnderline}>
                                        {worldNews![0]?.headline.main}
                                    </Link>
                                </h2>
                                <p className="-1 md:mb-12 mb-10 font-dmSans xl:text-[15px] text-[13px] leading-[26px] text-excerpt-color dark:text-heading-tagline-color">
                                    {worldNews![0]?.abstract}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="block text-meta-fcolor dark:text-absolute-light font-dmSans text-12">
                                        {formatDate(worldNews![0]?.pub_date)}
                                    </span>
                                    <BookmarkButton />
                                </div>
                            </div>
                            <div className="lg:flex-1 w-full">
                                <Link to={`story-details/${encodeURIComponent(worldNews![0]?.uri)}`} className="w-full transition duration-3 hover:opacity-[.8]">
                                    <img src={worldNews![0]?.multimedia![0] ? `https://www.nytimes.com/${worldNews![0]?.multimedia[0]?.url}` : NoImage} alt="story image" className="w-full lg:max-h-[400px] lg:h-[400px] object-cover" />
                                </Link>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-20">
                            {
                                worldNews?.slice(1, 5).map(({ section_name, uri, headline: { main }, pub_date }) => (
                                    <div key={uri}>
                                        <h2 className="text-[15px] leading-[21px] mb-[5px] font-notoSans font-bold text-white capitalize">
                                            <IoTrendingUp className="inline text-[14] mr-8 align-middle text-qlink-color dark:text-white " />
                                            <Link to={`story-details/${encodeURIComponent(uri)}`} className={hoverAnimatedUnderline}>
                                                {main}
                                            </Link>
                                        </h2>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className="font-dmSans text-12">
                                                    <Link to={filterCategory(section_name)?.link} className="group relative text-qlink-color dark:text-white capitalize font-semibold">
                                                        {filterCategory(section_name)?.name}
                                                        <span className="w-0 h-[1px] bg-black dark:bg-white absolute bottom-0 left-0 transition-[width] duration-3 group-hover:w-full" />
                                                    </Link>
                                                    <span className="inline-flex items-center relative pl-16 text-meta-fcolor dark:text-absolute-light">
                                                        {formatDate(pub_date)}
                                                        <span className="absolute left-[6px] rounded-[0.8px] w-[3px] h-[2px] bg-meta-fcolor dark:bg-absolute-light" />
                                                    </span>
                                                </div>
                                                <BookmarkButton />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="xl:w-[30%] w-full xl:flex xl:flex-col grid  md:grid-cols-2 gap-20 ">
                        {worldNews?.slice(5, 9).map(({ section_name, uri, headline: { main }, pub_date, multimedia }, i) => (
                            <SideStoryBox key={uri} uri={uri} img={multimedia![0] ? `https://www.nytimes.com/${multimedia![0]?.url}` : NoImage} title={main}
                                parentStyles={`
                                    ${i !== worldNews?.slice(5, 9).length - 1 ? 'xl:pb-20 Mmd:pb-20 xl:border-b-1 Mmd:border-b-1 border-flex-gray-15' : ''}
                                    ${i !== worldNews?.slice(5, 9).length - 1 && i !== worldNews?.slice(5, 9).length - 2 ? 'pb-20 border-b-1 border-flex-gray-15' : ''}
                                    `}
                                updated={formatDate(pub_date)} category={section_name} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection