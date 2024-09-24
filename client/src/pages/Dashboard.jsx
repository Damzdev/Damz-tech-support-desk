import TicketCard from '../components/TicketCard'

export default function Dashboard() {
	return (
		<div className="bg-custom-gradient-dashboard rounded-tl-lg h-full p-6">
			<h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
				Welcome back, user
			</h1>
			<hr className="border-t-2 border-white w-full my-4" />
			<h3 className="text-white p-4 text-xl md:text-2xl lg:text-3xl mb-4">
				Recent Support tickets
			</h3>
			<div className="flex">
				<TicketCard />
				<TicketCard />
				<TicketCard />
				<TicketCard />
			</div>
		</div>
	)
}
