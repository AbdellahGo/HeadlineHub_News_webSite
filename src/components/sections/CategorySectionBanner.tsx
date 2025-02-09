import { NoImage } from "../../assets"
import { container } from "../../clasess"
import { INewsType } from "../../types"
import { FancyNewsCard, StoryCategoryCard } from "../shared"

type props = {
    content: INewsType
    category: string
    baseImageUrl?: string
}

const CategorySectionBanner = ({ baseImageUrl, content, category }: props) => {
    const firstStory = content![0]
    return (
        <section className="w-full lg:mt-40 mt-30">
            <div className={container}>
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2 lg:h-auto sm:h-[500px] w-full">
                        <FancyNewsCard isAbstractDisplayed category={category}
                            containerStyles={''}
                            titleStyles='leading-[48px] xl:text-40 md:text-[32px] text-[27px]'
                            title={firstStory?.title} uri={firstStory?.uri}
                            img={
                                firstStory?.multimedia?.length ?
                                    (`${baseImageUrl ? baseImageUrl : ''}${(firstStory?.multimedia[1]?.url ? firstStory?.multimedia[1].url : firstStory?.multimedia[0]?.url)}`)
                                    : NoImage}
                            abstract={firstStory?.abstract} published_date={firstStory?.published_date} />
                    </div>
                    <div className="grid md:grid-cols-2 lg:w-1/2 w-full gap-20">
                        {content?.slice(1).map(({ title, uri, published_date, abstract, multimedia, section }) => (
                            <StoryCategoryCard key={uri} description={abstract} category={section} uri={uri} title={title} updated={published_date}
                                img={multimedia?.length ? (`${baseImageUrl ? baseImageUrl : ''}${(multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url)}`) : NoImage} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CategorySectionBanner