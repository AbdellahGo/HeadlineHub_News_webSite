import { Link } from "react-router"
import { container, hoverAnimatedUnderline } from "../clasess"
import { BookmarkButton, MoreNewsButton, MyNewsBanner, PageLoader } from "../components/shared"
import { useAppContext } from "../context/AppContext"
import { useGetSavedStories } from "../lib/react-query/queries"
import { formatDate } from "../lib/utils"
import { useEffect, useState } from "react"

const MyNews = () => {
  const pStyles = 'pt-20 text-center font-notoSans font-semibold text-hyperlink-line-color dark:text-absolute-light'
  const [page, setPage] = useState<number>(1)
  const lastNewsIndex = 8 + (8 * (page - 1))
  const { user, isAuthenticated } = useAppContext()
  const { data: savedStories, isPending } = useGetSavedStories(user.id)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mt-30">
      <div className={container}>
        <div className="max-w-[700px] mx-auto">
          <MyNewsBanner />
          <div className="w-full mt-20 flex flex-col gap-20">
            {isPending && isAuthenticated ? (
              <PageLoader />
            ) : !isAuthenticated ? (
              <p className={pStyles}>
                You need to be logged in to view your saved news. Sign in or create an account to access and manage your saved articles.
              </p>
            ) : savedStories?.documents?.length === 0 ? (
              <p className={pStyles}>
                You haven't saved any news articles yet. Browse the latest news and save articles to access them later.
              </p>
            ) : (
              isPending ? <PageLoader /> : (
                savedStories?.documents?.slice(0, lastNewsIndex)?.map(({ uri, category, title, image, description, updated }, i) => (
                  <div key={uri} className={`flex Mmd:flex-col-reverse items-center gap-20 ${i !== 0 ? 'pt-20 border-t-1 border-flex-gray-15' : ''}`}>
                    <div className="flex-1 flex gap-[2px] flex-col">
                      <Link to={`/category/${category}`} className='capitalize leading-[18px] font-dmSans text-12 font-medium text-qlink-color dark:text-white hover:opacity-[.7] transition'>
                        {category}
                      </Link>
                      <h2 className="text-17 leading-[20px] font-notoSans font-bold text-qlink-color dark:text-white">
                        <Link to={`/story-details/${encodeURIComponent(uri)}`} className={hoverAnimatedUnderline}>
                          {title}
                        </Link>
                      </h2>
                      <p className="mt-8 font-dmSans text-13 text-excerpt-color dark:bg-heading-tagline-color">
                        {description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-12 inline-flex items-center relative text-meta-fcolor dark:text-absolute-light">
                          {formatDate(updated)}
                        </span>
                        <BookmarkButton storyData={{
                          category: category,
                          title: title,
                          description: description,
                          updated: updated,
                          image: image,
                          uri: uri,
                        }} />
                      </div>
                    </div>
                    <div className="Mmd:w-full">
                      <Link to={`/story-details/${encodeURIComponent(uri)}`} className="transition duration-3 hover:opacity-[.8]">
                        <img src={image} alt="story image" className=" w-full object-cover  md:h-[120px] sm:h-[250px] h-[150px]" />
                      </Link>
                    </div>
                  </div>
                )))
            )}
          </div>
          {!isAuthenticated || (savedStories?.documents?.length ?? 0) > 0 && (
            <MoreNewsButton setPage={setPage} newsList={savedStories?.documents} lastNewsIndex={lastNewsIndex} />
          )}

        </div>
      </div>
    </div>
  )
}

export default MyNews