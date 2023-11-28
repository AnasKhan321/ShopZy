import React ,{useState,useEffect} from 'react'
import {Link } from 'react-router-dom'; 

const Tshirt = (props) => {
    const [data, setdata] = useState([]); 

    const fetchdata = async()=>{
        const res =  await fetch(`http://localhost:3000/api/product/categoryproduct/T-shirt`)
        const data = await res.json(); 
        setdata(data.data)
        
    }

 
    useEffect(()=>{
        fetchdata(); 
       
    },[])

 
    return (
        <div className="container mx-auto my-4 min-h-screen  ">
                {data.length !==0 &&   <h1    className="text-center font-bold text-2xl my-6" > Top T-shirts  </h1>  }
                <div className="cards flex flex-wrap justify-between  ">
                    {data.length == 0 && <h1 className=" mx-auto  text-center text-2xl "> New Stock of Tshirt will be available Soon ! </h1>}
                    {data.map((e)=>{
                        return( 
                            <div  key={e._id } className="card w-12/12   my-4   md:w-3/12   mx-4   shadow-xl  hover:shadow-sky-200 cursor-pointer transition-all delay-75  border rounded-xl    flex flex-col justify-center   ">
                            <img src="https://img.freepik.com/free-psd/isolated-white-t-shirt-front-view_125540-1194.jpg" alt="" />
        
                            <div className="content flex flex-col justify-center items-center  ">
                                <h2  className="font-bold text-xl pt-4 " > {e.Tshirt} -  {e.Name}</h2>
                                <p className="my-1 " >₹   <span className="font-bold text-2xl  " >   {e.price} </span>   M.R.P  </p>
                                <p className="text-sm " >{e.desc.slice(0,50) }</p>
        
                                <div className="buttons w-full    my-4 flex justify-center justify-around ">
                                    <button className="font-bold hover:bg-sky-900 transition-colors  text-white  py-2 px-4 bg-sky-700 " > <Link to={`/product?q=${e._id }`} >  View  Product </Link> </button>
                                </div>
        
                            </div>
                        </div>
                        )
                    })}
                 
                   
                </div>
        </div>
      )
}

export default Tshirt