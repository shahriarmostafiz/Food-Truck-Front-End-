import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProduct = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const { data: thisProduct } = useQuery({
        queryKey: ["update"],
        queryFn: async () => {
            const data = await axiosSecure.get(`/food/${id}`)
            return data.data
        }
    })
    console.log(thisProduct);
    const handleUpate = e => {
        e.preventDefault()
        const form = e.target
        const food_name = form.food_name.value
        const image = form.image.value
        const category = form.category.value
        const price = Number(form.price.value)
        const quantity = Number(form.quantity.value)
        const chef = form.chef.value
        const chef_email = form.chef_email.value
        // const last_Update = Date.now()
        const updatedDoc = {
            food_name,
            image,
            category,
            price,
            quantity,
            chef,
            chef_email,
            // last_Update
        }
        console.log(updatedDoc);
        axiosSecure.put(`userAddedFoods/${id}`, updatedDoc)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // setFetchData(() => fetchData + 1)
                    return toast.success("Product Updated")
                }
            }
            )
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='max-w-7xl mx-auto my-5 lg:my-8'>
            <form onSubmit={handleUpate} className="space-y-4 ">
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Food Name: </span>
                        </label>
                        <input type="text" placeholder="Food Name" name='food_name' defaultValue={thisProduct?.food_name} className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Price: </span>
                        </label>
                        <input type="text" placeholder="Price" name='price' defaultValue={thisProduct?.price} className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Category: </span>
                        </label>
                        <input type="text" placeholder="Category" name='category' defaultValue={thisProduct?.category} className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Quantity: </span>
                        </label>
                        <input type="text" placeholder="Quantity" name='quantity' defaultValue={thisProduct?.quantity} className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Cuisine: </span>
                        </label>
                        <input type="text" placeholder="Cuisine" name='origin' defaultValue={thisProduct?.origin} className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Image : </span>
                        </label>
                        <input type="text" placeholder="Image Url" name='image' defaultValue={thisProduct?.image} className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Details : </span>
                        </label>
                        <input type="text" placeholder="Details about the Dish" name='description' defaultValue={thisProduct?.description} className="input input-bordered input-error w-full  " required />
                    </div>

                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Chef : </span>
                        </label>
                        <input type="text" placeholder="Chef" name='chef' defaultValue={user?.displayName} className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Chefs Email : </span>
                        </label>
                        <input type="text" placeholder="Chefs Email" name='chef_email' defaultValue={user?.email} className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-wide bg-red-600 outline-none hover:bg-red-400">Update </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateProduct;