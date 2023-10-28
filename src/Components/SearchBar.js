import React from 'react'; 
import { AiOutlineSearch } from 'react-icons/ai';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaTshirt } from 'react-icons/fa';
import { BsLaptopFill } from 'react-icons/bs';
import { AiFillMobile } from 'react-icons/ai';





const SearchBar = () => {
  return (
    <div className=" my-4 " >
           {/* <ul  className="py-4 flex justify-around  items-center   " >
                <Link className="px-4  py-4  font-bold shadow-lg  text-xl    hover:text-sky-500 cursor-pointer transition-colors" to='/'> Home  </Link>
                <Link  to={`/tshirt`} className="px-2 py-2 carttt  font-bold   hover:text-sky-500 cursor-pointer transition-colors " >T-shirts</Link>
                <Link to={`/laptop`} className="px-2  py-2 carttt  font-bold  hover:text-sky-500 cursor-pointer transition-colors " >Laptops</Link>
                <Link to={`/mobile`} className="px-2  py-2 carttt font-bold   hover:text-sky-500 cursor-pointer transition-colors " >Mobiles</Link>

      </ul> */}
      <ul  className="flex justify-around " >
        <Link   to='/' className="flex flex-col items-center  flex-col-reverse py-4 px-8 shadow-lg  border " >  <p>Home</p>  <AiFillHome className="text-2xl " /> </Link>
        <Link  to={`/tshirt`}   className="flex flex-col items-center  flex-col-reverse py-4 px-8 shadow-lg  border " >  <p>T-Shirts</p> <FaTshirt className="text-2xl " /> </Link>
        <Link  to={`/laptop`}   className="flex flex-col items-center  flex-col-reverse py-4 px-8 shadow-lg  border " >  <p>Laptop</p> <BsLaptopFill className="text-2xl " /> </Link>
        <Link  to={`/mobile`}   className="flex flex-col items-center  flex-col-reverse py-4 px-8 shadow-lg  border " >  <p>SmartPhone</p> <AiFillMobile className="text-2xl " /> </Link>

      </ul>
        
    </div>
  )
}

export default SearchBar