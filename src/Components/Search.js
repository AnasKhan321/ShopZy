import React , {useState ,useEffect} from 'react'
import { useNavigate , Link } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([])

    const fethcData = async()=>{
        let locationn = window.location.href.split('=')
        if(locationn.length == 1){
            navigate('/')
        }
        else{
            let query = locationn[1]
            const res = await  fetch(`http://localhost:3000/api/product/search/${query}`)
            const data2= await res.json()
            setdata(data2)
        }
    }

    useEffect(()=>{
        fethcData(); 
    },[])
  return (
    <div className="container mx-auto my-4 min-h-screen  ">

            {data.length == 0 && <div className="text-center text-2xl font-bold my-1  " > We do  not have data to show   </div>}
            <div className="cards flex flex-wrap justify-between  ">

                {data.map((e)=>{
                    return(
                        <div  key={e._id } className="card   my-4   w-12/12  md:w-3/12    mx-4   shadow-xl  hover:shadow-sky-200 cursor-pointer transition-all delay-75  border rounded-xl    flex flex-col justify-center   ">
                        <img src="https://img.freepik.com/free-psd/isolated-white-t-shirt-front-view_125540-1194.jpg" alt="" />
    
                        <div className="content flex flex-col justify-center items-center  ">
                            <h2  className="font-bold text-xl pt-4 " > {e.Category} -  {e.Name}</h2>
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

export default Search