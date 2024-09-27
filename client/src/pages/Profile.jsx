import React, { useState } from 'react'
import profilePic from '../assets/profile/profile.svg'

export default function Profile() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// Handle form submission here
		console.log('Form submitted:', formData)
	}

	return (
		<div className="bg-custom-gradient-profile rounded-lg h-full p-6">
			<form
				onSubmit={handleSubmit}
				className="p-10 pt-12 flex flex-col md:flex-row 2xl:max-w-7xl 2xl:mx-auto"
			>
				<div className="w-full md:w-1/3 flex flex-col items-center mb-6 md:mb-0 2xl:w-1/4">
					<div className="relative mb-2 2xl:mb-4">
						<div className="w-[100px] h-[100px] rounded-full bg-[#FFBA08] 2xl:w-[150px] 2xl:h-[150px]"></div>
						<img
							src={profilePic}
							alt="User-profile-Pic"
							className="absolute top-[10px] left-[16px] w-[70px] h-[70px] 2xl:top-[15px] 2xl:left-[24px] 2xl:w-[105px] 2xl:h-[105px]"
						/>
					</div>
					<button
						type="button"
						className="font-bold text-lg text-white 2xl:text-2xl"
					>
						Edit Picture
					</button>
				</div>
				<div className="w-full md:w-2/3 md:ml-12 flex flex-col justify-center 2xl:w-3/4 2xl:ml-24">
					<div className="mb-6 2xl:mb-10">
						<label
							htmlFor="fullName"
							className="font-bold text-xl text-white block 2xl:text-2xl"
						>
							Full name
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={formData.fullName}
							onChange={handleChange}
							className="w-full pb-2 border-b-2 border-white bg-transparent text-white placeholder-white::placeholder focus:outline-none autofill:bg-transparent 2xl:text-xl 2xl:pb-4"
							autoComplete="off"
						/>
					</div>
					<div className="mb-6 2xl:mb-10">
						<label
							htmlFor="email"
							className="font-bold text-xl text-white block 2xl:text-2xl"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full pb-2 border-b-2 border-white bg-transparent text-white placeholder-white::placeholder focus:outline-none autofill:bg-transparent 2xl:text-xl 2xl:pb-4"
							autoComplete="off"
						/>
					</div>
					<div className="mb-6 2xl:mb-10">
						<label
							htmlFor="password"
							className="font-bold text-xl text-white block 2xl:text-2xl"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full pb-2 border-b-2 border-white bg-transparent text-white placeholder-white::placeholder focus:outline-none autofill:bg-transparent 2xl:text-xl 2xl:pb-4"
							autoComplete="new-password"
						/>
					</div>
					<div className="mb-8 2xl:mb-12">
						<label
							htmlFor="confirmPassword"
							className="font-bold text-xl text-white block 2xl:text-2xl"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full pb-2 border-b-2 border-white bg-transparent text-white placeholder-white::placeholder focus:outline-none autofill:bg-transparent 2xl:text-xl 2xl:pb-4"
							autoComplete="new-password"
						/>
					</div>
					<div className="flex justify-end space-x-4 2xl:space-x-6">
						<button
							type="submit"
							className="bg-[#1E1E1E] text-white px-8 py-2 rounded 2xl:px-12 2xl:py-3 2xl:text-xl"
						>
							Save
						</button>
						<button
							type="button"
							className="bg-white text-black px-8 py-2 rounded 2xl:px-12 2xl:py-3 2xl:text-xl"
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
			<style jsx global>{`
				input:-webkit-autofill,
				input:-webkit-autofill:hover,
				input:-webkit-autofill:focus {
					-webkit-box-shadow: 0 0 0px 1000px transparent inset;
					transition: background-color 5000s ease-in-out 0s;
					-webkit-text-fill-color: white !important;
				}
			`}</style>
		</div>
	)
}
