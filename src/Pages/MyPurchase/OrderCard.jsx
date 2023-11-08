import PropTypes from "prop-types"
import { AiFillDelete } from 'react-icons/ai';
import useAxios from "../../hooks/useAxios";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2'


// AiFillDelete
const OrderCard = ({ order, orders, setOrder }) => {
    const axiosSecure = useAxios()
    const { product_id, image, food, price, _id, orderingQuantity, newQuantity,
        newOrder_quantity } = order
    const handleDelete = (_id) => {
        console.log(`trying to delete ${_id}`);
        const newQuantity3 = newQuantity + orderingQuantity
        const newOrder_quantity3 = newOrder_quantity - orderingQuantity
        const updateDB = {
            order_quantity: newOrder_quantity3,
            quantity: newQuantity3
        }
        console.log(updateDB);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF0000",
            cancelButtonColor: "#50C878",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            const remaining = orders?.filter(item => item._id !== _id)
                            setOrder(remaining)
                            axiosSecure.patch(`/foods/${product_id}`, updateDB)
                                .then(res => {
                                    console.log(res.data)
                                    // if(res.data)
                                    if (res.data.modifiedCount > 0) {

                                        Swal.fire({
                                            title: "Cancelled!",
                                            text: "Your Order has been Cancelled",
                                            icon: "success"
                                        });
                                    }
                                })
                                .catch()
                        }
                        // axiosSecure.put 
                    })
                    .catch(err => console.log(err))
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });
        // axiosSecure.delete(`/orders/${_id}`)
        //     .then(res => {
        //         console.log(res.data)
        //         if (res.data.deletedCount > 0) {
        //             axiosSecure.put(`/foods/${product_id}`, updateDB)
        //                 .then(res => {
        //                     console.log(res.data)
        //                     // if(res.data)
        //                     if (res.data.modifiedCount > 0) {
        //                         // setFetchData(() => fetchData + 1)
        //                         setDeleteData(() => { deleteData + 1 })

        //                         return toast.error("Order cancelled ")
        //                     }
        //                 })
        //                 .catch()
        //         }
        //         // axiosSecure.put 
        //     })
        //     .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="card card-side max-w-lg mx-auto bg-base-100 shadow-xl">
                <figure><img src={image} className="w-40" alt={food} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{food}</h2>
                    <p>Price: {price}.</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleDelete(_id)} className="btn btn-xs btn-square text-red-700 btn-error btn-outline"><AiFillDelete /></button>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    );
};

export default OrderCard;
OrderCard.propTypes = {
    order: PropTypes.object,
    orders: PropTypes.array,
    setOrder: PropTypes.func

}