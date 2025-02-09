import { useState } from "react";
import { NoImage } from "../../assets";
import { container } from "../../clasess";
import { CategorySectionHeader, MoreNewsButton, StoryCategoryCard } from "../shared";
import { INewsType } from "../../types";


type props = {
  startSliceIndex: number
  lastSliceIndex: number
  moreNews: INewsType | undefined
}

const MoreNewsSection = ({moreNews, startSliceIndex, lastSliceIndex}: props) => {
  const [page, setPage] = useState<number>(1)
  const lastNewsIndex = lastSliceIndex + (8 * (page - 1))
  const sliceNews: INewsType = moreNews!.slice(startSliceIndex, lastNewsIndex)


  return (
    <section className="w-full lg:mt-40 mt-30">
      <div className={container}>
        <CategorySectionHeader sectionInfo={{ name: "More News", link: '/' }} />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-30 mt-20">
          {sliceNews?.slice(0, lastNewsIndex)?.map(({ title, abstract, uri, multimedia, section, published_date }) => (
            <StoryCategoryCard key={uri} description={abstract} category={section} uri={uri} title={title} updated={published_date}
              img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
          ))}
        </div>
        {moreNews!.length > lastNewsIndex && (
          <MoreNewsButton setPage={setPage} newsList={moreNews} lastNewsIndex={lastNewsIndex} />
        )}
      </div>
    </section>
  )
}

export default MoreNewsSection