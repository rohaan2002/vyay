import { useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeletons";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import Toast from 'react-hot-toast';



const TransactionPage = () => {

	const navigate = useNavigate();
	
	const{id}=useParams(); // 'id' bola h kyuki App.jsx ke routes m dekho '/transaction/:id' path pe transaction ka page khulra
	// console.log(id);

	const{data, loading, error}=useQuery(GET_TRANSACTION,{
		variables: {id:id}
	});

	// console.log("transaction data from card: ", data);

const [updateTransaction, {loading: loadingUpdate}] = useMutation(UPDATE_TRANSACTION)

	const [formData, setFormData] = useState({
		description: data?.transaction.description,
		paymentType: data?.transaction.paymentType,
		category: data?.transaction.category,
		amount: data?.transaction.amount,
		location: data?.transaction.location,
		date: data?.transaction.date,
	});

	

	const handleSubmit = async (e) => {
		e.preventDefault();
		const amount = parseFloat(formData.amount); //bcz the amount in formData would update using setFormData from input, and input always gives a string value. 
		try{
			await updateTransaction({
				variables:{
					input: {
						...formData,
						amount,
						transactionId: id
					}
				}
			})

			Toast.success("Transaction updated successfully!")

			navigate('/');

			
		}catch(error){
			Toast.error(error.message);
		}
	};


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
  
	useEffect(()=>{
		if(data){
		setFormData({
			description: data?.transaction.description,
			paymentType: data?.transaction.paymentType,
			category: data?.transaction.category,
			amount: data?.transaction.amount,
			location: data?.transaction.location,
			date: new Date(+data.transaction.date).toISOString().substr(0,10), //converts the string timestamp value to DD/MM/YYYY format
		})
	}
	},[data])

	// if (loading) return <TransactionFormSkeleton />;

	return (
		<div className='h-screen max-w-4xl mx-auto flex flex-col items-center '>
			<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-green-400 via-green-600 to-green-300 inline-block text-transparent bg-clip-text'>
				Update this transaction
			</p>
			<form className='w-full max-w-lg flex flex-col gap-5 px-3 ' onSubmit={handleSubmit}>
				{/* TRANSACTION */}
				<div className='flex flex-wrap'>
					<div className='w-full'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='description'
						>
							Transaction
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='description'
							name='description'
							type='text'
							placeholder='Rent, Groceries, Salary, etc.'
							value={formData.description}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* PAYMENT TYPE */}
				<div className='flex flex-wrap gap-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='paymentType'
						>
							Payment Type
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='paymentType'
								name='paymentType'
								onChange={handleInputChange}
								defaultValue={formData.paymentType}
							>
								<option value={"UPI"}>UPI</option>
								<option value={"cash"}>Cash</option>
								<option value={"card"}>Card</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>

					{/* CATEGORY */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='category'
						>
							Category
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='category'
								name='category'
								onChange={handleInputChange}
								defaultValue={formData.category}
							>
								<option value={"saving"}>Saving</option>
								<option value={"expense"}>Expense</option>
								<option value={"investment"}>Investment</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>

					{/* AMOUNT */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
							Amount(₹)
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='amount'
							name='amount'
							type='number'
							placeholder='1500'
							value={formData.amount}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* LOCATION */}
				<div className='flex flex-wrap gap-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='location'
						>
							Location
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							id='location'
							name='location'
							type='text'
							placeholder='Ghaziabad'
							value={formData.location}
							onChange={handleInputChange}
						/>
					</div>

					{/* DATE */}
					<div className='w-full flex-1'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='date'
						>
							Date
						</label>
						<input
							type='date'
							name='date'
							id='date'
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white'
							placeholder='Select date'
							value={formData.date}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* SUBMIT BUTTON */}
				<button
					className=' h-12 text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600'
					type='submit' disabled={loadingUpdate}
				>
					{loadingUpdate? "Updating...": "Update Transaction" }
				</button>
			</form>
		</div>
	);
};
export default TransactionPage;