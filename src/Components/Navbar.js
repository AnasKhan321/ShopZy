// Navbar.js
import React, { useState ,useEffect , useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { RiDeleteBin6Fill} from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [login, setlogin] = useState(false)
  const {cart , setcart , savetoLocalStore , setbill, bill , UpdateBill }  = useContext(MyContext); 
  const [trans, settrans] = useState('translate-x-full')
  const [op, Setop] = useState('opacity-0')
  const [query, setquery] = useState('')
  const navigate = useNavigate();

  const [opacityy, setopacityy] = useState('opacity-0')

  const checkuser = ()=>{
    if(localStorage.getItem('shopzy')){
        setlogin(true)
    }
    
  }
  useEffect(()=>{
      checkuser(); 
  })

  const ChangeOpacity = ()=>{
    
      setopacityy('opacity-100')
    
   
  }

  const ClearCart = ()=>{
    setcart({}); 
    setbill(0)
    localStorage.removeItem("cart");
    localStorage.setItem('bill' , 0)
  }

  const changeState = ()=>{
    console.log('thisis here ')
    Setop('opacity-100')
    settrans('translate-x-0')
  }

  const changeState2 = ()=>{
    console.log('this is here ')
    Setop('opacity-0')
    settrans('translate-x-full')

  }

  const handleLogout = ()=>{
    localStorage.removeItem('shopzy');
    window.location.reload();
  }

  const hanldeClick = async(e)=>{
    let updatedCart = { ...cart };    
    console.log(updatedCart)
    updatedCart[e].qty += 1;
           
    // Update the context cart state
    setcart(updatedCart);
    let newint = await  UpdateBill(updatedCart); 
    console.log(newint)
 
    // Update the local storage
    savetoLocalStore(updatedCart  , newint)
  }

  const handleClick2 = async(e)=>{
    let updatedCart = { ...cart };
    console.log(updatedCart[e].qty)
    if(updatedCart[e].qty == 1){
      delete updatedCart[e]; 
    }
    else{
      updatedCart[e].qty -= 1;

    }
    
    setcart(updatedCart);
    let newint = await  UpdateBill(updatedCart); 
    console.log(newint)
    
      
    savetoLocalStore(updatedCart , newint); 
  }

  const  handleClick4 = ()=>{
    setopacityy('opacity-0');
  }

  const handleClick3 = ()=>{
    settrans('translate-x-full')

  }
  const handleChange = (e)=>{
    setquery(e.target.value)
  }
  const SearchQuery = ()=>{
    navigate(`/search?q=${query}`)

  }
  return (
    <nav className="flex justify-between  md:flex-row flex-col   px-2 py-4   shadow-xl  items-center  shadow-sky-100 " >
      <div className="logo  text-3xl text-sky-500 font-bold px-4 cursor-pointer   ">
        <Link to='/' > Shopzy </Link> 
        
      </div>


{/* Search Bar  */}
        <div className="inputs w-8/12 mx-auto  py-3  flex  ">
            <input onChange={handleChange} value={query} type="text"  className="w-full px-2 border py-1 outline-slate-300  "  placeholder="Search for Product ... " />
            <AiOutlineSearch  className="text-3xl ml-2 cursor-pointer  " onClick={SearchQuery} />
        </div>



      {/* Cart Section  */}
      <div  className= {`contain absolute min-h-screen transition-all  md:w-3/12  w-8/12   bg-sky-200 z-10  ${trans} p-4 top-12 right-0 `}>
        <div className="products">
          <RxCross2  className="relative right-0  cursor-pointer " onClick={handleClick3} />
          
          {Object.keys(cart).map((e)=>{
            return(
          <div className="product my-4 flex justify-around items-center "  key={e}>
              <p>    {cart[e].name} </p>
              <div className="mx-4 flex  items-center  " >
                <p  className="px-2"  onClick={()=>  handleClick2(e)} > <AiOutlineMinus  className="cursor-pointer " />  </p>
                  <p className="px-2 text-xl " > {cart[e].qty } </p>

                  <p className="px-2 " onClick={()=>  hanldeClick(e)} >  <AiOutlinePlus className="cursor-pointer " /> </p>

              </div>
            
           </div>
              
            )
          }) }
          <p className="text-center " >Your bill is total of {bill}</p>

          <div  className="flex justify-center mt-6  flex  md:flex-row flex-col items-center   " >
          <Link  to='/checkout' className="md:my-0 my-4 " >
          <button className="bg-sky-600  px-4 py-2 md:text-lg   text-white flex items-center  " >  <p>  Checkout Now    </p>   <span>      <BsFillCartCheckFill className=" mx-2   " />      </span>   </button>
          </Link>

            <div  onClick={ClearCart}  className="px-4 py-2 mr-2  text-white flex items-center text-lg cursor-pointer   " >
              <div  className="flex   bg-sky-600  items-center px-4 py-2  " >
              <span className="px-2  " > Clear items    </span>  <RiDeleteBin6Fill/> 
              </div>

            </div>


            <span>
           
            </span>

          </div>

        

        </div>
      </div>


      {/* Auth Section  */}
      <div className="auth  flex items-center   ">
        {!login && <div>
        <Link to='/login'  className="px-2 py-1  hover:bg-white transition-colors hover:text-sky-500  bg-sky-500 mx-1 text-white font-bold border border-lg"  >Login </Link>
        <Link to='/signup' className="px-2 py-1  hover:bg-white transition-colors hover:text-sky-500  bg-sky-500 mx-1 text-white font-bold border border-lg  " >Signup </Link> </div>}
      

        {login && <p className="cursor-pointer " onMouseOver={ChangeOpacity}  >   <FaUserAlt  className="mx-4 text-2xl cuorsor-pointer  " /> </p>  }


        <Link    onMouseOver={changeState} className="px-2  py-2 font-bold   hover:text-sky-500 cursor-pointer transition-colors "> 
        <MdShoppingCartCheckout  className="text-3xl   "  />  </Link>
       
      </div>

      {/* Profile Section  */}
      <div className={`${opacityy} transition-all items-center    profile absolute top-14 right-6 bg-sky-300 flex flex-col text-white   p-4  `}>
      <RxCross2  className="relative right-0  cursor-pointer " onClick={handleClick4} />

      <Link  to='/myorder' className="px-2 py-2   font-bold  hover:text-sky-500 cursor-pointer transition-colors " >My orders</Link>
      <Link  to={`/myprofile`} className="px-2 py-2 carttt  font-bold   hover:text-sky-500 cursor-pointer transition-colors " >Myprofile</Link>
      {login &&  <Link  className="px-2 py-1  hover:bg-white transition-colors hover:text-sky-500  bg-sky-500 mx-1 text-white font-bold border border-lg  "  onClick={handleLogout}  >Logout </Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
