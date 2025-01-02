import { useAppContext } from "../../context/AppContext"
import { LogoIconDarkMode, LogoIconLightMode } from "../../assets"

const FormHead = () => {
      const { isDarkMode } = useAppContext()
  return (
    <div className="mb-[25px] pb-20 flex flex-col items-center">
    <img src={isDarkMode ? LogoIconDarkMode : LogoIconLightMode} alt="HNHLogo" className="mb-20 mx-auto max-h-[60px]" />
    <h2 className="text-center relative font-notoSans font-bold text-qlink-color dark:text-white  text-20 leading-[28px]">
      Welcome to HeadlineHub
    </h2>
    <span className="mt-15 block w-[30px] border-b-[6px] border-dotted border-hyperlink-line-color " />
  </div>
  )
}

export default FormHead