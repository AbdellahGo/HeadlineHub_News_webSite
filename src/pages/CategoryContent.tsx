import { useParams } from "react-router"
import { CategoryMoreNews, CategorySectionBanner, CategoryTopHeader } from "../components/sections"
import { useGetNewsByCategoryName } from "../lib/react-query/queries"

const CategoryContent = () => {
  const { section } = useParams()
  const { data: news = [], isPending } = useGetNewsByCategoryName(section!)
  if (isPending) return 'loading ...'
  return (
    <div>
      <CategoryTopHeader category={section!} />
      <CategorySectionBanner category={section!} content={news!.slice(0, 5)} />
      <CategoryMoreNews content={news} />
    </div>
  )
}

export default CategoryContent