import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import bgImage from "../../../public/login.png"
import { FcGoogle } from 'react-icons/fc';
import useAxios from '../../hooks/useAxios';

// FcGoogle 

const Register = () => {
    const { signup, logout, update } = useAuth()
    const axiosSecure = useAxios()
    // const location = useLocation()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const handleRegister = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const name = form.name.value
        const image = form.image.value
        const password = form.password.value
        const thisUser = { email, name, image, password }
        console.log(email, password);
        signup(email, password)
            .then(res => {
                console.log(res.user)
                update(name, image)
                axiosSecure.post("/users", thisUser)
                    .then(res => {
                        const data = res.data
                        // if(data.ac)
                        console.log(data)
                    })
                logout()
                    .then()
                    .catch()
                navigate('/login')
            })
            .catch(err => { console.log(err) })
    }

    return (
        <div className='my-6'>
            <div className='md:flex justify-between items-center bg-[url("https://i.ibb.co/m8gh9GK/Colored-Shapes.png")] bg-cover bg-center'>
                <div className='flex-1'>
                    <img src={bgImage} className='max-w-sm lg:max-w-lg' alt="" />
                </div>
                <div className='flex-1'>
                    <h1 className='text-4xl text-red-500 p-4 lg:px-8 font-bold'>Signup </h1>
                    <div className=' '>
                        <form onSubmit={handleRegister} className='p-8 space-y-4    w-full '>
                            <div className='w-full space-y-2 flex  flex-col'>
                                <label htmlFor="" className='underline font-medium'>Name:</label>
                                <input type="text" name='name' placeholder='Name' className='input input-bordered input-accent w-full max-w-sm' />
                            </div>
                            <div className='w-full space-y-2 flex  flex-col'>
                                <label htmlFor="" className='underline font-medium'>Email:</label>
                                <input type="email" name='email' placeholder='Email' className='input input-bordered input-accent w-full max-w-sm' />
                            </div>
                            <div className='w-full md:w-4/5  space-y-2 flex flex-col'>
                                <label htmlFor="" className=' underline font-medium'>Password:</label>
                                <div className="relative max-w-sm  ">
                                    <input type={showPass ? "text" : "password"} name='password' placeholder='Password' className=' input input-bordered input-accent w-full max-w-sm' />
                                    <p onClick={() => { setShowPass(!showPass) }} className='absolute top-3 px-2 right-4 cursor-pointer '>{showPass ? "hide" : "show"}</p>
                                </div>
                            </div>
                            <div className='w-full space-y-2 flex  flex-col'>
                                <label htmlFor="" className='underline font-medium'>Image :</label>
                                <input type="url" name='image' placeholder='Image Url' className='input input-bordered input-accent w-full max-w-sm' />
                            </div>
                            <div className=" text-center max-w-sm ">
                                <button type='submit' className='btn btn-error text-white btn-wide'>SignUp </button>
                            </div>
                        </form>
                        <div className='w-full      px-8   pb-4 space-y-4'>
                            <div className='w-full max-w-sm text-center  space-y-4'>
                                <h1>or</h1>
                                <button className='btn btn-wide'>Sign Up with <FcGoogle />  </button>
                            </div>

                            <p className='max-w-sm text-center '>Already have an Account? <Link className="text-red-500 font-bold" to={'/login'}>Login </Link></p>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;