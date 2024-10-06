import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Staff from './pages/Staff';
import Student from './pages/Student';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/student-dashboard',
    element: <Student />,
  },
  {
    path: '/staff-dashboard',
    element: <Staff />,
  },
]);