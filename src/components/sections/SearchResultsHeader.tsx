import { FormEvent, useRef } from "react";
import { searchBanner } from "../../assets"
import { container } from "../../clasess"
import { GoSearch } from "react-icons/go";
import { useAppContext } from "../../context/AppContext";
type props = {
    resultLength: number
}

const SearchResultsHeader = ({resultLength}: props) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const {searchQuery, setSearchQuery} = useAppContext()
    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()
        const searchValue = inputRef.current?.value
        if (searchValue) {
            setSearchQuery(searchValue)
            inputRef.current!.value = ''
        }
    }
    return (
        <section className="w-full lg:pt-50 pt-[25px]"
            style={{
                backgroundImage: `url(${searchBanner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'scroll',
                backgroundPosition: 'center'
            }}>
            <div className={container}>
                <div className="mb-10 text-center">
                    <h1 className="capitalize font-notoSans font-extrabold text-white xl:text-[40px] lg:text-[35px] text-[24px] xl:leading-[45px] lg:leading-[39px] leading-[27px]">
                        Search Results for: {searchQuery}
                    </h1>
                    <p className="mt-[10px] font-dmSans text-16 text-heading-tagline-color">Showing {resultLength} results for your search </p>
                </div>
                <form className="translate-y-[30px] mx-auto border-[2px] border-white max-w-[620px] bg-solid-white flex"
                onSubmit={handleSubmitForm}>
                    <div className="pl-15 flex items-center">
                        <GoSearch className="text-white lg:text-[24px] text-[20px]" />
                    </div>
                    <input ref={inputRef} type="text" placeholder="Search Headlines, News..." className="outline-none border-none bg-transparent w-full font-dmSans text-14 text-white lg:px-15 px-12 lg:py-20 py-15 placeholder:text-white placeholder:text-14 placeholder:font-dmSans" />
                    <button className="lg:text-16 text-12 group flex items-center px-20 py-[5px] relative font-notoSans font-semibold text-white hover:bg-white hover:text-qlink-color duration-3">
                        Search
                        <span className="w-[1px] h-[50%] absolute bg-hyperlink-line-color duration-3 group-hover:bg-white left-0" />
                    </button>
                </form>
            </div>
        </section>
    )
}

export default SearchResultsHeader