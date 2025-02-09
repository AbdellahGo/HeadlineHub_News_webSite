import { useEffect } from "react"
import { BusinessCategory, ArtsCategory, HeroSection, TechnologyCategory, WorldCategorySection, MoreNewsSection, PoliticsCategory } from "../components/sections"
import { PageLoader } from "../components/shared"
import { worldCategoryBackupData } from "../lib/constants"
import { useGetArtsNews, useGetBusinessNews, useGetHomeNews, useGetPoliticsNews, useGetTechnologyNews, useGetWorldNews } from "../lib/react-query/queries"
import { INewsType } from "../types"
import { toast } from "react-toastify"

const Home = () => {
  const { data: homeNews = [], isPending: isLoadingHomeNews } = useGetHomeNews()
  const { data: worldNews = [], isPending: isLoadingWorldNews } = useGetWorldNews()
  const { data: businessNews = [], isPending: isLoadingBusinessNews } = useGetBusinessNews()
  const { data: technologyNews = [], isPending: isLoadingTechnologyNews } = useGetTechnologyNews()
  const { data: artsNews = [], isPending: isLoadingArtNews } = useGetArtsNews()
  const { data: politicsNews = [], isPending: isLoadingPoliticsNews } = useGetPoliticsNews()
  const backupData: INewsType = (worldCategoryBackupData as INewsType)


  useEffect(() => {
    const allNewsLoading = isLoadingHomeNews && isLoadingWorldNews && isLoadingBusinessNews && isLoadingTechnologyNews && isLoadingArtNews && isLoadingPoliticsNews;
    const allNewsEmpty = homeNews.length === 0 && worldNews.length === 0 && businessNews.length === 0 && technologyNews.length === 0 && artsNews.length === 0 && politicsNews.length === 0;

    if (allNewsLoading && allNewsEmpty) {
      toast.warn(
        'The displayed data is not real-time data. It was previously stored because the actual content could not be loaded from the server due to compression issues.',
        { autoClose: 5000 }
      );
    }
  }, [isLoadingHomeNews, isLoadingWorldNews, isLoadingBusinessNews, isLoadingTechnologyNews, isLoadingArtNews, isLoadingPoliticsNews, homeNews, worldNews, businessNews, technologyNews, artsNews, politicsNews, ]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  if (isLoadingHomeNews ||
    isLoadingWorldNews ||
    isLoadingBusinessNews ||
    isLoadingTechnologyNews ||
    isLoadingArtNews ||
    isLoadingPoliticsNews
  ) return (
    <PageLoader />
  )




  return (
    <div className="pt-20 relative">
      <HeroSection homeNews={homeNews?.length > 0 ? homeNews : backupData.slice(0, 9)} />
      <WorldCategorySection worldNews={worldNews?.length > 0 ? worldNews : backupData.slice(9, 13)} />
      <BusinessCategory businessNews={businessNews?.length > 0 ? businessNews : backupData.slice(13, 20)} />
      <TechnologyCategory technologyNews={technologyNews?.length > 0 ? businessNews : backupData.slice(20, 25)} />
      <ArtsCategory artsNews={artsNews?.length > 0 ? businessNews : backupData.slice(25, 29)} />
      <PoliticsCategory politicsNews={politicsNews?.length > 0 ? businessNews : backupData.slice(29, 33)} />
      <MoreNewsSection startSliceIndex={0} lastSliceIndex={8} moreNews={homeNews?.length > 0 ? businessNews : backupData.slice(33)} />
    </div>
  )
}

export default Home

