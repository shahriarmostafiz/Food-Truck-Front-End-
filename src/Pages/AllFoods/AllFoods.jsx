import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import FoodCard from './FoodCard';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Components/Loading_Component/Loading';
import Title from '../../Components/Title/Title';
import { Helmet } from 'react-helmet-async';

const AllFoods = () => {
    const axiosSecure = useAxios()
    const { count } = useLoaderData()
    const [foodPerPage, setFoodPerPage] = useState(9)
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState("")
    const [sortField, setSortField] = useState("")
    const [sortOrder, setSortOrder] = useState("asc")

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
    // const handleFiltering = e =>{

    // }
    // console.log(search, "was being searched");
    // console.log("count", count);
    const { data: allFoods, isLoading, isError } = useQuery({
        queryKey: ["allFoods", currentPage, foodPerPage, search, sortField, sortOrder],
        queryFn: async () => {
            const data = await axiosSecure.get(`/allfoods?page=${currentPage}&limit=${foodPerPage}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`)
            return data.data;
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) { return <h1>Something went wrong</h1> }
    // console.log(allFoods?.length);
    // console.log(allFoods);
    console.log("filter field", sortField, "filter value", sortOrder);
    // console.log();
    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>
                    Food Truck  | All Foods
                </title>
            </Helmet>
            <Title heading={"Explore Our Culinary Delights"} subHeading={"An Exquisite Selection of Dishes to Satisfy Every Palate"}></Title>

            <div className='flex flex-col md:flex-row justify-around items-center gap-4  my-6'>
                <div className={`${search ? 'flex' : "hidden"}`}>
                    <button onClick={handleShowAll} className='btn  btn-outline btn-error '>Show all Products </button>
                </div>
                <form onSubmit={handleSearch} className='w-full text-center flex-1'>
                    <input type="text" className='input input-bordered input-error w-full  max-w-xs md:max-w-md lg:max-w-lg' name='searchField' />
                    <button className='btn btn-error ml-4 text-white' type='submit'> Search </button>
                </form>
                <div className='flex justify-between gap-4'>
                    <div>
                        <select value={sortField}
                            onChange={(e) => {
                                setCurrentPage(0)
                                setSortField(e.target.value)
                            }}
                            className="select select-error w-full max-w-xs">
                            <option disabled selected value={""}>Filter By </option>
                            <option value={"price"}>Price  </option>
                            <option value={"quantity"}>Stock </option>
                            <option value={"order_quantity"}>Sells </option>
                        </select>
                    </div>
                    <div>
                        <select value={sortOrder}
                            onChange={(e) => {
                                setSortOrder(e.target.value)
                            }}
                            className="select select-error w-full max-w-xs">
                            <option disabled selected value={""}>Order </option>
                            <option value={"desc"}>High to low</option>
                            <option value={"asc"}>Low to High</option>
                        </select>
                    </div>
                </div>
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