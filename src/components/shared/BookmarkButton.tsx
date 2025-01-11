import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { ToolTip } from "../shared";
import { useAppContext } from "../../context/AppContext";

type storyType = {
    category: string
    title: string
    description: string
    updated: string
    image: string
    uri: string
}

type props = {
    storyData: storyType
    iconColor?: string 
}

const BookmarkButton = ({ storyData, iconColor }: props) => {
    const { user, allSavedStoriesUris, handleSaveOrUndoSaveStories} = useAppContext()
    

    
    return (
        <ToolTip title={allSavedStoriesUris.some((item) => item === storyData?.uri) ? 'Undo Save' : 'Save It'} tooltipPosition='top'>
            <button className={`text-11 group trasnition duration-3`} onClick={() => handleSaveOrUndoSaveStories({userId: user.id ,...storyData})}>
                {allSavedStoriesUris.some((item) => item === storyData?.uri) ? (
                    <FaBookmark color={iconColor} className="text-qlink-color dark:text-white group-hover:text-bookmark-color" />
                ) : (
                    <FaRegBookmark color={iconColor} className="text-qlink-color dark:text-white group-hover:text-bookmark-color" />
                )}
            </button>
        </ToolTip>
    )
}

export default BookmarkButton