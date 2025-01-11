import { Link } from "react-router"
import { container, hoverAnimatedUnderline } from "../../clasess"
import { useGetTechnologyNews } from "../../lib/react-query/queries"
import { BookmarkButton, CategorySectionHeader, MySocialMedia, StoryCategoryCard } from "../shared"
import { NoImage } from "../../assets"
import { formatDate, getDates } from "../../lib/utils"

const TechnologyCategory = () => {
    const { data: technologyNews = [], isPending } = useGetTechnologyNews()

    if (isPending) return 'loading...'
    getDates()
    

    return (
        <section className="w-full lg:mt-40 mt-30">
            <div className={container}>
                <CategorySectionHeader sectionInfo={{name: "Technology", link: '/category/technology'}} />
                <div className="flex xl:flex-row flex-col gap-30 mt-20">
                    <div className="xl:w-[20%] w-full ">
                        <div className="bg-[#fff3e8] dark:bg-[#50230e] p-[60px_20px_40px]">
                            <h3 className="xl:pb-[15px] pb-[10px] md:text-[35px] text-[27px] font-bold text-[#9c471e] dark:text-white leading-[42px]">
                                Discover the future today, right here !
                            </h3>
                            <p className="font-dmSans text-14 leading-[24px] dark:text-white text-qlink-color">
                                Your go-to source for the latest phones,
                                laptops, and cutting-edge gadgets.
                                Explore in-depth reviews, expert insights,
                                and sharp analyses.
                                Stay ahead with the pulse of innovation!
                            </p>
                            <div className="xl:pt-[90px] pt-[20px]">
                                <Link to={'category/technology'} className="flex items-center w-fit p-[8px_20px] border-1 border-black dark:border-white hover:bg-black hover:dark:border-black hover:text-white
                                   duration-3 font-semibold text-13 text-qlink-color dark:text-white">
                                    All in Technology
                                </Link>
                            </div>
                        </div>
                        <MySocialMedia tooltipPosition="top" containerStyles="flex items-center justify-end gap-[3px] mt-12"
                            iconStyles="text-qlink-color dark:text-white block px-[5px] text-[14px]" />
                    </div>
                    <div className="xl:w-[80%] w-full flex gap-30 flex-col">
                        <div className="w-full flex md:flex-row  flex-col items-start gap-20">
                            <div className="md:w-[40%] w-full">
                                <Link to={`story-details/${encodeURIComponent(technologyNews![0]?.uri)}`}>
                                    <img src={technologyNews![0]?.multimedia ? (technologyNews![0]?.multimedia[1]?.url ? technologyNews![0]?.multimedia[1].url : technologyNews![0]?.multimedia[0]?.url) : NoImage} alt="news Image"
                                        className="hover:opacity-[.8] duration-3 w-full Mmd:max-h-[400px] object-cover" />
                                </Link>
                            </div>
                            <div className="md:w-[60%] w-full ">
                                <Link to={'category/technology'} className="font-dmSans font-medium text-14 text-qlink-color dark:text-white duration-3 hover:opacity-[.7]">
                                    Technology
                                </Link>
                                <h2 className="dark:text-white font-notoSans font-bold xl:text-40 md:text-[35px] text-[27px] text-qlink-color ">
                                    <Link to={`/story-details/${encodeURIComponent(technologyNews![0]?.uri)}`} className={hoverAnimatedUnderline}>
                                        {technologyNews![0]?.title}
                                    </Link>
                                </h2>
                                <p className="font-dmSans mt-12 text-[15px] leading-[26px] text-excerpt-color dark:text-heading-tagline-color ">
                                    {technologyNews![0]?.abstract}
                                </p>
                                <div className="flex items-end justify-between">
                                    <span className="block mt-12 font-dmSans text-12 text-meta-fcolor dark:text-absolute-light">{formatDate(technologyNews![0]?.published_date)}</span>
                                    <BookmarkButton storyData={{
                                        category: technologyNews![0]?.section,
                                        title: technologyNews![0]?.title,
                                        description: technologyNews![0]?.abstract,
                                        updated: technologyNews![0]?.published_date,
                                        image: technologyNews![0]?.multimedia![0] ? `${technologyNews![0]?.multimedia[0]?.url}` : NoImage,
                                        uri: technologyNews![0]?.uri,
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-30">
                            {technologyNews?.slice(1, 5).map(({ uri, title, multimedia,abstract, section,published_date }) => (
                                <StoryCategoryCard key={uri} category={section} uri={uri} description={abstract} title={title} updated={published_date}
                                    imgStyles='xl:!max-h-[180px] lg:!h-[180px] md:!max-h-[250px] '
                                    img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TechnologyCategory