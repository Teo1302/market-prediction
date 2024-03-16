import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Order from "../pages/dashboard/Order";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import Login from "../components/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import Oferta from "../pages/shop/Oferta";
import Rezervare from "../pages/shop/Rezervare";
import Reservation from "../pages/shop/Reservation";
import CartDetails from "../pages/shop/CartDetails";
import Numerar from "../pages/shop/Numerar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu/>,
      },
      {
        path: "/order",
        element:<PrivateRouter><Order/></PrivateRouter>
      },
      {
        path: "/cart-page",
        element: <CartPage/>,
      },
      {
        path: "/cart-details",
        element: <CartDetails/>,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>,
      },
      {
        path: "/process-checkout",
        element: <Payment/>
      },
      {
        path: "/rezervare",
        element: <Rezervare/>
      },
      {
        path: "/oferta",
        element: <Oferta/>
      },
      {
        path: "/vizualizare-rezervari",
        element: <Reservation/>
      },
      {
        path: "//checkout-numerar",
        element: <Numerar/>
      },

    ]
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: 'dashboard',
    element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'users', 
        element: <Users/>
      },
      {
        path: 'add-menu',
        element: <AddMenu/>
      }, 
      {
        path: "manage-items",
        element: <ManageItems/>
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu/>,
        loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
      },
      //{
        //path: 'bookings',
       // element: <ManageBookings/>
      //}
    ]
  }
]);

export default router;