import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { ToolTip } from "../shared";
import { useState } from "react";

const BookmarkButton = () => {
    const [saveIt, setSaveIt] = useState(false)
    return (
        <ToolTip title={saveIt ? 'Undo Save' : 'Save It'} tooltipPosition='top'>
            <button className="text-11 group trasnition duration-3" onClick={() => setSaveIt(prev => !prev)}>
                {saveIt ? (
                    <FaBookmark className="text-qlink-color dark:text-white group-hover:text-bookmark-color" />
                ) : (
                    <FaRegBookmark className="text-qlink-color dark:text-white group-hover:text-bookmark-color" />
                )}
            </button>
        </ToolTip>
    )
}

export default BookmarkButton