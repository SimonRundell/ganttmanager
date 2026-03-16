import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppShell from './components/layout/AppShell'
import ProtectedRoute from './components/layout/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import TeacherDashboardPage from './pages/TeacherDashboardPage'
import ProjectPage from './pages/ProjectPage'
import GanttPage from './pages/GanttPage'
import ReportsPage from './pages/ReportsPage'
import ProfilePage from './pages/ProfilePage'
import TasksPage from './pages/TasksPage'
import ResourcesPage from './pages/ResourcesPage'
import { useAuthStore } from './store/authStore'

const queryClient = new QueryClient()

function App() {
  const loadProfile = useAuthStore((state) => state.loadProfile)

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectPage />} />
            <Route path="gantt" element={<GanttPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="teacher" element={<TeacherDashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}

export default App
