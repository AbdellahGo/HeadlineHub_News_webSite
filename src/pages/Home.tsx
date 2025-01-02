import { BusinessCategory, ArtsCategory, HeroSection, TechnologyCategory, WorldCategorySection, MoreNewsSection, PoliticsCategory } from "../components/sections"

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <WorldCategorySection/>
      <BusinessCategory/>
      <TechnologyCategory/>
      <ArtsCategory/>
      <PoliticsCategory/>
      <MoreNewsSection/>
    </div>
  )
}

export default Home