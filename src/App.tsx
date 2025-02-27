import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import RootLayout from "./layout/RootLayout"
import { Home, Blog, ContactUs, MyNews, Search, SignIn, SignUp, StoryDetails, CategoryContent, Account} from "./pages"


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        {/*//? pages  */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/story-details/:uri" element={<StoryDetails />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/my-news" element={<MyNews />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/category/:section" element={<CategoryContent />} />
        <Route path="/account" element={<Account />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
