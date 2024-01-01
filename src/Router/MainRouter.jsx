
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLAyout.jsx';
import Home from '../Pages/Home/Home.jsx';
import Login from '../Pages/userAuthentication/Login.jsx';
import Register from '../Pages/userAuthentication/Register.jsx';
import AllFoods from '../Pages/AllFoods/AllFoods.jsx';
// import { Axios } from 'axios';
import SingleFood from '../Pages/SingleFood/SingleFood.jsx';
import Purchase from '../Pages/Purchase/Purchase.jsx';
import PriveRoute from './PriveRoute.jsx';
import MyPurchase from '../Pages/MyPurchase/MyPurchase.jsx';
import AddProduct from '../Pages/AddProduct/AddProduct.jsx';
import MyAdded from '../Pages/MyAddedProduct/MyAdded.jsx';
import UpdateProduct from '../Pages/UpdateMyProduct/UpdateProduct.jsx';
import ErrorPage from '../Pages/ErrorPage/ErrorPage.jsx';
import Blog from '../Pages/Blog/Blog.jsx';

const MainRouter = createBrowserRouter([{
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [{
        path: "/",
        element: <Home></Home>
    }, {
        path: "/blog",
        element: <Blog></Blog>
    }, {
        path: "/login",
        element: <Login></Login>
    }, {
        path: "/register",
        element: <Register></Register>

    }, {
        path: "/allfoods",
        element: <AllFoods></AllFoods>,
        loader: () => fetch("https://food-truck-server.vercel.app/api/v1/allfoodcount")
    }, {
        path: "/details/:id",
        element: <SingleFood></SingleFood>
    },
    {
        path: "/purchase/:id",
        element: <PriveRoute>
            <Purchase></Purchase>
        </PriveRoute>
    }, {
        path: "/mypurchase",
        element: <PriveRoute><MyPurchase></MyPurchase></PriveRoute>
    }, {
        path: "/addproduct",
        element: <PriveRoute><AddProduct></AddProduct></PriveRoute>
    }, {
        path: "/myadded",
        element: <PriveRoute><MyAdded></MyAdded></PriveRoute>
    }, {
        path: "/update/:id",
        element: <PriveRoute><UpdateProduct></UpdateProduct></PriveRoute>
    }]

}])

export default MainRouter;