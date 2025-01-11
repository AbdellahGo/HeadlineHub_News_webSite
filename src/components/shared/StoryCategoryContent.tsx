import StoryCategoryCard from "./StoryCategoryCard";
import { container } from "../../clasess";
import { INewsType } from "../../types";
import { NoImage } from "../../assets";
import CategorySectionHeader from "./CategorySectionHeader";

type props = {
  sectionNmae: string
  content: INewsType | undefined
}

const StoryCategoryContent = ({ content, sectionNmae }: props) => {
  return (
    <div className={`lg:mt-40 mt-30 ${container}`}>
      <CategorySectionHeader sectionInfo={{name: sectionNmae, link: `/category/${sectionNmae.toLowerCase()}`}} />
      <div className="mt-20 grid lg:grid-cols-4 sm:grid-cols-2 gap-30">
        {content?.slice(0, 4).map(({ title, uri, published_date, abstract, multimedia }) => (
          <StoryCategoryCard key={uri} description={abstract} category={sectionNmae} uri={uri} title={title} updated={published_date}
            img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
        ))}
      </div>
    </div>
  )
}

export default StoryCategoryContent