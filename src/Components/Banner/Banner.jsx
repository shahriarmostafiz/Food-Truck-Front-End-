import { Link } from "react-router-dom";
// import banner from "../../../public/m1.png"
import { BsBoxArrowUpRight } from 'react-icons/bs';


const Banner = () => {
    return (
        <div className='lg:min-h-[600px] flex flex-col-reverse md:flex-row justify-between items-center max-w-7xl mx-auto bg-[url("https://i.ibb.co/CwKRcVC/g3.jpg")] hero-overlay bg-blend-overlay bg-cover bg-center'>
            {/* <div className='h-full md:hidden flex flex-col space-y-4 py-20 md:py-0  justify-center items-center md:items-start flex-1 bg-[url("https://i.ibb.co/CwKRcVC/g3.jpg")] bg-blend-overlay hero-overlay bg-cover bg-center md:bg-none mx-auto'> */}
            <div className='h-full  flex flex-col  space-y-4 py-20 md:py-0  justify-center items-center  flex-1 md:bg-none mx-auto'>
                <h1 className='text-red-50 text-center   text-3xl md:text-4xl lg:text-6xl font-bold md:max-w-3xl '>From Truck to Table <br />  Food Truck`s Culinary Adventur
                </h1>
                <Link to={"/allfoods"} className="btn btn-error text-white w-fit ">Explore now <BsBoxArrowUpRight /> </Link>

            </div>
            {/* <div className="flex-1 hidden md:flex ">
                <h1 className=' md:text-red-white  md:text-start   md:text-4xl lg:text-6xl font-bold md:max-w-3xl '>From Truck to Table <br />  Food Truck`s Culinary Adventur
                </h1>
                <Link to={"/allfoods"} className="btn btn-error btn-outline w-fit ">Explore now <BsBoxArrowUpRight /> </Link>
            </div> */}
            {/* <div className="flex-1 hidden md:flex"> */}
            {/* <img src="https://i.ibb.co/3hJFK5L/6773286-removebg-preview-1-removebg-preview.png" className="w-full" alt="" /> */}
            {/* <img src="https://i.ibb.co/p1nKssb/2afa62ff-efb4-4550-ba72-aa26bd199cd0-removebg-preview.png" className="w-full" alt="" /> */}
            {/* <img src={banner} className="w-full" alt="banner " /> */}
            {/* </div> */}

        </div>
    );
};

export default Banner;