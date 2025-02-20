import { useNavigate } from "react-router"
import { NoImage } from "../assets"
import { container } from "../clasess"
import { CategorySectionHeader, StoryCategoryCard, TopicNavigationBar } from "../components/shared"
import { INITIAL_USER, useAppContext } from "../context/AppContext"
import { useGetNewsByCategoryName, useLogOutAccount } from "../lib/react-query/queries"
import { useEffect } from "react"
import { worldCategoryBackupData } from "../lib/constants"

const Account = () => {
    const navigate = useNavigate()
    const { data: topNews = [], isPending } = useGetNewsByCategoryName('home')
    const { user, setIsAuthenticated, isAuthenticated, setUser } = useAppContext()
    const { mutate: signOut } = useLogOutAccount()
    const topNewsBackupData = topNews?.length > 0 ? topNews : worldCategoryBackupData 

    const buttonStyles = 'px-15 py-[5px] capitalize text-16 font-dmSans font-medium text-white bg-black hover:bg-hyperlink-line-color dark:bg-white dark:text-black dark:hover:text-white duration-3'

    const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        signOut()
        localStorage.removeItem('cookieFallback')
        setIsAuthenticated(false)
        setUser(INITIAL_USER)
        navigate('/')
    }

      useEffect(() => {
        const cookieFallback = localStorage.getItem('cookieFallback')
        if (!cookieFallback || !isAuthenticated) {
          navigate("/")
        }
      }, [])

      useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
      }, [])

    return (
        <div className="w-full pt-20 ">
            <div className={container}>
                <div className="pt-40 pb-20 w-full text-center">
                    <h3 className="font-notoSans text-meta-fcolor uppercase xl:text-20 text-18 font-semibold">Manage Your Account</h3>
                    <h1 className="font-notoSans font-semibold text-black xl:leading-[40px] lg:leading-[35px] leading-[27px]  dark:text-white xl:text-40 lg:text-[35px] text-[27px] uppercase">
                        Account Settings
                    </h1>
                </div>
                <div className="bg-flex-gray-7 p-20 mt-20 flex sm:flex-row flex-col items-end sm:justify-between gap-20 ">
                    <div className="Msm:w-full flex flex-col gap-[5px]">
                        <h1 className="font-notoSans font-bold text-16 text-black dark:text-white">
                            {user.username}
                        </h1>
                        <h3 className="font-dmSans font-semibold text-14 text-qlink-color dark:text-absolute-light">
                            Name: {" "}
                            <span className="text-hyperlink-line-color">{user.name}</span>
                        </h3>
                        <h3 className="font-dmSans font-semibold text-14 text-qlink-color dark:text-absolute-light">
                            Email: {" "}
                            <span className="text-hyperlink-line-color">{user.email}</span>
                        </h3>
                    </div>
                    <div className="flex items-center gap-15">
                        <button className={buttonStyles} onClick={handleLogOut}>Log Out</button>
                    </div>
                </div>
            </div>
            <section className="border-t-1 pt-[40px] border-flex-gray-15 mt-[40px]">
                <div className={`${container}`}>
                    <CategorySectionHeader containerStyles="!border-none" sectionInfo={{ name: 'Top News', link: '/category/home' }} />
                    {isPending ? 'loading' : (
                    <div className="mt-20 grid lg:grid-cols-4 sm:grid-cols-2 gap-30">
                        {topNewsBackupData?.slice(0, 4).map(({ title, uri, published_date, abstract, section, multimedia }) => (
                            <StoryCategoryCard key={uri} description={abstract} category={section} uri={uri} title={title} updated={published_date!}
                                img={multimedia ? (multimedia[1]?.url ? multimedia[1].url : multimedia[0]?.url) : NoImage} />
                        ))}
                    </div>
                    )}
                </div>
                <div className="mt-30">
                    <TopicNavigationBar />
                </div>
            </section>
        </div>
    )
}

export default Account