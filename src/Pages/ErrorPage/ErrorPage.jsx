
import { useRouteError } from 'react-router-dom';
import errorLogo from "../../../public/error-404.png"
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div className=' h-screen flex flex-col justify-center  items-center space-y-4'>
            <Helmet>
                <title>
                    Error 404
                </title>
            </Helmet>
            <div>
                <img src={errorLogo} className="w-96" alt="" />
            </div>

            <h2 className="text-3xl font-medium text-red-500 ">{error.statusText}</h2>
            <h3 className="text-2xl text-red-500">{error.error.message}</h3>
        </div>
    );
};

export default ErrorPage;