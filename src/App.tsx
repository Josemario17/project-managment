import { Toaster } from 'sonner'
import { CostumRoutes } from './Pages/Routes'

function App() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className='container h-screen max-w-screen poppins-regular light bg-[#f6f6f6]'>
        <Toaster/>
        <CostumRoutes></CostumRoutes>
      </div>
    </>
  )
}

export default App
