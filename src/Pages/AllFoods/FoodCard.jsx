import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';

const FoodCard = ({ food }) => {
    const { food_name,
        image,
        category,
        price,
        quantity, _id } = food
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt={food_name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{food_name}
                    </h2>
                    <div className="flex justify-between">
                        <p className="font-medium">Price:  ${price}</p>
                        <p className="text-red-500"> Available:  {quantity}  </p>

                    </div>
                    <div className="flex items-center justify-between text-lg font-medium">

                        <div className="flex gap-5 ">
                            {/* <div className="badge badge-outline badge-warning">{category}</div> */}
                            <div className="border border-yellow-400 rounded-full justify-center items-center flex px-3 py-1 text-sm text-yellow-500">{category}</div>
                            {/* <div className="border border-red-400 rounded-full justify-center items-center flex px-4 py-1 text-sm text-red-500">Hot </div> */}
                            {/* <div className="badge badge-outline badge-error">Hot </div> */}
                        </div>
                        <div className="card-actions justify-end">
                            <Link to={`/details/${_id}`} className="btn btn-ghost normal-case text-base text-red-500">Details <BsArrowRightCircle />  </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
FoodCard.propTypes = {
    food: PropTypes.object
}