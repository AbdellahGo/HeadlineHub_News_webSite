import { INewsType } from "../../types";
import { StoryCategoryContent, TopicNavigationBar } from "../shared";

type props = {
    artsNews: INewsType | undefined
}

const ArtsCategory = ({artsNews}: props) => {


    return (
        <section>
            <StoryCategoryContent sectionNmae='Arts' content={(artsNews)} />
            <div className="mt-20">
                <TopicNavigationBar />
            </div>
        </section>
    )
}

export default ArtsCategory