
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLAyout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/userAuthentication/Login';
import Register from '../Pages/userAuthentication/Register';

const MainRouter = createBrowserRouter([{
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [{
        path: "/",
        element: <Home></Home>
    }, {
        path: "/login",
        element: <Login></Login>
    }, {
        path: "/register",
        element: <Register></Register>

    }]

}])

export default MainRouter;