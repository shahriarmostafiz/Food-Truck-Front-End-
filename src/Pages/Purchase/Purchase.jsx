import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Loading from '../../Components/Loading_Component/Loading';

const Purchase = () => {
    const { id } = useParams()
    const { user } = useAuth()
    // const axiosSecure = useAxios()
    const [orderError, setError] = useState('')
    // console.log(user);
    const axiosSecure = useAxios()
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const data = await axiosSecure(`/food/${id}`)
            return data.data
        }
    })
    if (isLoading) { return <Loading></Loading> }
    if (isError) { return <h1>something went wrong </h1> }
    console.log(Object.keys(product));
    const { _id, food_name, image, category, price, quantity, chef, order_quantity, chef_email } = product
    console.log(chef, chef_email);
    console.log("availabe", quantity);
    const handlePurchase = e => {
        e.preventDefault()
        const form = e.target
        const food = form.food.value
        const name = form.name.value
        const orderingQuantity = Number(form.quantity.value)
        const email = form.email.value
        const date = form.date.value
        const price = form.price.value
        if (orderingQuantity > quantity) {
            return setError("not enough stock")
        }
        setError(null)
        if (email === chef_email) {
            return setError("you cant Buy your own products")
        }
        setError(null)
        const data = {
            food,
            name,
            orderingQuantity,
            email,
            date,
            price
        }
        console.log(data);

    }
    return (
        <div className='max-w-7xl mx-auto'>
            <form onSubmit={handlePurchase} className='w-full space-y-4 my-5'>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Food Name: </span>
                        </label>
                        <input type="text" placeholder="Type here" defaultValue={food_name} name='food' className="input input-bordered input-error w-full  " />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Price: </span>
                        </label>
                        <input type="text" placeholder="Price" defaultValue={price} name='price' className="input input-bordered input-error w-full  " />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1">
                        <label className="label">
                            <span className="label-text">Quantity </span>
                        </label>
                        <input type="text" placeholder="Type here" defaultValue={1} name='quantity' className="input input-bordered input-error w-full  " />
                    </div>
                    <div className="form-control  flex-1">
                        <label className="label">
                            <span className="label-text">Purchase Date  </span>
                        </label>
                        <input type="date" name='date' className="input input-bordered input-error w-full  " />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
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
    );
};

export default Purchase;