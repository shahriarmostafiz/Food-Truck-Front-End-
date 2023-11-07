import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Loading from '../../Components/Loading_Component/Loading';
import OrderCard from './OrderCard';
import { toast, ToastContainer } from 'react-toastify';


const MyPurchase = () => {
    const { user } = useAuth()
    const email = user.email
    const [deleteData, setDeleteData] = useState(0)
    const axiosSecure = useAxios()
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ["orders", email, deleteData],
        queryFn: async () => {
            const data = await axiosSecure.get(`/orders?email=${email}`)
            return data.data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        return <h1>Something went wrong</h1>
    }
    console.log(orders);
    return (
        <div className='my-6 md:my-8 lg:my-12 max-w-7xl mx-auto p-4'>
            total orders by me
            {orders?.length}
            {orders?.map(order => <OrderCard key={order._id} order={order} deleteData={deleteData} setDeleteData={setDeleteData}></OrderCard>)}
            <ToastContainer />
        </div>
    );
};

export default MyPurchase;