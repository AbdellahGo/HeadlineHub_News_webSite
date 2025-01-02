import { useState } from "react";
import { NoImage } from "../../assets";
import { container } from "../../clasess";
import { useGetMoreNews } from "../../lib/react-query/queries"
import { CategorySectionHeader, Paginate, StoryCategoryCard } from "../shared";



const MoreNewsSection = () => {
  const [pagesList, setPagesList] = useState<number[]>([1])
  const [page, setPage] = useState<number>(1)
  const { data: moreNews, isPending } = useGetMoreNews(page)

  if (isPending) return 'Loading...'

  return (
    <section className="w-full lg:mt-40 mt-30">
      <div className={container}>
        <CategorySectionHeader sectionLink="/search" sectionName="More News" />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-30 mt-20">
          {moreNews?.slice(0, 8)?.map(({ headline, uri, multimedia, section_name, pub_date }) => (
            <StoryCategoryCard key={uri} category={section_name} uri={uri} title={headline?.main} updated={pub_date}
              img={multimedia ? `https://www.nytimes.com/${(multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url)}` : NoImage} />
          ))}
        </div>
        <Paginate  moreNews={moreNews!}  page={page} setPage={setPage} setPagesList={setPagesList} pagesList={pagesList} />
      </div>
    </section>
  )
}

export default MoreNewsSection