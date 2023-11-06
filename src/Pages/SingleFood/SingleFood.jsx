import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const SingleFood = () => {
    const { id } = useParams()
    const axiosSecure = useAxios()
    const { data: food, isLoading, isError } = useQuery({
        queryKey: ["food"],
        queryFn: async () => {
            const data = await axiosSecure.get(`/food/${id}`)
            return data.data
        }
    })
    if (isLoading) { return <h1>loading....</h1> }
    if (isError) { return <h1>Something went wrong</h1> }
    console.log(food);
    const { _id, food_name, image, category, price, chef, origin, description } = food

    return (
        <div className='max-w-7xl mx-auto my-10'>
            {/* details of product {id} */}
            <div className="flex ">
                <div className='flex-1'>
                    <img src={image} alt={food_name} className='rounded-xl max-w-md' />
                </div>
                <div className='flex-1'>
                    <h1 className="text-3xl font-semibold">
                        {food_name}
                    </h1>
                    <h2 className=''>Category: {category}</h2>
                    <h2>Price: ${price}</h2>
                    <h2>Origin: ${origin}</h2>
                    <h2>Made By {chef}</h2>
                    <p>{description}</p>
                    <Link to={`/order/${_id}`} className='btn btn-error text-white'>Order</Link>

                </div>
            </div>
        </div>
    );
};

export default SingleFood;