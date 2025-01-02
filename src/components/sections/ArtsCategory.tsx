import { useGetArtsNews } from "../../lib/react-query/queries"
import { StoryCategoryContent, TopicNavigationBar } from "../shared";


const ArtsCategory = () => {
    const { data: artsNews, isPending } = useGetArtsNews()

    if (isPending) return 'Loading...'

    return (
        <section>
            <StoryCategoryContent sectionInfo={{ name: 'Arts', link: '/arts' }} content={(artsNews)} />
            <div className="mt-20">
                <TopicNavigationBar />
            </div>
        </section>
    )
}

export default ArtsCategory