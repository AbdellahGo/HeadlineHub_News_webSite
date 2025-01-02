import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import RootLayout from "./layout/RootLayout"
import { Home, AboutUs, Blog, Business, ContactUs, MyNews,
   Politics, Search, SignIn, SignUp, World, Technology, Arts,
    Opinion, Education, Health,  StoryDetails,
    Realestate,
    Science,
    Sports,
    Travel,
    Africa,
    Asia,
    Europe,
    Food} from "./pages"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        {/*//? pages  */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/story-details/:id" element={<StoryDetails />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/my-news" element={<MyNews />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog" element={<Blog />} />
        
        {/*//? News Categories */}
        <Route path="/world" element={<World />} />
        <Route path="/business" element={<Business />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/arts" element={<Arts />} />
        <Route path="/opinion" element={<Opinion />} />
        <Route path="/education" element={<Education />} />
        <Route path="/health" element={<Health />} />
        <Route path="/realestate" element={<Realestate />} />
        <Route path="/science" element={<Science />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/food" element={<Food />} />
        <Route path="/africa" element={<Africa />} />
        <Route path="/asia" element={<Asia />} />
        <Route path="/europe" element={<Europe />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
