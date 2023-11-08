import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Title from '../Title/Title';
import ReviewCard from './ReviewCard';

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
        <div className='max-w-7xl mx-auto'>
            <Title heading={"Testimonials"} subHeading={"Discover What Our Guests Have to Say"}></Title>
            <div className="flex justify-center">
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                    {
                        reviews?.slice(0, 3).map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Review;