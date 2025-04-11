import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'

export const CostumRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn></SignIn>} />
                <Route path="/signup" element={<SignUp></SignUp>} />
            </Routes>
        </BrowserRouter>
    )
}