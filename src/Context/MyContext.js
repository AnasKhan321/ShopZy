// src/context/MyContext.js
import React, { createContext, useState , useEffect } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [myState, setMyState] = useState(0);
  const [cart, setcart] = useState({});  
  const [bill, setbill] = useState(0)
  
  useEffect(()=>{
    if(localStorage.getItem('cart')){
        setcart( JSON.parse( localStorage.getItem('cart')))
        console.log('this isehre')
    }
    if(localStorage.getItem('bill')){
      setbill(  parseInt( localStorage.getItem('bill')))
      console.log(localStorage.getItem('bill'))
    }
  },[])  
  
  const UpdateBill = (updatedcart)=>{
    let totalbill = 0 ; 
    console.log(updatedcart)
    
    Object.keys(updatedcart).map((e)=>{
      console.log(e)
      totalbill+=updatedcart[e].price * updatedcart[e].qty 
    })
    console.log(bill)
    setbill(totalbill)
    return totalbill ; 
  }
  const savetoLocalStore = (data ,bill2)=>{
    localStorage.setItem('cart', JSON.stringify(data));
    localStorage.setItem('bill' , bill2)
    
  }

  return (
    <MyContext.Provider value={{ myState, setMyState , cart ,setcart , savetoLocalStore , bill , UpdateBill , setbill }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
