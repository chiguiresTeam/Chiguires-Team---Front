import './App.css';
import StandardLayout from './Layouts/StandardLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductDetailsPage from './Pages/ProductDetails';
import Home from './Pages/Home';
import Formalization from './Pages/Formalization';
import AdminPanelBusiness from './Pages/AdminPanelBusiness';
import AdminPanelTownHall from './Pages/AdminPanelTownHall';
import AdminPanelUser from './Pages/AdminPanelUser';
import Call from './Pages/Call';
import Register from './SignIn/Register';
import NotFound from './Pages/NotFound';
import Marketplace from './Pages/Marketplace';
import ProfileBussiness from './Pages/ProfileBusiness';
import ProfileUser from './Pages/ProfileUser';
import FormalizacionWizard from './Pages/FormalizationWizard';
import CallDetails from './Pages/CallDetails';


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
      { path: "/register", element: <Register></Register> },
      { path: "/profile", element: <ProfileUser></ProfileUser> },
      { path: "/profile-business", element: <ProfileBussiness></ProfileBussiness> },
      {path: "/marketplace", element: <Marketplace></Marketplace>},
      {path: "/formalization-wizard", element: <FormalizacionWizard></FormalizacionWizard>},
      {path: "/call-details", element: <CallDetails></CallDetails>},
      {path: "/panel", element: <AdminPanelBusiness> </AdminPanelBusiness>},
      {path: "/product/:productId", element: <ProductDetailsPage />}

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
