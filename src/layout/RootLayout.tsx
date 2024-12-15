import { NavBar, Footer } from "../components/shared"
import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default RootLayout