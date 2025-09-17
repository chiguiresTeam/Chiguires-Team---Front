import './App.css';
import StandardLayout from './Layouts/StandardLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Formalization from './pages/Formalization';
import Home from './pages/Home';
import AdminPanelBusiness from './pages/AdminPanelBusiness';
import AdminPanelTownHall from './pages/AdminPanelTownHall';
import AdminPanelUser from './pages/AdminPanelUser';
import Call from './pages/Call';
import Login from './SignIn/Login';
import Register from './SignIn/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    element: <StandardLayout></StandardLayout>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/formalization", element: <Formalization></Formalization> },
      { path: "/admin-business", element: <AdminPanelBusiness></AdminPanelBusiness> },
      { path: "/admin-townhall", element: <AdminPanelTownHall></AdminPanelTownHall> },
      { path: "/admin-user", element: <AdminPanelUser></AdminPanelUser> },
      { path: "/call", element: <Call></Call> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/profile", element: <Profile></Profile> }
    ],
  },
  { path: "/*", element: <NotFound></NotFound> }
])

function App() {
  return (<>
    <RouterProvider router={router}></RouterProvider>
  </>);
}

export default App;
