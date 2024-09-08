import logo from '../assets/damztech-logo.svg'

export default function Login() {
	return (
		<div className="w-[1920px] h-[1080px] bg-white flex flex-col items-center">
			<img
				src={logo}
				alt="damztech-logo"
				className="w-[286px] h-[128px] mt-[17px]"
			/>
			<h1 className="text-5xl font-bold mt-[15px]">Support Desk</h1>
			<div className="w-[734px] h-[672px] mt-[60px] bg-gradient-to-b from-[#D9D9D9] to-[#737373] rounded-xl flex flex-col items-center relative">
				<h2 className="text-5xl font-semibold mt-10">Login</h2>
				<div className="w-full px-12 mt-16">
					<h3 className="text-4xl mb-3">Email</h3>
					<input
						type="email"
						placeholder="admin@admin.com"
						className="w-full h-[92px] bg-[rgba(217,217,217,0.4)] rounded-xl text-4xl px-6"
					/>
				</div>
				<div className="w-full px-12 mt-8">
					<h3 className="text-4xl mb-3">Password</h3>
					<input
						type="password"
						placeholder="*********************"
						className="w-full h-[92px] bg-[rgba(217,217,217,0.4)] rounded-xl text-4xl px-6"
					/>
				</div>
				<div className="w-full px-12 mt-6 flex justify-between">
					<p className="text-2xl text-[#D9D9D9]">Forgot password?</p>
					<a href="#" className="text-2xl">
						Reset password
					</a>
				</div>
				<button className="mt-8 w-[399px] h-[85px] bg-[#D9D9D9] text-4xl font-bold rounded">
					Login
				</button>
			</div>
		</div>
	)
}
