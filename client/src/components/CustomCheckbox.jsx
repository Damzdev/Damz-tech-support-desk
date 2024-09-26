export default function CustomCheckbox({ isChecked, onChange }) {
	return (
		<div
			className={`w-6 h-6 border border-gray-500 rounded mr-1 cursor-pointer ${
				isChecked ? 'bg-gray-600' : 'bg-transparent'
			}`}
			onClick={onChange}
		>
			{isChecked && (
				<svg
					className="w-4 h-4 text-black mx-auto mt-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			)}
		</div>
	)
}
