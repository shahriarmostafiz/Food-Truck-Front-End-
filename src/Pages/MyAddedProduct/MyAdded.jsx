import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading_Component/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyAdded = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const email = user?.email
    const { data: myAdditions, isError, isLoading } = useQuery({
        queryKey: ['userProducts', email],
        queryFn: async () => {
            const data = await axiosSecure.get(`/foods?email=${email}`)
            return data.data
        }
    })
    if (isLoading) { return <Loading></Loading> }
    if (isError) { return <h1>something went wrong </h1> }
    console.log(myAdditions);
    // const handleProductUpdate = id => {
    //     console.log("trying to update", id);
    // }
    return (
        <div className="max-w-7xl mx-auto">
            <Helmet>
                <title>
                    Food Truck | Added Products
                </title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {myAdditions?.map(product =>
                        <tbody key={product._id}>

                            <tr>

                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {product.food_name}

                                </td>
                                <td>{product.price}</td>
                                <th>
                                    <Link to={`/update/${product._id}`} className="btn  btn-xs">Update </Link>
                                </th>
                            </tr>

                        </tbody>
                    )}




                </table>
            </div>
        </div>
    );
};

export default MyAdded;