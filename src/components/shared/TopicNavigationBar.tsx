import { Link } from "react-router"
import { container } from "../../clasess"
import { newsCategories } from "../../lib/constants"

const TopicNavigationBar = () => {
  return (

        <div className={container}>
                <ul className="flex flex-wrap gap-8">
                    <li className="md:text-[25px] text-[19px] text-hyperlink-line-color font-dmSans leading-[36px]">
                        #
                    </li>
                    {newsCategories.map(({ link, name }) => (
                        <li key={link}>
                            <Link to={link} className="block text-qlink-color dark:text-white hover:text-white hover:bg-hyperlink-line-color hover:border-hyperlink-line-color duration-3 font-bold rounded-[20px] text-14 p-[7px_20px] border-[0.5px] border-qlink-color dark:border-white">
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
  )
}

export default TopicNavigationBar