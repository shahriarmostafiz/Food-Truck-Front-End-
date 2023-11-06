
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLAyout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/userAuthentication/Login';
import Register from '../Pages/userAuthentication/Register';
import AllFoods from '../Pages/AllFoods/AllFoods';
// import { Axios } from 'axios';
import SingleFood from '../Pages/SingleFood/SingleFood';

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

    }, {
        path: "/allfoods",
        element: <AllFoods></AllFoods>,
        loader: () => fetch("http://localhost:5000/api/v1/allfoodcount")
    }, {
        path: "/details/:id",
        element: <SingleFood></SingleFood>
    }]

}])

export default MainRouter;