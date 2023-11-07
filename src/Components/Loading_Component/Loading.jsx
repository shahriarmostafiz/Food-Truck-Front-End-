import React from 'react';
import loading from "../../../public/loading.gif"

const Loading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <img src={loading} className='w-96' alt="" />
        </div>
    );
};

export default Loading;