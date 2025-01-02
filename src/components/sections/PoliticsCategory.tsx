import { container } from "../../clasess"
import { useGetPoliticsNews } from "../../lib/react-query/queries"
import { CategorySectionHeader, FancyNewsCard } from "../shared"
import { NoImage } from "../../assets"

const PoliticsCategory = () => {
    const { data: politicsNews, isPending } = useGetPoliticsNews()

    if (isPending) return 'loading...'
    return (
        <section className="w-full lg:mt-40 mt-30">
            <div className={container}>
                <CategorySectionHeader sectionLink="/politics" sectionName="Politics" />
                <div className="flex flex-wrap gap-30 mt-20">
                    {politicsNews?.slice(0, 4)?.map(({ title, uri, multimedia, abstract, published_date }, i) => (
                        <div key={uri} className={`xl:h-[434px]  ${i !== 0 ? 'xl:w-[calc(60%/3-22.5px)] md:w-[calc(100%/3-20px)] w-full md:h-[280px] h-[350px]' : 'xl:w-[calc(40%-22.5px)] w-full h-[550px]'}`}>
                            <FancyNewsCard titleStyles={i !== 0 ? 'xl:text-[25px] md:text-[17px] text-[15px] leading-[33px]': 'leading-[48px] xl:text-40 md:text-[32px] text-[27px]'} isAbstractDisplayed={i !== 0 ? false: true}
                            title={title} uri={uri} 
                            img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} 
                            abstract={abstract} published_date={published_date}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PoliticsCategory