import { useState , useCallback, useEffect, useRef } from 'react'


function App() {
const [length,setlength]=useState(8);
const [numberAllowed, setNumber]=useState(false);
const [charAllowed, setCharater]=useState(false);
const[Password,setPassword]=useState();
const copyPassword=useRef(null);

const Generator = useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(charAllowed) str +="!@#$%^&*()_+";
  if(numberAllowed) str +="0123456789";

  for (let index = 1; index<=length; index++) {
    let char= Math.floor(Math.random()*str.length+1);
     pass+=str.charAt(char);
  };
  setPassword(pass);

},[length,numberAllowed,charAllowed,setPassword])

const copyClipBoard= useCallback(()=>{
  copyPassword.current?.select()
  copyPassword.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(Password);
},[Password])
 
useEffect(()=>{
 Generator();
},[length,numberAllowed,charAllowed,Generator])

return (
  <>
    <div className=' max-w-2xl w-full rounded-lg mx-auto px-4 my-8 h-44 text-orange-500 bg-gray-700 '>
      <h1 className=' text-4xl text-center text-white py-3 my-3'>Password Generator</h1>
      <div className='flex shadow rounded-xl overflow-hidden mb-4'>
        <input
          type="text"
          value={Password} 
          className='w-full py-2 px-3'
          placeholder='password'
          readOnly
          ref={copyPassword}
        />
         <button onClick={copyClipBoard}
    type="button"
    class="shrink-0 outline-none rounded-md  bg-green-500 px-3 py-0.5 text-sm font-semibold text-white shadow-sm hover:bg-green-300/80 "
  >
  Copy
  </button>
      </div>
      <div className='flex text-sm gap-x-2 text-lg font-bold'>
        <div className='flex item-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
        
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex item-center gap-x-2'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
       onChange={
        ()=>{
          setNumber((prev)=>!prev)
        }
       }
          
          />
          <label>Number</label>
        </div>
        <div className='flex item-center gap-x-2'>
          <input
          type='checkbox'
          defaultChecked={charAllowed}
          id='numberInput'
       onChange={
        ()=>{
          setCharater((prev)=>!prev)
        }
       }
          
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  </>
);
}

export default App
