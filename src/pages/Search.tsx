import { useEffect, useState } from "react"
import { NoImage } from "../assets"
import { container } from "../clasess"
import { SearchResultsHeader } from "../components/sections"
import { MoreNewsButton, PageLoader, StoryCategoryCard, TopicNavigationBar } from "../components/shared"
import { useAppContext } from "../context/AppContext"
import { useGetNewsBySearchQuery } from "../lib/react-query/queries"
import { worldCategoryBackupData } from "../lib/constants"
import { toast } from "react-toastify"

const Search = () => {
  const [page, setPage] = useState<number>(1)
  const lastNewsIndex = 8 + (8 * (page - 1))
  const { searchQuery } = useAppContext()
  const { data: searchResult = [], isPending } = useGetNewsBySearchQuery(searchQuery || 'world')
  const content = searchResult.length > 0 ? searchResult : worldCategoryBackupData

  useEffect(() => {
    if (!isPending && searchResult.length === 0) {
      toast.warn('The displayed data may not match your search results because the original data could not be loaded due to high server traffic. Please try again later.', {autoClose: 5000})
    }
  }, [isPending, searchResult])
  
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  return (
    <div>
      <SearchResultsHeader resultLength={content?.length} />
      <section className="lg:mt-[70px] mt-[60px]">
        <div className={container}>
          <div className="max-w-[900px] mx-auto">
            <TopicNavigationBar noHashtag topicContainerStyles='justify-center mx-auto' />
            {!isPending ? (
              <div className="grid md:grid-cols-2 gap-30 mt-40">
                {content?.slice(0, lastNewsIndex)?.map(({ title, uri, published_date, abstract, section, multimedia }) => (
                  <StoryCategoryCard key={uri} description={abstract} category={section} uri={uri} title={title} updated={published_date!}
                    imgStyles="md:!h-[250px]"
                    img={multimedia?.length ? (`${searchResult.length > 0 ? 'https://www.nytimes.com/' : ''}${(multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url)}`) : NoImage} />
                ))}
              </div>
            ) : (
              <PageLoader />
            )}
            <MoreNewsButton setPage={setPage} newsList={content} lastNewsIndex={lastNewsIndex} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Search