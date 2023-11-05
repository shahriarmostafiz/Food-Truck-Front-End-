
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLAyout';
import Home from '../Pages/Home/Home';

const MainRouter = createBrowserRouter([{
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [{
        path: "/",
        element: <Home></Home>
    }]

}])

export default MainRouter;