import cookingTime from '../../assets/timeicon.png'
import caloriesIcon from '../../assets/calories.png'

const Food = ({ foodList,selectedItemHandle }) => {
    const { img, title, description, ingredients, cook_time, calories } = foodList;
    const foodIngredients = ingredients.length;
    return (
        <div>
            <div className="card w-full mx-auto bg-base-100 shadow-xl border-2 border-gray-200 lg:h-[800px]">
                <figure className="p-6">
                    <img src={img} alt="Shoes" className="rounded-xl h-64 w-[80%] mx-auto lg:w-full" />
                </figure>
                <div className="title-container p-6 space-y-2 lg:space-y-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-[#878787]">{description}</p>
                    <hr />
                    <h2 className="text-[18px] font-medium">Ingredients: <span className='text-[#F52549]'>{foodIngredients}</span></h2>
                    {/* Ingredients container */}
                    <div className='ingredients-container'>
                        {
                            ingredients.map(items => <li key={items[0]} className="text-[#878787]">{items}</li>)
                        }
                    </div>
                    <hr />
                    <div className='flex justify-start items-start gap-5 text-[#282828CC]'>
                        <div className='flex gap-2'>
                            <img src={cookingTime} alt="" />
                            <p>{cook_time} minutes</p>
                        </div>
                        <div className='flex gap-2'>
                            <img src={caloriesIcon} alt="" />
                            <p>{calories} calories</p>
                        </div>
                    </div>
                    <button onClick={()=>selectedItemHandle(foodList)} className='btn rounded-full bg-[#20948B] border-none font-bold px-7 text-white'>Want to Cook</button>
                </div>
            </div>
        </div>
    );
};

export default Food;