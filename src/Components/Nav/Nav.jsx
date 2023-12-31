
import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/Logo.png"
import useAuth from "../../hooks/useAuth";
import auth from "../../Firebase/firebase.config";
import { toast } from "react-toastify";
const Nav = () => {
    const { user, logout } = useAuth()
    const currentUser = auth.currentUser
    // console.log("user in nav bar", user);
    const links = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/allfoods"}>All Food</NavLink></li>
        <li><NavLink to={"/blog"}>Blog</NavLink></li>
    </>

    const handleLogout = () => {
        logout()
            .then(() => {
                return toast.error("logged out")
            })
            .catch()
    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}

                        </ul>
                    </div>
                    <Link to={"/"}>
                        <img src={logo} className="w-24" alt="logo" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end ">
                    {
                        user ?
                            <div className="flex items-center gap-1">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={currentUser?.photoURL} alt="user image" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                                        <li><Link to={"/mypurchase"}>My Orders</Link></li>
                                        <li><Link to={"/myadded"}>My Added Products </Link></li>
                                        <li><Link to={"/addproduct"}>Add Product </Link></li>

                                    </ul>
                                </div>
                                <div>
                                    <button className="btn btn-sm bg-red-600 text-white outline-none hover:bg-red-400" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                            :
                            <Link to={"/login"} className="btn bg-red-600 text-white outline-none hover:bg-red-400 lg:px-8 ">Log In </Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Nav;