import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Loading from '../../Components/Loading_Component/Loading';
import OrderCard from './OrderCard';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Title from '../../Components/Title/Title';


const MyPurchase = () => {
    const { user } = useAuth()
    const email = user.email
    // const [deleteData, setDeleteData] = useState(0)
    const [orders, setOrder] = useState(null)
    const axiosSecure = useAxios()
    // const { data: orders, isLoading, isError } = useQuery({
    // const { data, isLoading, isError } = useQuery({
    //     queryKey: ["orders", email,],
    //     queryFn: async () => {
    //         const data = await axiosSecure.get(`/orders?email=${email}`)
    //         return data.data
    //     }
    // })
    axiosSecure.get(`/orders?email=${email}`)
        .then(res => {
            setOrder(res.data)
        })
        .catch(err => {
            console.log(err.message);
        })
    // useEffect(() => {
    //     setOrder(data)
    // }, [data, orders])
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    // if (isError) {
    //     return <h1>Something went wrong</h1>
    // }

    // console.log(orders);
    return (
        <div className='my-6 md:my-8 lg:my-12 max-w-7xl mx-auto p-4'>
            <Helmet>
                <title>
                    Food Truck | My Orders
                </title>
            </Helmet>
            <Title heading={"total orders by me"} subHeading={orders?.length}></Title>

            {orders?.map(order => <OrderCard key={order._id} order={order} orders={orders} setOrder={setOrder} ></OrderCard>)}
            <ToastContainer />
        </div>
    );
};

export default MyPurchase;