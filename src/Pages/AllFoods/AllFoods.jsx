import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import FoodCard from './FoodCard';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Components/Loading_Component/Loading';

const AllFoods = () => {
    const axiosSecure = useAxios()
    const { count } = useLoaderData()
    const [foodPerPage, setFoodPerPage] = useState(9)
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState("")

    const pageTotal = Math.ceil(count / foodPerPage)

    const pages = [...Array(pageTotal).keys()]
    const handleSearch = e => {
        e.preventDefault()
        const search = e.target.searchField.value
        // console.log(search, "was searched");
        setCurrentPage(0)
        setSearch(search)
    }
    const handleShowAll = () => {
        setSearch("")
    }
    // console.log(search, "was being searched");
    // console.log("count", count);
    const { data: allFoods, isLoading, isError } = useQuery({
        queryKey: ["allFoods", currentPage, foodPerPage, search],
        queryFn: async () => {
            const data = await axiosSecure.get(`/allfoods?page=${currentPage}&limit=${foodPerPage}&search=${search}`)
            return data.data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) { return <h1>Something went wrong</h1> }
    // console.log(allFoods?.length);
    // console.log(allFoods);
    return (
        <div>
            <div className='flex justify-center items-center gap-4  my-6'>
                <div className={`${search ? 'flex' : "hidden"}`}>
                    <button onClick={handleShowAll} className='btn  btn-outline btn-error '>Show all Products </button>
                </div>
                <form onSubmit={handleSearch}>
                    <input type="text" className='input input-bordered input-error max-w-2xl' name='searchField' />
                    <button className='btn btn-error ml-4 text-white' type='submit'> Search </button>
                </form>
            </div>
            <div className="flex justify-center">
                <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-4'>
                    {
                        allFoods?.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                    }
                </div>
            </div>
            <div className='flex justify-center gap-4 my-4'>
                {pages?.map(page => <button
                    onClick={() => setCurrentPage(page)}
                    className={`btn btn-sm ${page === currentPage ? " btn-error" : ""}`} key={page}>{page + 1}</button>)}
            </div>
        </div >
    );
};

export default AllFoods;