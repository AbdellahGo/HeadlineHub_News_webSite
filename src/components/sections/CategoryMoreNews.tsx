import { useState } from "react"
import { NoImage } from "../../assets"
import { container } from "../../clasess"
import { INewsType } from "../../types"
import { MoreNewsButton, StoryCategoryCard } from "../shared"
import { FaArrowRightLong } from "react-icons/fa6";

type props = {
    content: INewsType
}

const CategoryMoreNews = ({ content }: props) => {
    const [page, setPage] = useState<number>(1)
    const lastNewsIndex = 13 + (8 * (page - 1))
    const sliceNews: INewsType = content.slice(5, lastNewsIndex)



    return (
        <section className="w-full lg:mt-40 mt-30">
            <div className={container}>
                <div className="mt-20 grid lg:grid-cols-4 sm:grid-cols-2 gap-30">
                    {sliceNews.map(({ title, uri, published_date, abstract, section, multimedia }) => (
                        <StoryCategoryCard key={uri} description={abstract} category={section} uri={uri} title={title} updated={published_date}
                            img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
                    ))}
                </div>
                {content.length > lastNewsIndex && (
                    <MoreNewsButton setPage={setPage} newsList={content} lastNewsIndex={lastNewsIndex}/>
                )}
            </div>
        </section >
    )
}

export default CategoryMoreNews