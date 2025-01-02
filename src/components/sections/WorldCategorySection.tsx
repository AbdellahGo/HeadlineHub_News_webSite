import { useGetWorldNews } from "../../lib/react-query/queries"
import { StoryCategoryContent } from "../shared"



const WorldCategorySection = () => {
  const {data: WorldNews, isPending } = useGetWorldNews()

  if (isPending) return 'loading...'
  return (
    <section>
        <StoryCategoryContent  sectionInfo={{name: 'World', link: '/world'}} content={(WorldNews)} />
    </section>
  )
}

export default WorldCategorySection