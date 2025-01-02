import { useParams } from "react-router"

const StoryDetails = () => {
  const {id} = useParams()
  console.log(id);
  
  return (
    <div>StoryDetails</div>
  )
}

export default StoryDetails