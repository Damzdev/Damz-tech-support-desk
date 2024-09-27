export default function TicketCard() {
	return (
		<div className="overflow-auto h-60 bg-[#D9D9D9] ml-10 w-60 rounded-lg flex flex-col relative cursor-pointer">
			<h3 className="p-5 text-lg font-bold">#100001</h3>
			<p className="text-sm pl-5 pb-2 font-semibold text-[#49454F]">
				From: user1@gmail.com
			</p>
			<p className="text-sm pl-5 font-semibold text-[#49454F]">
				Subject: Order #481843
			</p>
			<div className="absolute bottom-2 right-2 px-3 py-1 text-2xl font-semibold text-[#65558F] rounded-full">
				Open
			</div>
		</div>
	)
}
