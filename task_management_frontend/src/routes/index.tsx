import { createBrowserRouter } from 'react-router-dom'
import GeneralError from '../pages/errors/general-error'
import NotFoundError from '../pages/errors/not-found-error'
import MaintenanceError from '../pages/errors/maintenance-error'
import RequireAuth from '@/components/require-auth.tsx'
import TaskManagement from '../pages/task-management'

const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('../pages/auth/login')).default
    })
  },
  {
    path: '/signup',
    lazy: async () => ({
      Component: (await import('../pages/auth/signup')).default
    })
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('../pages/auth/forgot-password')).default
    })
  },
  {
    path: '/task_management',
    element: (
      <RequireAuth>
        <TaskManagement />
      </RequireAuth>
    )
  },
  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  
  // Fallback 404 route
  { path: '*', Component: NotFoundError }
])

export default router
