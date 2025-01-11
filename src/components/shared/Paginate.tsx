import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { toast } from "react-toastify"
import { INewsType, ITopNewsType } from "../../types"
import { Dispatch, SetStateAction } from "react"

type Props = {
    moreNews: ITopNewsType | INewsType
    page: number
    setPage: Dispatch<SetStateAction<number>>
    setPagesList: Dispatch<SetStateAction<number[]>>
    pagesList: number[]
}

const Paginate = ({ moreNews, page, setPage, setPagesList, pagesList }: Props) => {
    const pageStyles = 'text-18 border-1 w-[25px] h-[25px] flex items-center justify-center rounded-full text-qlink-color dark:text-white border-flex-gray-15 dark:border-flex-gray-40 hover:border-hyperlink-line-color hover:text-white hover:bg-hyperlink-line-color duration-3'
    const NextPrevStyles = 'text-20 text-qlink-color dark:text-absolute-light duration-3 hover:opacity-[.7]'


    const handleClickOnPage = (pageNumbar: number) => {
        if (pageNumbar === page) {
            toast.warn('You Click On The Same Page.');
        }
        setPage(pageNumbar)
        setPagesList(prev => [...prev].slice(0, pageNumbar))
    }
    const handlePrev = () => {
        if (page === 1) {
            setPage(1)
            setPagesList([1])
            toast.warn('Sorry, No More Pages To Go.');
        } else {
            setPage(prev => prev - 1)
            setPagesList(prev => [...prev].slice(0, page - 1))
        }
    }

    const handleNext = () => {
        if (moreNews?.length === 0) {
            toast.warn('Sorry, No More Pages To Go.');
        } else {
            setPage(prev => prev + 1)
            setPagesList(prev => [...prev, page + 1])
        }
    }

    return (
        <div className="mt-30">
            <div className="px-20 flex items-center gap-10 justify-center">
                <button className={NextPrevStyles}
                    onClick={handlePrev}><IoIosArrowBack /></button>
                {pagesList.length <= 3 ? (
                    pagesList.map((page) => (
                        <button key={page} className={pageStyles}
                            onClick={() => pagesList.length > page && handleClickOnPage(page)}>
                            {page}
                        </button>
                    ))
                ) : (
                    <>
                        <button className={pageStyles}
                            onClick={() => handleClickOnPage(pagesList[0])}>
                            {pagesList[0]}
                        </button>

                        {pagesList.length > 3 && <span className="w-[35px] h-[35px] flex items-center justify-center text-qlink-color dark:text-white">...</span>}

                        <button className={pageStyles}
                            onClick={() => handleClickOnPage(pagesList[pagesList.length - 2])}>
                            {pagesList[pagesList.length - 2]}
                        </button>

                        <button disabled className={pageStyles}>
                            {pagesList[pagesList.length - 1]}
                        </button>
                    </>
                )}
                <button className={NextPrevStyles}
                    onClick={handleNext}><IoIosArrowForward /></button>
            </div>
        </div>
    )
}

export default Paginate