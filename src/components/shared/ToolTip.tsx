import { useState } from "react";
import { RiArrowUpSFill } from "react-icons/ri";

type props = {
  children: React.ReactNode
  title: string
  tooltipPosition?: 'top' | 'bottom'
}

const ToolTip = ({ title, children, tooltipPosition = 'bottom' }: props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      {title && (
        <div className={`z-[99999] absolute ${tooltipPosition === 'bottom' ? 'top-[35px]' : 'bottom-[30px]'} left-[50%] translate-x-[-50%] transition duration-4
          ${isVisible ? 'visible opacity-1' : 'invisible opacity-0'}`}>
          <div className="relative flex bg-black dark:bg-[#282828] text-white min-w-max py-[4px] px-[8px] rounded-[4px]">
            <RiArrowUpSFill className={`text-22 absolute ${tooltipPosition === 'bottom' ? 'top-[-12px]' : 'rotate-180 bottom-[-13px]'} left-1/2 -translate-x-1/2 text-black dark:text-[#282828]`} />
            <span className="block font-dmSans text-[13px] font-medium capitalize">{title}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolTip