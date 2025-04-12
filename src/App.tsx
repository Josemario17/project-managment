import { Toaster } from 'sonner'
import { CostumRoutes } from './Pages/Routes'

function App() {
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
