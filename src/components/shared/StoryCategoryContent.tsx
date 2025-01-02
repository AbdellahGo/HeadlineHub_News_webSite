import StoryCategoryCard from "./StoryCategoryCard";
import { container } from "../../clasess";
import { INewsType } from "../../types";
import { NoImage } from "../../assets";
import CategorySectionHeader from "./CategorySectionHeader";

type props = {
  sectionInfo: { name: string, link: string }
  content: INewsType | undefined
}

const StoryCategoryContent = ({ content, sectionInfo }: props) => {
  return (
    <div className={`lg:mt-40 mt-30 ${container}`}>
      <CategorySectionHeader sectionLink={sectionInfo.link} sectionName={sectionInfo.name} />
      <div className="mt-20 grid lg:grid-cols-4 sm:grid-cols-2 gap-30">
        {content?.slice(0, 4).map(({ title, uri, published_date, multimedia }) => (
          <StoryCategoryCard key={uri} category={sectionInfo.name} uri={uri} title={title} updated={published_date}
            img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
        ))}
      </div>
    </div>
  )
}

export default StoryCategoryContent