import { Dispatch, SetStateAction } from "react"
import { FaArrowRightLong } from "react-icons/fa6"
import { INewsType } from "../../types"

type props = {
  setPage: Dispatch<SetStateAction<number>>
  newsList: INewsType | any
  lastNewsIndex: number
}

const MoreNewsButton = ({ setPage, newsList, lastNewsIndex }: props) => {
  return (
    <button disabled={!(newsList?.length > lastNewsIndex)} className={`flex capitalize items-center gap-[5px] hover:pl-[15px] mx-auto mt-30 text-qlink-color dark:text-white font-semibold text-13 hover:text-hyperlink-line-color font-notoSans duration-3`}
      onClick={() => setPage(prev => prev + 1)}>
      More news
      <FaArrowRightLong className="text-[12px]" />
    </button>
  )
}

export default MoreNewsButton