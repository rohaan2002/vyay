import { Link } from "react-router-dom";

import VyayLogo from "./vyayLogo.jsx";


const Header = () => {
	return (
		<div className='mb-14'>
			{/* <div className='md:text-6xl text-5xl lg:text-8xl font-bold text-center  relative z-50 vyay-thematic'>
				 <Link to='/'><div className="flex flex-row items-center justify-center relative">
					
					<div className="absolute opacity-45 z-10 md:w-[200px] w-[150px] lg:w-[300px]  mt-4 lg:mt-9" ><img src={img}  alt="" /></div>
					
					<div className="leading-3 z-20 mt-20 lg:mt-28">Vyay</div> 
					</div>
					
					</Link>
			</div> */}
			<VyayLogo/>
			<div className='relative w-1/2 mx-auto hidden md:block'>
				{/* Gradients */}
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[2px] w-3/4 blur-sm' />
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-3/4' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent h-[5px] w-1/4 blur-sm' />
				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent h-px w-1/4' />
			</div>
			
		</div>
	);
};
export default Header;