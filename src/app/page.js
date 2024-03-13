"use client"
import { FaClipboard } from 'react-icons/fa'
import { useForm } from './useForm';
import { useState } from 'react';
import { getRandomChar, getSpecialChar } from './utils';
import {toast} from 'react-hot-toast'


export default function Home() {

  const [values, setValues] = useForm({
    length: 6,
    capital: false,
    simple: true,
    number: false,
    symbol: false,
  })

  const [result,setResult] = useState('');

  const fieldsArray = [
    {
      fields:values.capital,
      getChar:()=> getRandomChar(65 , 90)
    },
    {
      fields:values.simple,
      getChar:()=> getRandomChar(97 , 122)
    },
    {
      fields:values.number,
      getChar:()=> getRandomChar(48 , 57)
    },
    {
      fields:values.symbol,
      getChar:()=> getSpecialChar()
    }
  ]

  const handleOnSubmit = (e) => {
    e.preventDefault();

    let generatePassword = "" ; 

    const  checkedFields = fieldsArray.filter(({fields})=> fields );

    for(let i=0; i < values.length; i++){
      const index = Math.floor(Math.random()*checkedFields.length);
      const letter = checkedFields[index]?.getChar();
      
      if(letter){
        generatePassword += letter;
        
      }
    }
    if(generatePassword){
      setResult(generatePassword)
    }
   
  }

  const handleClipboard= async()=>{
    if(result){
      await navigator.clipboard.writeText(result);
      toast.success('Copied Successuly')      
    }else{
      toast.error('No Password to copy')
    }
  } 

  return (
    <main>
      <div className="max-w-[600px] mx-auto">

        <h1 className="text-slate-800 font-bold text-center p-4 mb-8">Passowrd Generator</h1>
        <form onSubmit={handleOnSubmit}>
        <div className="flex justify-center items-center gap-2  bg-slate-100 shadow-md w-full h-[10vh] rounded-lg my-auto mb-10 text-center">
          <input type="text" id="result" placeholder="Your password..." readOnly value={result}
            className="mt-3 py-2 rounded-lg px-12" />
          <div className='text-blue-900' onClick={handleClipboard}>
            <FaClipboard></FaClipboard>
          </div>
        </div>

        <div className=" flex justify-center">
          <div className='flex flex-col '>
            <div className=" mb-4 flex justify-center gap-4">
            
              <label
                htmlFor="minmax-range"
                className="block mb-2 text-sm font-medium text-gray-900 w-full ">
                Passowrd Size
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">5</span>
              <input
                id="minmax-range"
                type="range"
                min="6"
                max="20"
                name='length'
                value={values.length}
                onChange={setValues}

                className="mt-1 w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <span className="text-sm text-gray-500 dark:text-gray-400 ">20</span>

            </div>
            {/* Enable Simples */}
            <div className="flex items-center justify-center  mb-4">
              <input 
              id="default-checkbox" 
              type="checkbox" 
              name='simple'
              checked={values.simple}
              onChange={setValues} 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">{!values.simple ? "Enable Simples" : "Disable Simples"}</label>
            </div>
             {/* Enable Capitals */}
             <div className="flex items-center justify-center  mb-4">
              <input 
              id="default-checkbox" 
              type="checkbox" 
              name='capital'
              checked={values.capital}
              onChange={setValues} 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">{!values.capital ? "Enable Capitals" : "Disable Capitals"}</label>
            </div>
            {/* Enable  numbers */}
            <div className="flex items-center justify-center mb-4">
              <input 
              id="default-checkbox" 
              type="checkbox"
              name='number' 
              checked={values.number}
              onChange={setValues} 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">{!values.number ? "Enable Numbers" : "Disable Numbers"}</label>
            </div>
            {/* Enable characters */}
            <div className="flex items-center justify-center mb-4">
              <input 
              id="default-checkbox" 
              type="checkbox"
              name='symbol' 
              checked={values.symbol}
              onChange={setValues} 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">{!values.symbol ? "Enable Symbols" : "Disable Symbols"}</label>
            </div>
           


            <div className="flex justify-center my-10">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Generate
              </button>
            </div>
            </div>
        </div>
        </form>
      </div>
    </main>
  );
}
