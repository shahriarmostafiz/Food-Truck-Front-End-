
const Faq = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="collapse collapse-plus ">
                <input type="radio" name="my-accordion-3" checked="" />
                <div className="collapse-title text-xl font-medium">
                    What are the restaurant`s operating hours
                </div>
                <div className="collapse-content">
                    <p>We are open from 9 AM to 11PM</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    What types of cuisines do you offer at Food Truck?
                </div>
                <div className="collapse-content">
                    <p>We offer wide range of Cuisine from british,chinese , american , indian etc</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    Do you do takeout deliveries?
                </div>
                <div className="collapse-content">
                    <p>Yes, Just order the food through your account</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    What payment methods do you accept at the restaurant?
                </div>
                <div className="collapse-content">
                    <p>We accept major credit cards, as well as cash payments.</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;