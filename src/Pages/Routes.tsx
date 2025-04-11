import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Dashboard from './Managment/Dashboard'

export const CostumRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn></SignIn>} />
                <Route path="/signup" element={<SignUp></SignUp>} />
                <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
            </Routes>
        </BrowserRouter>
    )
}