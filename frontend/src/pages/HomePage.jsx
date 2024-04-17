import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import Toast from 'react-hot-toast';
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { useEffect, useState } from "react";



ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {

	const {data, loadingStatistics}=useQuery(GET_TRANSACTION_STATISTICS)

	const {data: authUserData}=useQuery(GET_AUTHENTICATED_USER)

	const [logout, {loading, client}]	=useMutation(LOGOUT,{
		refetchQueries: ["GetAuthenticatedUser"]
	
	})                                               

const [chartData, setChartData] = useState({
	labels: [],
	datasets: [
		{
			label: "$",
			data: [],
			backgroundColor: [],
			borderColor: [],
			borderWidth: 1,
			borderRadius: 0,
			spacing: 10,
			cutout: 110,
    hoverOffset: 8
		},
  
	],
});



useEffect(() => {
	if (data?.categoryStatistics) {
		const categories = data.categoryStatistics.map((stat) => stat.category);
		const totalAmounts = data.categoryStatistics.map((stat) => stat.totalAmount);

		const backgroundColors = [];
		const borderColors = [];

		categories.forEach((category) => {
			if (category === "saving") {
				backgroundColors.push("rgba(75, 192, 192)");
				borderColors.push("rgba(75, 192, 192)");
			} else if (category === "expense") {
				backgroundColors.push("rgba(255, 99, 132)");
				borderColors.push("rgba(255, 99, 132)");
			} else if (category === "investment") {
				backgroundColors.push("rgba(54, 162, 235)");
				borderColors.push("rgba(54, 162, 235)");
			}
		});

		setChartData((prev) => ({
			labels: categories,
			datasets: [
				{
					...prev.datasets[0],
					data: totalAmounts,
					backgroundColor: backgroundColors,
					borderColor: borderColors,
				},
			],
		}));
	}
}, [data]);

	// console.log("category statistics: ", data);

	const handleLogout = async() => {
		try{
			await logout();
			client.resetStore();
		}catch(error){
			console.error("Error logging out: ", error.message);
			Toast.error(error.message)
		}
	};


	return (
		<>
	
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
			{/* <img
						src={authUserData?.authUser.profilePic}
						className='w-11 h-11 rounded-full border cursor-pointer absolute top-0 left-0'
						alt='Avatar'
					/> */}
				<div className='flex  justify-center'>
					<p className='md:text-4xl text-3xl lg:text-4xl font-bold text-center relative z-50 mb-4 vyay-thematic'>
						Manage and track wisely, the व्यय of your life.
					</p>
					{/* <img
						src={authUserData?.authUser.profilePic}
						className='w-11 h-11 rounded-full border cursor-pointer absolute top-0'
						alt='Avatar'
					/> */}
					<div className="pl-8">
					{!loading && <MdLogout className='mx-2 w-10 h-10 cursor-pointer ' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}

					</div>
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>

					{data?.categoryStatistics.length>0 &&
					(<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
						<Doughnut data={chartData} />
					</div>)
					
					}

					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;