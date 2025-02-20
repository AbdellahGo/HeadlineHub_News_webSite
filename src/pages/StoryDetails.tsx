import { useParams } from "react-router"
import { NoImage } from "../assets"
import { container } from "../clasess"
import { StoryDetailBody, StoryDetailHeader } from "../components/sections"
import { BoxSubscribe, CategorySectionHeader, CommentForm, PageLoader, SideBoxFollowMedia, SideStoryBox, StoryCategoryCard, TopicNavigationBar } from "../components/shared"
import { useGetHomeNews, useGetNewsByCategoryName } from "../lib/react-query/queries"
import { formatDate } from "../lib/utils"
import { useGetStoryDetailsByUri } from "../lib/react-query/queries"
import { storyDetailsBackupData, worldCategoryBackupData } from "../lib/constants"
import { useEffect } from "react"
import { toast } from "react-toastify"

const StoryDetails = () => {
  const { uri } = useParams()
  const { data = [], isPending } = useGetStoryDetailsByUri(uri!)
  const { data: topNews = [], isPending: isLoadingTopNews } = useGetHomeNews()
  const storyDetails = data.length > 0 ? data : storyDetailsBackupData
  const { data: relatedNewsData = [], isPending: isLoadingRelatedNews } = useGetNewsByCategoryName(storyDetails[0]?.section.split('.').join('') || 'home')
  const topNewsBackupData = topNews?.length > 0 ? topNews : worldCategoryBackupData
  const relatedNewsBackupData = relatedNewsData?.length > 0 ? relatedNewsData : worldCategoryBackupData.slice(4, 8)



  useEffect(() => {
    if (!isPending && (!data || data.length === 0)) {
      toast.warn(
        'The content displayed may not be the exact article you selected. Due to high server traffic, the original data could not be loaded, so temporary content is being shown instead.',
        { autoClose: 5000 }
      );
    }
  }, [isPending, data]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  if (isPending || isLoadingTopNews || isLoadingRelatedNews) return (
    <PageLoader />
  )


  return (
    <div className="mt-30">
      <div className={container}>
        <article className="flex flex-col lg:flex-row gap-[40px]">
          <div className="lg:w-[70%] w-full">
            <StoryDetailHeader storyData={storyDetails} />
            <StoryDetailBody storyData={storyDetails} />
            <CommentForm />
          </div>
          <div className="lg:w-[30%] w-full">
              <BoxSubscribe />
              <SideBoxFollowMedia />
            <div className="mt-20">
              <CategorySectionHeader containerStyles='!border-none' sectionInfo={{ name: 'Top News', link: `/category/home` }} />
              <div className="mt-10 flex flex-col gap-20">
                {topNewsBackupData?.slice(5, 9).map(({ section, uri, title, published_date, abstract, multimedia }, i) => (
                  <SideStoryBox key={uri} abstract={abstract} uri={uri}
                    img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} title={title}
                    parentStyles={`
                                    ${i !== topNewsBackupData?.slice(5, 9).length - 1 ? 'xl:pb-20 Mmd:pb-20 xl:border-b-1 Mmd:border-b-1 border-flex-gray-15' : ''}
                                    ${i !== topNewsBackupData?.slice(5, 9).length - 1 && i !== topNewsBackupData?.slice(5, 9).length - 2 ? 'pb-20 border-b-1 border-flex-gray-15' : ''}
                                    `}
                    updated={formatDate(published_date!)} category={section} />
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
      <section className="border-t-1 pt-[40px] border-flex-gray-15 mt-[60px]">
        <div className={`${container}`}>
          <div className="max-w-[1280px] mx-auto">
            <CategorySectionHeader containerStyles="!border-none" sectionInfo={{ name: 'You May also Like', link: `/category/${storyDetails[0]?.section.split('.').join('')}` }} />
            <div className="mt-20 grid lg:grid-cols-4 sm:grid-cols-2 gap-30">
              {relatedNewsBackupData?.slice(0, 4).map(({ title, uri, published_date, abstract, section, multimedia }) => (
                <StoryCategoryCard key={uri} description={abstract} category={section} uri={uri} title={title} updated={published_date!}
                  img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
              ))}
            </div>
          </div>
          <div className="mt-20">
            <TopicNavigationBar />
          </div>
        </div>
      </section>
    </div>
  )
}

export default StoryDetails
