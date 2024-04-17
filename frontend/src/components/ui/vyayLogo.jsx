import React from 'react'
import { Link } from "react-router-dom";
import img from './../../components/ui/rupee.png'
const vyayLogo = () => {
  return (
    <div className='md:text-6xl text-5xl lg:text-8xl font-bold text-center  relative z-50 vyay-logo-thematic'>
    <Link to='/'><div className="flex flex-row items-center justify-center relative">
       
       <div className="absolute opacity-45 z-10 md:w-[200px] w-[150px] lg:w-[300px]  mt-4 lg:mt-9" ><img src={img}  alt="" /></div>
       
       <div className="leading-3 z-20 mt-20 lg:mt-28">Vyay</div> 
       </div>
       
       </Link>
</div>
  )
}

export default vyayLogo
