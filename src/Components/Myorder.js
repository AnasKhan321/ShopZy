import React , {useEffect ,useState} from 'react'
import   {Link } from 'react-router-dom';
const StringToDate = (dateString)=>{
    const dateObject = new Date(dateString);
    return dateObject.toString() ; 
}

const Myorder = () => {
    const [orders, setorders] = useState([])
    const checkUser = async()=>{
        if(localStorage.getItem('shopzy') ){
            const token = localStorage.getItem('shopzy')
            const res = await  fetch(`http://localhost:3000/api/order/myorder/${token}`)
            const data = await res.json(); 
            setorders(data.data)
        }
        else{
            console.log('user is not herer ')
        }
    }

    useEffect(()=>{
        checkUser(); 
    },[])


  return (

    <div  className="container mx-auto  mt-8 min-h-screen  ">

 
        <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                <th scope="col" className="px-6 py-4">Order at </th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Bill </th>
                <th scope="col" className="px-6 py-4">Status </th>
                <th scope="col" className="px-6 py-4">Order Detail  </th>

                </tr>
            </thead>
            <tbody>
                {orders.map((e)=>{
                    return( <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{ StringToDate( e.Orderat)}</td>
                    <td className="whitespace-nowrap px-6 py-4">{e.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{e.bill}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-green-600 ">{e.status}!</td>
                    <td className="whitespace-nowrap px-6 py-4 text-blue -600 "> <Link className="text-blue-600 " to={`/orderdetail?q=${e._id}`} > Order Details  </Link>  </td>

                    </tr>)
                })}
               

            </tbody>
            </table>
        </div>
        </div>
    </div>
    </div>
</div>
  )
}

export default Myorder