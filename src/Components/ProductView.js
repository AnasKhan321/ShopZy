import React ,{useState,useEffect} from 'react'
import  { useContext } from 'react';
import { MyContext } from '../Context/MyContext';
import { FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const ProductView = () => {
    const navigate = useNavigate();
 
    const [data, setdata] = useState({})
    const con = useContext(MyContext); 
    const [Comments, setComments] = useState([])
    const [review, setreview] = useState(''); 
    const [user, setuser] = useState(true)
    const CheckUser = ()=>{
        const token = localStorage.getItem('shopzy')
        if(token){
            setuser(true)
        }
        else{
            setuser(false)
        }
    }
    const fethcData = async()=>{
        let urlInfo = window.location.href.split('=')
        if(urlInfo.length == 1){
            navigate('/')
        }
        else{
            let id = window.location.href.split('=')[1]
        
            const res =  await fetch(`http://localhost:3000/api/product/product/${id}`); 
            const data = await res.json(); 
            console.log(data)
            setdata(data.data)
            setComments(data.review)
        }
        
    }
    useEffect(()=>{
        fethcData(); 
        CheckUser(); 
    },[])

    const handleClick = async (e) => {
        e.preventDefault();
      
        let updatedCart = { ...con.cart };
      
        if (Object.keys(con.cart).includes(data._id)) {
          updatedCart[data._id].qty += 1;
        } else {
          updatedCart = { ...updatedCart, [data._id]: { name: data.Name, qty: 1, price: data.price } };
        }
      
        // Update the context cart state
        con.setcart(updatedCart);
        console.log(updatedCart)
        let newint = await  con.UpdateBill(updatedCart); 
        console.log(newint)
      
        // Update the local storage
        con.savetoLocalStore(updatedCart , newint)
        toast.success('Product added successfully ')
       
      };

      const handleChange = (e)=>{
        setreview(e.target.value)
      }
      const AddReview = ()=>{
            const token = localStorage.getItem('shopzy')
            console.log(token)
            console.log(review , data._id )
            const data1 = {
                token : token , 
                review : review , 
                Id : data._id 
            }
            fetch('http://localhost:3000/api/review/addReview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data1),
                }).then((res)=>res.json()).then((dat)=>{
                    if(dat.success){
                        fethcData(); 
                    }
                })
      }

      const BuyNow = (e)=>{
        e.preventDefault(); 
        let updatedCart = {  [data._id]: { name: data.Name, qty: 1, price: data.price } };


        con.setcart(updatedCart); 
        con.setbill(data.price)
        localStorage.setItem('bill' , data.price)
        con.savetoLocalStore(updatedCart , data.price)
        navigate('/checkout')

      }
      
    return (
        <>
    <div className="min-h-screen " >


            <div className="bg-white mt-6  ">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>

                            </li>
                            <li>
                                <div className="flex items-center">
                                    <a href="#" className="mr-2 text-sm font-medium text-gray-900">{data.Category} </a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li className="text-sm">
                                <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{data.Name} </a>
                            </li>
                        </ol>
                    </nav>


                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">


                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img src={`http://localhost:3000/${data.imageurl}`} alt="Model wearing plain white basic tee." className="h-full w-full object-cover object-center" />
                        </div>
                    </div>


                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.Name}</h1>
                        </div>

                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">₹{data.price}</p>

                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">

                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="sr-only">4 out of 5 stars</p>
                                    <a href="#" className="ml-3 text-sm font-medium text-sky-400 hover:text-indigo-500">117 reviews</a>
                                </div>
                            </div>

                            <form className="mt-10">

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <fieldset className="mt-4">
                                        <legend className="sr-only">Choose a color</legend>
                                        <div className="flex items-center space-x-3">

                                            <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                                <input type="radio" name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-0-label" />
                                                <span id="color-choice-0-label" className="sr-only">White</span>
                                                <span aria-hidden="true" className="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"></span>
                                            </label>
                                            ctive and Checked: "ring-
                                            <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                                <input type="radio" name="color-choice" value="Gray" className="sr-only" aria-labelledby="color-choice-1-label" />
                                                <span id="color-choice-1-label" className="sr-only">Gray</span>
                                                <span aria-hidden="true" className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"></span>
                                            </label>

                                            <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                                                <input type="radio" name="color-choice" value="Black" className="sr-only" aria-labelledby="color-choice-2-label" />
                                                <span id="color-choice-2-label" className="sr-only">Black</span>
                                                <span aria-hidden="true" className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"></span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>


                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        <a href="#" className="text-sm font-medium text-sky-400 hover:text-indigo-500">Size guide</a>
                                    </div>

                                    <fieldset className="mt-4">
                                        <legend className="sr-only">Choose a size</legend>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
                                                <input type="radio" name="size-choice" value="XXS" disabled className="sr-only" aria-labelledby="size-choice-0-label" />
                                                <span id="size-choice-0-label">XXS</span>
                                                <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                                    <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                                        <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke" />
                                                    </svg>
                                                </span>
                                            </label>

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                <input type="radio" name="size-choice" value="XS" className="sr-only" aria-labelledby="size-choice-1-label" />
                                                <span id="size-choice-1-label">XS</span>

                                                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                            </label>

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                <input type="radio" name="size-choice" value="S" className="sr-only" aria-labelledby="size-choice-2-label" />
                                                <span id="size-choice-2-label">S</span>

                                                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                            </label>

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                <input type="radio" name="size-choice" value="M" className="sr-only" aria-labelledby="size-choice-3-label" />
                                                <span id="size-choice-3-label">M</span>

                                                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                            </label>

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                <input type="radio" name="size-choice" value="L" className="sr-only" aria-labelledby="size-choice-4-label" />
                                                <span id="size-choice-4-label">L</span>

                                                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                            </label>

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                <input type="radio" name="size-choice" value="XL" className="sr-only" aria-labelledby="size-choice-5-label" />
                                                <span id="size-choice-5-label">XL</span>

                                                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                            </label>

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                <input type="radio" name="size-choice" value="2XL" className="sr-only" aria-labelledby="size-choice-6-label" />
                                                <span id="size-choice-6-label">2XL</span>

                                                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                            </label>

                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                <input type="radio" name="size-choice" value="3XL" className="sr-only" aria-labelledby="size-choice-7-label" />
                                                <span id="size-choice-7-label">3XL</span>

                                                <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="buttons flex mt-10 ">
                                    <button onClick={handleClick}  className=" flex mx-4   items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"  >Add to bag</button>
                                    <button className="flex  mx-4  items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={BuyNow} > Buy Now  </button>

                                </div>

                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{data.desc}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {data?.other?.map((e)=>{
                                            return(
<li className="text-gray-400"><span className="text-gray-600">{e}</span></li>
                                            )
                                        })}
                                        
                                       
                                    </ul>
                                </div>
                            </div>

                       
                        </div>
                    </div>
                </div>
            </div>


             {user  &&                                 
            <div className="container mx-auto md:w-8/12 w-10/12  " >
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Write a Review about the Product </label>
                <textarea value={review} onChange={handleChange} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   " placeholder="Write your thoughts here..."></textarea>
                <button className="px-4 py-1  mt-2  text-white bg-sky-400 " onClick={AddReview} >Add </button>
            </div>}

            <div className="reviews  w-10/12  md:w-8/12 mx-auto mt-6  ">
                {Comments.map((e)=>{
                    return(
                        <div className="review my-2   flex items-center shadow-lg  p-4 border  ">
                        <FaUserCircle  className="text-4xl    " />
                        <div  className="flex  flex-col " >
                            <p  className="font-bold " >@{e.User.username} </p>
                              <p className="mx-2 " >{e.review} </p>
    
                        </div>
                    </div>
                    )
                })}
               
            </div>

            </div>

        </>
    )
}

export default ProductView