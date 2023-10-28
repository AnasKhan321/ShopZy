import React,{useState} from 'react'
import {  Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();


    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleChange= (e)=>{
        if(e.target.name == 'email'){
            setemail(e.target.value)
        }
        else{
            setpassword(e.target.value)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault(); 
        const data ={
            email : email,
            password : password
        }

        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            }).then((res)=>res.json()).then((data)=>{
                console.log(data)
                if(data.success){
                    if(data.admin){
                        toast.success('Welcome admin ')
                        localStorage.setItem('shopzy' , data.token)
                        localStorage.setItem('admin' , true) 
                    }
                    else{
                        toast.success('Login Successfully  ')
                        localStorage.setItem('shopzy' , data.token)
                    }
                    setTimeout(() => {
                        navigate('/')
                    }, 3000);
                }
                else{
                    toast.error(data.error)
                }
                setpassword('')
                setemail('')
            })
    }

  return (
    
  <div className="flex   flex-col justify-center px-6 py-12 lg:px-8  ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6"  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 px-4 py-2  " value={email}  onChange={handleChange} />
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 px-4 py-2  " value={password} onChange={handleChange}  />
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Sign in</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
        Not have an  account ?
        <Link to='/signup' className="font-semibold leading-6 text-sky-600 hover:text-sky-500">Create an Account </Link>
      </p>
    </div>
  </div>
  
  )
}

export default Login