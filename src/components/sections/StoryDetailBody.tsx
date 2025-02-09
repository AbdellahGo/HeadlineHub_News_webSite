import { NoImage } from "../../assets"
import { INewsType } from "../../types"

type props = {
    storyData: INewsType
}

const StoryDetailBody = ({ storyData }: props) => {

    return (
        <div>
            <div className="image-container xl:mt-30 mt-20">
                <img className="w-full max-h-[550px] object-cover" src={storyData[0]?.multimedia.length > 0 ? `https://www.nytimes.com/${storyData[0]?.multimedia[0]?.url}`: NoImage} />
            </div>
            <div className="mt-20">
                <p className="flex items-center gap-5 font-dmSans text-16 text-qlink-color dark:text-white">
                    <span className="xl:text-[70px] text-[60px] font-bold">{storyData[0]?.leadParagraph![0]}</span>
                    {storyData[0]?.leadParagraph?.slice(1)}</p>
            </div>
            <div className="mt-10">
                <p className="flex items-center gap-5 font-dmSans text-16 text-qlink-color dark:text-white">
                    {storyData[0]?.snippet}</p>
            </div>
        </div>
    )
}

export default StoryDetailBody