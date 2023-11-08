// food_name x
// image x
// category x
// price x
// quantity x
// order_quantity
// chef x
// chef_email x
// origin x

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

// description x
const AddProduct = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const handleAddProduct = e => {
        e.preventDefault()
        const form = e.target
        const food_name = form.food_name.value
        const image = form.image.value
        const category = form.category.value
        const price = Number(form.price.value)
        const quantity = Number(form.quantity.value)
        const chef = form.chef.value
        const chef_email = form.chef_email.value
        const productData = {
            food_name,
            image,
            category,
            price,
            quantity,
            chef,
            chef_email,
            order_quantity: 0,
            added_Time: Date.now()
        }
        console.log(productData);
        // axiosSecure.post("/foods", productData)
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err.message);
        //     })
    }
    return (
        <div className="max-w-7xl mx-auto">
            <form onSubmit={handleAddProduct} className="space-y-4 ">
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Food Name: </span>
                        </label>
                        <input type="text" placeholder="Type here" name='food_name' className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Price: </span>
                        </label>
                        <input type="text" placeholder="Price" name='price' className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Category: </span>
                        </label>
                        <input type="text" placeholder="Category" name='category' className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Quantity: </span>
                        </label>
                        <input type="text" placeholder="Quantity" name='quantity' className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Cuisine: </span>
                        </label>
                        <input type="text" placeholder="Cuisine" name='origin' className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Image : </span>
                        </label>
                        <input type="text" placeholder="Image Url" name='image' className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Details : </span>
                        </label>
                        <input type="text" placeholder="Details about the Dish" name='description' className="input input-bordered input-error w-full  " required />
                    </div>

                </div>
                <div className=" flex flex-col md:flex-row gap-4">
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Chef : </span>
                        </label>
                        <input type="text" placeholder="Chef" name='chef' defaultValue={user?.displayName} className="input input-bordered input-error w-full  " required />
                    </div>
                    <div className="form-control  flex-1 ">
                        <label className="label">
                            <span className="label-text">Chefs Email : </span>
                        </label>
                        <input type="text" placeholder="Chefs Email" name='chef_email' defaultValue={user?.email} className="input input-bordered input-error w-full  " required />
                    </div>
                </div>
                <div className="">
                    <button type="submit" className="btn btn-wide bg-red-600 outline-none hover:bg-red-400">AddProduct</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;