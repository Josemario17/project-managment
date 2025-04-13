import { Toaster } from 'sonner'
import { CostumRoutes } from './Pages/Routes'
import { useEffect } from 'react'
import { useUserStore } from './store/UserStore'
import Cookies from 'js-cookie'
function App() {
  const { setUserData, userData } = useUserStore()
  useEffect(() => {
    const userCookiesData = Cookies.get("user_data")
    if (userCookiesData && userData === null) {
      const parsedData = JSON.parse(userCookiesData)
      setUserData(parsedData)
    }
  }, [userData])
  return (
    <>
      <div className='container h-screen max-w-screen poppins-regular light'>
        <Toaster/>
        <CostumRoutes></CostumRoutes>
      </div>
    </>
  )
}

export default App
