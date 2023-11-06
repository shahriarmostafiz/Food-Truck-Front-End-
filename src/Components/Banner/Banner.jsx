import { Link } from "react-router-dom";
import banner from "../../../public/m1.png"
import { BsBoxArrowUpRight } from 'react-icons/bs';


const Banner = () => {
    return (
        <div className='lg:min-h-[600px] flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto'>
            <div className='h-full flex flex-col space-y-4 justify-center items-start flex-1  mx-auto'>
                <h1 className='text-red-600  text-3xl md:text-4xl lg:text-6xl font-bold md:max-w-3xl '>From Truck to Table <br />  Food Truck`s Culinary Adventur
                </h1>
                <Link to={"/allfoods"} className="btn btn-error btn-outline w-fit ">Explore now <BsBoxArrowUpRight /> </Link>

            </div>
            <div className="flex-1">
                {/* <img src="https://i.ibb.co/3hJFK5L/6773286-removebg-preview-1-removebg-preview.png" className="w-full" alt="" /> */}
                {/* <img src="https://i.ibb.co/p1nKssb/2afa62ff-efb4-4550-ba72-aa26bd199cd0-removebg-preview.png" className="w-full" alt="" /> */}
                <img src={banner} className="w-full" alt="banner " />
            </div>

        </div>
    );
};

export default Banner;