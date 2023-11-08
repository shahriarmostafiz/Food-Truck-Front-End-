import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Loading from '../../Components/Loading_Component/Loading';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

// import { , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
// import OrderProcess from '../../Components/OrderProcess/OrderProcess';

const Purchase = () => {
    const { id } = useParams()
    const { user } = useAuth()
    // const [myquant]
    const [fetchData, setFetchData] = useState(0)
    // const axiosSecure = useAxios()
    const [orderError, setError] = useState('')
    // console.log(user);
    const axiosSecure = useAxios()
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id, fetchData],
        queryFn: async () => {
            const data = await axiosSecure.get(`/food/${id}`)
            return data.data
        }
    })
    if (isLoading) { return <Loading></Loading> }
    if (isError) { return <h1>something went wrong </h1> }
    // if(isLoading &fetchData){
    //     return <OrderProcess></OrderProcess>
    // }
    // console.log(Object.keys(product));
    const { _id, food_name, image, category, price, quantity, chef, order_quantity, chef_email } = product
    // console.log(chef, chef_email);
    // console.log("availabe", quantity);
    const handlePurchase = e => {
        e.preventDefault()
        const form = e.target
        const food = form.food.value
        const name = form.name.value
        const orderingQuantity = Number(form.quantity.value)
        const email = form.email.value
        const date = Date.now()
        const price = form.price.value
        // if(order_quantity<0){
        //     return 
        // }
        if (orderingQuantity > quantity) {
            toast.error("Not Enough Stock")
            return setError("Not enough stock")
        }
        setError(null)
        if (email === chef_email) {
            return setError("you cant Buy your own products")
        }
        setError(null)
        const newQuantity = quantity - orderingQuantity
        const newOrder_quantity = order_quantity + orderingQuantity
        const data = {
            food,
            name,
            orderingQuantity,
            email,
            date,
            price,
            product_id: _id,
            image,
            chef,
            newQuantity,
            newOrder_quantity
        }
        // const newQuantity = quantity - orderingQuantity
        // const newOrder_quantity = order_quantity + orderingQuantity
        console.log("previously available", quantity)
        console.log("previous order total", order_quantity);

        console.log("now available", newQuantity);
        console.log("new order total", newOrder_quantity);
        const updateDB = {
            order_quantity: newOrder_quantity,
            quantity: newQuantity
        }
        console.log(updateDB);
        axiosSecure.post("/orders", data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    axiosSecure.patch(`foods/${_id}`, updateDB)
                        .then(res => {
                            console.log(res.data)
                            // if(res.data)
                            if (res.data.modifiedCount > 0) {
                                setFetchData(() => fetchData + 1)
                                return toast.success("purchase completed")
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
            .catch(err => console.log(err))

    }
    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>
                    Food Truck | Purchase
                </title>
            </Helmet>

            <div className='flex flex-col-reverse md:flex-row md:justify-between gap-6 my-4 lg:my-8'>
                <div className='flex-1'>
                    <img src={image} className='rounded-xl' alt="" />
                </div>
                <form onSubmit={handlePurchase} className=' flex-1 w-full space-y-4 my-5 shadow-xl px-8 py-6 rounded-xl'>
                    <div className=" flex flex-col  gap-4">
                        <div className="form-control  flex-1 ">
                            <label className="label">
                                <span className="label-text">Food Name: </span>
                            </label>
                            <input type="text" placeholder="Type here" defaultValue={food_name} disabled name='food' className="input input-bordered input-error w-full  " />
                        </div>
                        <div className="form-control  flex-1 ">
                            <label className="label">
                                <span className="label-text">Price: </span>
                            </label>
                            <input type="text" placeholder="Price" defaultValue={price} name='price' disabled className="input input-bordered input-error w-full  " />
                        </div>
                    </div>
                    <div className=" flex flex-col  gap-4">
                        <div className="form-control  flex-1">
                            <label className="label">
                                <span className="label-text">Quantity </span>
                            </label>
                            <input type="number" placeholder="Order Ammount" defaultValue={1} min={1} name='quantity' className="input input-bordered input-error w-full  " />
                        </div>
                        {/* <div className="form-control  flex-1">
                            <label className="label">
                                <span className="label-text">Purchase Date  </span>
                            </label>
                            <input type="date" name='date' className="input input-bordered input-error w-full  " />
                        </div> */}
                    </div>
                    <div className=" flex flex-col  gap-4">
                        <div className="form-control  flex-1">
                            <label className="label">
                                <span className="label-text">Name  </span>
                            </label>
                            <input type="text" placeholder="Type here" defaultValue={user?.displayName} disabled name='name' className="input input-bordered input-error w-full  " />
                        </div>
                        <div className="form-control  flex-1">
                            <label className="label">
                                <span className="label-text">Your Email  </span>
                            </label>
                            <input type="email" name='email' defaultValue={user?.email} disabled className="input input-bordered input-error w-full  " />
                        </div>
                    </div>

                    {
                        orderError ? <p className='text-red-500 font-bold text-center'>{orderError}</p> : ''
                    }

                    <div className='text-center'>
                        <button type='submit' className='btn bg-red-600 text-white outline-none border-none hover:bg-red-400 btn-wide'>Purchase</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Purchase;