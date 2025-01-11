import { useGetWorldNews } from "../../lib/react-query/queries"
import { StoryCategoryContent } from "../shared"



const WorldCategorySection = () => {
  const {data: WorldNews = [], isPending } = useGetWorldNews()

  if (isPending) return 'loading...'
  return (
    <section>
        <StoryCategoryContent  sectionNmae='World' content={(WorldNews)} />
    </section>
  )
}

export default WorldCategorySection