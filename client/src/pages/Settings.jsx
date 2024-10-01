import React from 'react'

export default function Settings() {
	return (
		<div className="bg-custom-gradient-settings rounded-lg h-full min-h-screen flex items-center justify-center pb-28 p-6">
			<div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-4xl">
				<h2 className="text-white text-xl font-semibold mb-6">
					Set up exactly how you want it
				</h2>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-white">Email notifications</span>
						<button className="w-12 h-6 rounded-full bg-gray-700 flex items-center transition-colors duration-300 focus:outline-none">
							<div className="w-5 h-5 rounded-full bg-blue-500 shadow-md transform translate-x-6"></div>
						</button>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-white">Desktop notifications</span>
						<button className="w-12 h-6 rounded-full bg-gray-700 flex items-center transition-colors duration-300 focus:outline-none">
							<div className="w-5 h-5 rounded-full bg-blue-500 shadow-md transform translate-x-6"></div>
						</button>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-white">Forgot password?</span>
						<button className="text-blue-500 hover:underline focus:outline-none">
							Reset Password
						</button>
					</div>
				</div>

				<div className="mt-8 flex justify-end space-x-4">
					<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
						Save
					</button>
					<button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none">
						Discard
					</button>
				</div>
			</div>
		</div>
	)
}
