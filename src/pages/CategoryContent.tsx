import { useParams } from "react-router"
import { CategoryMoreNews, CategorySectionBanner, CategoryTopHeader } from "../components/sections"
import { useGetNewsByCategoryName } from "../lib/react-query/queries"
import { PageLoader } from "../components/shared"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { worldCategoryBackupData } from "../lib/constants"
import { INewsType } from "../types"

const CategoryContent = () => {
  const { section } = useParams()
  const { data: news = [], isPending } = useGetNewsByCategoryName(section!)

  useEffect(() => {
    if (!isPending && news.length === 0) {
      toast.warn(
        'The displayed data is not real-time data. It was previously stored because the actual content could not be loaded from the server due to compression issues.',
        { autoClose: 5000 }
      );
    }
  }, [isPending, news]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])

  if (isPending) return (
   <PageLoader/>
  )

  const backupNewsData: INewsType = news?.length > 0 ? news : (worldCategoryBackupData as INewsType)
  
  return (
    <div className="pt-20">
      <CategoryTopHeader category={section!} />
      <CategorySectionBanner category={section!} content={backupNewsData!.slice(0, 5)} />
      <CategoryMoreNews content={backupNewsData} />
    </div>
  )
}

export default CategoryContent