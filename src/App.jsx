import { useEffect } from "react";
import { useState } from "react";
import './App.css'
import Header from './components/Header/Header'
import Food from "./components/Food/Food";
// Error massage
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [card, setCard] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [currentlyCook, setCurrentlyCook] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [totalCalories,setTotalCalories] = useState(0);
  useEffect(() => {
    fetch('foods.json')
      .then(response => response.json())
      .then(data => setCard(data));
  }, [])
  // Want to cook event handle
  const selectedItemHandle = (food) => {
    const newSelectedItem = [...selectedItem, food];
    const isExist = selectedItem.find(foodsItem => foodsItem.id == food.id);
    if (!isExist) {
      setSelectedItem(newSelectedItem);
    }
    else {
      toast.error("Opppss, You cannot select an item twice at the same time!", {
        theme: "dark",
      });
    }
  }

  // Currently Cook event handler
  const handlePreparing = (currentItem) => {
    const time = currentItem.cook_time;
    setTotalTime(totalTime+time)
    const calories = currentItem.calories;
    setTotalCalories(totalCalories+calories)
    const newPreparingCook = [...currentlyCook, currentItem];
    setCurrentlyCook(newPreparingCook)
    const newSelectedItem = selectedItem.filter(item => item.id != currentItem.id);
    setSelectedItem(newSelectedItem);
  }
  return (
    <>
      {/* Navbar Section */}
      <Header></Header>
      <div className='our-recipes-container text-center mt-10 lg:mt-24'>
        <h1 className='text-4xl font-semibold m-4'>Our Recipes</h1>
        <p className='w-[70%] mx-auto m-4'>Recipe Calories opened on Thanksgiving Day 1990. Chef / Owner Ron Silver began baking pies and selling them to restaurants and his neighbors out of a small kitchen at the corner of Hudson and North Moore St.</p>
      </div>
      {/* Food Card  */}
      <div className="food-card-container container mx-auto flex flex-col lg:flex-row justify-around gap-5 items-start">
        <div className="food-card grid grid-cols-1 lg:grid-cols-2 gap-5">
          {
            card.map(foodList => <Food selectedItemHandle={selectedItemHandle} key={foodList.id} foodList={foodList}></Food>)
          }
        </div>
        {/* Food cart Container */}
        <div className="food-cart-container border-2 border-gray-200 flex-1 lg:min-h-[400px] p-5 rounded-2xl w-full">
          <div className="want-to-cook-container w-full lg:w-[390px]">
            <h1 className="text-2xl font-semibold text-center p-6">Want to cook: {selectedItem.length}</h1>
            <hr />
            <div className="cart-title flex justify-star items-center gap-16 ml-7 p-6">
              <h1>Name</h1>
              <h1>Time</h1>
              <h1>Calories</h1>
            </div>
            <table>
              <tbody>
                {
                  selectedItem.map((item, index) => (

                    <tr key={index} className="bg-[#F8F8F8] p-4">
                      <td>{index + 1}</td>
                      <td className="p-4">{item.title}</td>
                      <td className="p-4">{item.cook_time} minutes</td>
                      <td className="p-4">{item.calories} calories</td>
                      <td>
                      <button onClick={() => handlePreparing(item)} className='btn rounded-full bg-[#20948B] border-none font-bold text-white'>Preparing</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          {/* Preparing container */}
          <div className="want-to-cook-container w-full">
            <h1 className="text-2xl font-semibold text-center p-6">Currently cooking: {currentlyCook.length}</h1>
            <hr />
            <div className="cart-title flex justify-star items-center gap-16 ml-7 p-6">
              <h1>Name</h1>
              <h1>Time</h1>
              <h1>Calories</h1>
            </div>
            <table>
              <tbody>
                {
                  currentlyCook.map((item, index) => (
                    <tr key={index} className="bg-[#F8F8F8] p-4">
                      <td>{index + 1}</td>
                      <td className="p-4">{item.title}</td>
                      <td className="p-4">{item.cook_time} minutes</td>
                      <td className="p-4">{item.calories} calories</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <hr />
            <div className="flex justify-end w-full mt-5">
              <p>Total Time = <span className="text-[#F52549]">{totalTime}</span> minutes</p>
              <p>Total Calories = <span className="text-[#F52549]">{totalCalories}</span> calories</p>
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
      
    </>
  )
}

export default App
