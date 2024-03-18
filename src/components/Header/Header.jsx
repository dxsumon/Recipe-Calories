import User from '../../assets/search_icon.png'
import banner from '../../assets/banner.png'
const Header = () => {
    return (
        <div className='container mx-auto'>
            <div className="navbar bg-base-100 container mx-auto mt-[20px] space-x-4 lg:space-x-0 flex justify-between items-center ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-xl">
                            <li><a>Home</a></li>
                            <li><a>Recipes</a></li>
                            <li><a>About</a></li>
                            <li><a>Search</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-2xl lg:text-3xl font-extrabold">Recipe Calories</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl">
                        <li><a>Home</a></li>
                        <li><a>Recipes</a></li>
                        <li><a>About</a></li>
                        <li><a>Search</a></li>
                    </ul>
                </div>
                <div className="navbar-end flex justify-center items-center space-x-4">
                    <label className="input input-bordered flex items-center gap-2 w-[70%] lg:w-[60%] rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        <input type="text" className="grow" placeholder="Search" />
                    </label>
                    <div className="bg-[#20948B] p-3 rounded-full hidden lg:flex text-white">
                        <img className='w-full' src={User} alt="" />
                    </div>
                </div>
            </div>
            {/* Banner section */}
            <div className="banner-section mt-[54px] p-5 lg:p-[193px] text-center text-white lg:h-[600px] space-y-5" style={{
                backgroundImage: `url(${banner})`,
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                borderRadius:"24px"
            }}>
                <h1 className='text-2xl lg:text-5xl font-bold'>Discover an exceptional cooking <br /> class tailored for you!</h1>
                <p>Learn and Master Basic Programming, Data Structures, Algorithm, OOP, Database and solve 500+ coding <br /> problems to become an exceptionally well world-class Programmer.</p>
                <button className='btn rounded-full bg-[#20948B] border-none mr-5 mt-10 font-bold px-7 text-white'>Explore Now</button>
                <button className='btn rounded-full bg-transparent text-white px-7'>Our Feedback</button>
            </div>
        </div>
    );
};

export default Header;