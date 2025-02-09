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
    showText?: boolean
    buttonStyles?: string
}

const BookmarkButton = ({ storyData, iconColor, showText, buttonStyles }: props) => {
    const { user, allSavedStoriesUris, handleSaveOrUndoSaveStories } = useAppContext()

    return (
        <ToolTip title={allSavedStoriesUris.some((item) => item === storyData?.uri) ? 'Undo Save' : 'Save It'} tooltipPosition='top'>
            <button className={`flex gap-[5px] items-center text-11 border-none outline-none trasnition duration-3 text-qlink-color dark:text-white hover:text-bookmark-color ${buttonStyles}`} 
            onClick={() => handleSaveOrUndoSaveStories({ userId: user.id, ...storyData })}>
                {allSavedStoriesUris.some((item) => item === storyData?.uri) ? (
                    <FaBookmark color={iconColor} />
                ) : (
                    <FaRegBookmark color={iconColor} />
                )}
                {showText && (allSavedStoriesUris.some((item) => item === storyData?.uri) ? 'Undo Save' : 'Save It')}
            </button>
        </ToolTip>
    )
}

export default BookmarkButton
