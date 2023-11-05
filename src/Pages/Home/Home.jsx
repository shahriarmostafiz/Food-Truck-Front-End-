import { useQuery } from "@tanstack/react-query";
import Banner from "../../Components/Banner/Banner";
import useAxios from "../../hooks/useAxios";
import TopFood from "./topFood";


const Home = () => {
    const axiosSecure = useAxios()
    const { data: topFoods, isLoading, isError } = useQuery({
        queryKey: ["foods"],
        queryFn: async () => {
            const data = await axiosSecure.get("/allfoods?limit=6&sortField=order-quantity&sortOrder=desc")
            return data.data
        }
    })
    if (isLoading) { return <h1>loading....</h1> }
    if (isError) { return <h1>Something went wrong</h1> }

    console.log(topFoods?.length);
    console.log(topFoods);
    return (
        <div>
            <Banner></Banner>
            <div>
                <h1>Top Selling Products </h1>
                <div className="flex justify-center">
                    <div className="grid grid-cols-3 gap-5 ">
                        {
                            topFoods?.map(topFood => <TopFood key={topFood._id} topFood={topFood}></TopFood>)

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;