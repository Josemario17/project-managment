import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Dashboard from './Managment/Dashboard'
import Projects from './Managment/Projects'
import ProjectDetails from './Managment/Project/id'

export const CostumRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn></SignIn>} />
                <Route path="/signup" element={<SignUp></SignUp>} />
                <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
                <Route path='/projects' element={<Projects></Projects>}></Route>
                <Route path='/projects/:id' element={<ProjectDetails></ProjectDetails>}></Route>
            </Routes>
        </BrowserRouter>
    )
}