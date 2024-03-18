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
  const [totalCalories, setTotalCalories] = useState(0);
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
    setTotalTime(totalTime + time)
    const calories = currentItem.calories;
    setTotalCalories(totalCalories + calories)
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
      {/* Footer */}
      <footer className="footer p-10 bg-base-200 text-base-content mt-10">
        <aside>
          <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
          <p>Recipe Calories<br />Providing best food since 1992</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Recipes</a>
          <a className="link link-hover">Cooking Classes</a>
          <a className="link link-hover">Food Photography</a>
          <a className="link link-hover">Restaurant Promotion</a>

        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Food</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  )
}

export default App
