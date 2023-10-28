import React ,{useState} from 'react'

const Addprod = () => {
    const [name, setname] = useState('')
    const [category, setcategory] = useState('')
    const [desc, setdesc] = useState(''); 
    const [price, setPrice] = useState(0)
    const [qty, setqty] = useState(0)
    const [file, setFile] = useState(null);
    const [other, setother] = useState('')
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    const handleChange = (e)=>{
        if(e.target.name == 'name'){
            setname(e.target.value)
        }
        else if(e.target.name == 'category'){
            setcategory(e.target.value)
        }
        else if(e.target.name == 'price'){
            setPrice(e.target.value)
        }

        else if(e.target.name == 'qty'){
            setqty(e.target.value)
        }
        else if(e.target.name == 'desc'){
            setdesc(e.target.value)
        }
        else{
          setother(e.target.value)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name' , name); 
        formData.append('desc' , desc); 
        formData.append('category' , category); 
        formData.append('price' , price); 
        formData.append('qty' , qty);
        formData.append('other' , other.split(' '))
        console.log(other.split(' ')) 
        fetch('http://localhost:3000/api/product/addproduct', {
            method: 'POST',
            body: formData,
            }).then((res)=>res.json()).then((data)=>{
                console.log(data)
            })
 
    }
  return (
    <form className="w-full max-w-sm mx-auto my-8 min-h-screen  " onSubmit={handleSubmit} >
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        Product Name 
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" id="inline-full-name" type="text"  name="name"  value={name} onChange={handleChange}  required/>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Category 
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" id="inline-password" type="text" name="category" value={category} onChange={handleChange}  required/>
    </div>
  </div>

  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Price  
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" id="inline-password" type="number" name="price" value={price}  onChange={handleChange} required/>
    </div>
  </div>


  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        AvailableQty  
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" id="inline-password" type="number" name="qty" value={qty}  onChange={handleChange} required/>
    </div>
  </div>

  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Other  
      </label>
    </div>
    <div className="md:w-2/3">
      <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" type="text" name="other" value={other} placeholder="Like size or ram or something be sure every should be backspace on the word "  onChange={handleChange} required/>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Upload Image   
      </label>
    </div>
    <div className="md:w-2/3">
      <input className=" appearance-none  border-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" id="inline-password" type="file" name="image" onChange={handleFileChange} required/>
    </div>
  </div>

  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
        Description   
      </label>
    </div>
    <div className="md:w-2/3">
        <textarea  className= "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500" name="desc" id="desc" cols="30" rows="5"  onChange={handleChange} value={desc} required></textarea>
 
    </div>
  </div>

  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3">
      <button  className="shadow bg-sky-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
        Add Product 
      </button >
    </div>
  </div>
</form>
  )
}

export default Addprod