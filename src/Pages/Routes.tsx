import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Dashboard from './Managment/Dashboard'
import Projects from './Managment/Projects'
import ProjectDetails from './Managment/Project/id'
import CreateProject from './Managment/Project/create'
import { useUserStore } from '../store/UserStore'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useUserStore();
    if (!isAuthenticated) {
      return <Navigate to="/SignIn" replace />
    }

    if (isAuthenticated && window.location.pathname === "/" || window.location.pathname === "/SignIn") {
      return <Navigate to="/dashboard" replace />
    }
    return children;
  };
  

export const CostumRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/" element={<ProtectedRoute><SignIn /></ProtectedRoute>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/projects/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}