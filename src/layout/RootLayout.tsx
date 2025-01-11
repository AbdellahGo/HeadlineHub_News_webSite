import { useState } from "react"
import { NavBar, Footer } from "../components/shared"
import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import { useAppContext } from "../context/AppContext"

const RootLayout = () => {
  const { isDarkMode } = useAppContext()
  const [navBarHeight, setNavBarHeight] = useState<number | null>(null)

  return (
    <div>
      <div className="relative z-[99999]">
        <NavBar navBarHeight={navBarHeight} setNavBarHeight={setNavBarHeight} />
      </div>
      <main style={{ paddingTop: `${navBarHeight! + 20}px` }}>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-left" autoClose={2000} 
            theme={isDarkMode ? 'dark' : 'light'}
             />
    </div>
  )
}

export default RootLayout