import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import Loading from '../../Components/Loading_Component/Loading';
import { Helmet } from 'react-helmet-async';

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
    if (isLoading) { return <Loading></Loading> }
    if (isError) { return <h1>Something went wrong</h1> }
    console.log(food);
    const { _id, food_name, image, category, price, chef, origin, description } = food

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <Helmet>
                <title>
                    Details
                </title>
            </Helmet>
            {/* details of product {id} */}
            <div className="flex flex-col md:flex-row">
                <div className='flex-1 p-4'>
                    <img src={image} alt={food_name} className='rounded-xl w-4/5 mx-auto' />
                </div>
                <div className='flex-1 space-y-4'>
                    <h1 className="text-3xl font-semibold">
                        {food_name}
                    </h1>
                    <h2 className='text-2xl font-medium'>Category: {category}</h2>
                    <h2 className='text-2xl font-medium'>Price: ${price}</h2>
                    <h2 className='text-2xl font-medium'>Origin: {origin}</h2>
                    <h2 className='text-2xl font-medium'>Made By {chef}</h2>
                    <p>{description}</p>
                    <Link to={`/purchase/${_id}`} className='btn bg-red-500 outline-none border-none hover:bg-red-400 text-white'>Order</Link>

                </div>
            </div>
        </div>
    );
};

export default SingleFood;