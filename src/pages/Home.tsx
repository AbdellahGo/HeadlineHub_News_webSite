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
      <MoreNewsSection startSliceIndex={0} lastSliceIndex={8} />
    </div>
  )
}

export default Home

