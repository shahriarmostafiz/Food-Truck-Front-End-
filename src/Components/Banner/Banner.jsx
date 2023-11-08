import { Link } from "react-router-dom";
// import banner from "../../../public/m1.png"
import { BsBoxArrowUpRight } from 'react-icons/bs';


const Banner = () => {
    return (
        <div className='lg:min-h-[600px] flex flex-col-reverse md:flex-row justify-between items-center max-w-7xl mx-auto bg-[url("https://i.ibb.co/CwKRcVC/g3.jpg")] hero-overlay bg-blend-overlay bg-cover bg-center'>
            <div className='h-full  flex flex-col  space-y-4 py-20   justify-center items-center  flex-1 md:bg-none mx-auto'>
                <h1 className='text-red-50 text-center   text-3xl md:text-4xl lg:text-6xl font-bold md:max-w-3xl '>From Truck to Table <br />  Food Truck`s Culinary Adventure
                </h1>
                <Link to={"/allfoods"} className="btn btn-error text-white w-fit ">Explore now <BsBoxArrowUpRight /> </Link>

            </div>


        </div>
    );
};

export default Banner;