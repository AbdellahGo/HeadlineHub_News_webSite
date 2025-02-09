import { mySavesBanner } from "../../assets"

const MyNewsBanner = () => {
  return (
    <section className="w-full">
        <div className="relative p-40 bg-nav-color rounded-[2px]"
        style={{backgroundImage: `url(${mySavesBanner})`, backgroundPosition: 'center left', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',}}>
            <span className="absolute w-full h-full top-0 left-0 bg-[#00000055]"/>
            <div className="relative">
                <h2 className="font-semibold font-notoSans lg:text-[35px] text-[24px] text-white">My Saves</h2>
                <p className="mt-15 font-dmSans text-14 text-white">Keep everything in order and never lose sight of those essential reads!</p>
            </div>
        </div>
    </section>
  )
}

export default MyNewsBanner