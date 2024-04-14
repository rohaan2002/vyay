import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from "react-router-dom";
import formatMongoTimestamp from "../utils/formatDate.js";
import Toast from 'react-hot-toast';
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation.js";


const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-pink-800 to-pink-600",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};



const Card = ({transaction }) => {
	let {category, location ,date ,paymentType, description, amount}= transaction
	const cardClass = categoryColorMap[category];

	description = description[0].toUpperCase()+ description.slice(1);
	category = category[0].toUpperCase()+ category.slice(1);
	
	const [deleteTransaction, {loading}]=useMutation(DELETE_TRANSACTION, 
	{refetchQueries: ["GetTransactions"]});

	const handleDelete=async()=>{
		try{
			await deleteTransaction(
				{variables:{transactionId: transaction._id}}
			)
			Toast.success("Transaction deleted successfully")
		}catch(error){
			console.log("Error while deleting transaction card: ", error);
			Toast.error(error.message);
		}
	}
	
	const formattedDate = formatMongoTimestamp(date)

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br  ${cardClass}` }>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{category}</h2>
					<div className='flex items-center gap-2'>
						{loading ? <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>: <FaTrash className={"cursor-pointer"} onClick={handleDelete} />}
							{/* <FaTrash className={"cursor-pointer"} onClick={handleDelete} /> */}
						<Link to={`/transaction/${transaction._id}`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Description: {description}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className='text-white flex items-center gap-1'>
					<   FaRupeeSign />
					Amount: {amount}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaLocationDot />
					Location: {location|| "Not Specified"}
				</p>
				<div className='flex justify-between items-center'>
					<p className='text-xs text-gray-300 font-bold'>{formattedDate}</p>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;