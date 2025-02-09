import { toast } from "react-toastify"
import { CategoryMoreNews, CategorySectionBanner } from "../components/sections"
import { PageLoader } from "../components/shared"
import { blogsBackupData } from "../lib/constants"
import { useGetBlogs } from "../lib/react-query/queries"
import { useEffect } from "react"

const Blog = () => {
  const { data: blogs = [], isPending } = useGetBlogs()


  useEffect(() => {
    if (!isPending && blogs.length === 0) {
      toast.warn(
        'The displayed blog posts are from previously saved data because the original content could not be loaded due to high server traffic. Please try again later.',
        { autoClose: 5000 }
      );
    }
  }, [isPending, blogs]);
  
  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [])
  
  if (isPending) return (
    <PageLoader />
  )

  const content = blogs.length ? blogs : blogsBackupData;



  return (
    <div>
      <CategorySectionBanner baseImageUrl='https://www.nytimes.com/' category={'blogs'} content={content.slice(0, 5)} />
      <CategoryMoreNews baseImageUrl='https://www.nytimes.com/' content={content} />
    </div>
  )
}

export default Blog
