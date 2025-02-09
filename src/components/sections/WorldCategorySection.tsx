import { StoryCategoryContent } from "../shared"
import { INewsType } from "../../types"

type props = {
  worldNews: INewsType | undefined
}


const WorldCategorySection = ({worldNews}: props) => {
  return (
    <section>
        <StoryCategoryContent  sectionNmae='World' content={(worldNews)} />
    </section>
  )
}

export default WorldCategorySection