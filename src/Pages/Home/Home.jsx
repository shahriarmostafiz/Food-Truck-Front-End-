import { useQuery } from "@tanstack/react-query";
import Banner from "../../Components/Banner/Banner";
import useAxios from "../../hooks/useAxios";
import TopFood from "./topFood";
import { Link } from "react-router-dom";
import Faq from "../../Components/FAQ/Faq";
import Title from "../../Components/Title/Title";
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import Review from "../../Components/Reviews/Review";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading_Component/Loading";

// MdOutlineRestaurantMenu

const Home = () => {
    const axiosSecure = useAxios()
    const limit = 6;
    const { data: topFoods, isLoading, isError } = useQuery({
        queryKey: ["topfoods", limit],
        queryFn: async () => {
            const data = await axiosSecure.get(`/allfoods?limit=${limit}&sortField=order_quantity&sortOrder=desc`)
            return data.data
        }
    })
    if (isLoading) { return <Loading></Loading> }
    if (isError) { return <h1>Something went wrong</h1> }

    console.log(topFoods?.length);
    console.log(topFoods);
    return (
        <div>
            <Helmet>
                <title>
                    Food Truck | Home
                </title>
            </Helmet>
            <Banner></Banner>
            <div>
                <div>
                    <Title heading={"Top Selling  "} subHeading={"Discover Our Most Popular Items"}></Title>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                        {
                            topFoods?.map(topFood => <TopFood key={topFood._id} topFood={topFood}></TopFood>)

                        }

                    </div>
                </div>
                <div className="text-center my-5">
                    <Link to={"/allfoods"} className="btn bg-red-500 outline-none hover:bg-red-400 normal-case text-white"> See Menu <MdOutlineRestaurantMenu /></Link >
                </div>
            </div>

            <Review></Review>
            <Faq></Faq>
        </div>
    );
};

export default Home;