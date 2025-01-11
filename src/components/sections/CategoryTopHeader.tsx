import { container } from "../../clasess"
import { categoryDescriptions } from "../../lib/constants"
import { TopicNavigationBar } from "../shared"

type props = {
  category: string
}

const CategoryTopHeader = ({ category }: props) => {
  return (
    <section className="w-full mt-10">
      <div className={`${container} mb-20`}>
        <div className="flex flex-col gap-20">
          <h1 className="capitalize font-notoSans font-extrabold xl:leading-[45px] lg:leading-[39px] leading-[27px] xl:text-40 lg:text-[35px] text-[27px]  text-qlink-color dark:text-white">{category}</h1>
          {categoryDescriptions.map((item) => item.category ===  category && (
            <p key={item.category} className="font-dmSans text-14 dark:text-white text-qlink-color max-w-[600px]">
              {item.description}
            </p>
          ))}
        </div>
      </div>
      <TopicNavigationBar categoryToHide={category}/>
    </section>
  )
}

export default CategoryTopHeader