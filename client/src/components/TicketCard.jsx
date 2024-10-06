export default function TicketCard({ ticket, onClick }) {
	return (
		<div
			className="overflow-auto h-60 bg-[#D9D9D9] ml-4 mb-10 w-64 rounded-lg flex flex-col relative cursor-pointer"
			onClick={() => onClick(ticket.id)}
		>
			<h3 className="p-5 text-lg font-bold">#{ticket.id}</h3>
			<p className="text-sm pl-5 pb-2 font-semibold text-[#49454F]">
				From: {ticket.email}
			</p>
			<p className="text-sm pl-5 font-semibold text-[#49454F]">
				Subject: {ticket.subject}
			</p>
			<div className="absolute bottom-2 right-2 px-3 py-1 text-2xl font-semibold text-[#65558F] rounded-full">
				{ticket.status}
			</div>
		</div>
	)
}
