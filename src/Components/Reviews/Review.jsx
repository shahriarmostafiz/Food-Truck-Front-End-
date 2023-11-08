import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const Review = () => {

    const axiosSecure = useAxios()
    const { data: reviews } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const data = await axiosSecure.get("/reviews")
            return data.data
        }
    })
    console.log("reviews", reviews);
    return (
        <div>

        </div>
    );
};

export default Review;