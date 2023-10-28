import React ,{useContext , useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';
import { ToastContainer, toast } from 'react-toastify';

const formatPriceWithThousandSeparator = (price) => {
  // Use Intl.NumberFormat to format the price with thousand separators
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(price);
};

const Checkout = () => {
  const [disable, setdisable] = useState(true)

  const fetchData = async()=>{
    if(localStorage.getItem('shopzy')){
      const token = localStorage.getItem('shopzy'); 
      const res = await fetch(`http://localhost:3000/api/order/Myprofile/${token}`); 
      const data = await res.json(); 
      console.log(data)
      setform(data.data)
    }
    else{
      console.log('this is here ')
    }
  }
  const [form, setform] = useState({
    email : '' , 
    name : '',
    phone : '',
    address : '',
    landmark : '',
    state : '',
    city : '',
    pincode : ''
    

  })
  const {cart , setcart , savetoLocalStore , setbill ,  bill} = useContext(MyContext); 
  const handleChange = (e)=>{
    const { name, value } = e.target;
    setform({
      ...form , 
      [name] : value,
    }
    )
    console.log(e.target.value)
  }

  const handleClick = ()=>{
    const data ={
      details : form , 
      bill : bill , 
      items : cart
  }

    fetch('http://localhost:3000/api/order/takeorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      }).then((res)=>res.json()).then((data)=>{
          console.log(data)
          if(data.success){
            toast.success('Your Order is Placed Login and Track Your Order in My Orders ')
            setcart({}); 
            setbill(0)
            localStorage.removeItem("cart");
            localStorage.setItem('bill' , 0)

          }
        
      })
  }

  useEffect(()=>{
    fetchData(); 
  },[])
  return (
    <> 
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    
  </div>
  <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {Object.keys(cart).map((e)=>{
          return(
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          
            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{cart[e].name}</span>
              <span className="float-right text-gray-400">qtyX{ cart[e].qty }</span>
              <p className="text-lg font-bold">{ formatPriceWithThousandSeparator(cart[e].price) }</p>
            </div>
          </div>

          )
        })}
      <div  className="text-center font-bold  py-4 " >
        Your Total Bill is ruppes of   {  formatPriceWithThousandSeparator(bill)}
      </div>
      </div>
  
      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <form className="mt-5 grid gap-6">
        <div className="relative">
          <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"  ></span>
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
            <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            </div>
          </label>
        </div>
        <div className="relative">
          <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
            <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            </div>
          </label>
        </div>
      </form>
    </div>
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">Complete your order by providing your payment details.</p>
      <div className="">
        <label for="email" className="mt-4 mb-2 block text-sm font-medium" value={form.email} onChange={handleChange} >Email</label>
        <div className="relative">
          <input type="text" value={form.email} onChange={handleChange} id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        </div>
        <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium">Name</label>
        <div className="relative">
          <input type="text" onChange={handleChange} value={form.name} id="card-holder" name="name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
          </div>
        </div>
        <label for="card-no" className="mt-4 mb-2 block text-sm font-medium">Address</label>
        <div className="flex">
          <div className="relative w-7/12 flex-shrink-0">
            <input type="text" onChange={handleChange} value={form.address} id="address" name="address" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Pratehe wali gali Delhi jama masjid " />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
              </svg>
            </div>
          </div>
          <input type="text" value={form.landmark} name="landmark" onChange={handleChange} className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="LandMark" />
          <input type="tel" value={form.phone} onChange={handleChange} name="phone" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="+9100000000" />
    
        </div>
        <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-shrink-0 sm:w-7/12">
            <input type="text" onChange={handleChange} value={form.city} id="city" name="city" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Delhi" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img className="h-4 w-4 object-contain" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png?20230723002237" alt="" />
            </div>
          </div>
          <select type="text" onChange={handleChange} name="state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
            <option value="State">State</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Haryana">Haryana</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra </option>


          </select>
          <input type="text" onChange={handleChange} value={form.pincode} name="pincode" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
        </div>
  

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">{formatPriceWithThousandSeparator(bill)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">$8.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">{formatPriceWithThousandSeparator(bill)}</p>
        </div>
      </div>
      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"  onClick={handleClick}>Place Order</button>
    </div>
  </div>
  </>
  )
}

export default Checkout