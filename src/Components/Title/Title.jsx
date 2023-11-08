
const Title = ({ heading, subHeading }) => {
    return (
        <div className='text-center my-5 md:my-8 space-y-5'>
            <h1 className='text-xl md:text-4xl lg:text-5xl font-bold'>
                {heading}
            </h1>
            <h3 className='font-medium text-red-400 '>
                {subHeading}
            </h3>
        </div>
    );
};

export default Title;