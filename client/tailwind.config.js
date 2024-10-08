/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'custom-gradient': 'linear-gradient(180deg, #B3261E 0%, #000000 100%)',
				'custom-gradient-dashboard':
					'linear-gradient(180deg, #65558F 0%, #625B71 100%)',
				'custom-gradient-profile':
					'linear-gradient(180deg, #FF0844 0%, #FFB199 100%)',
				'custom-gradient-settings':
					'linear-gradient(180deg, #CBF3F0 0%, #FFB199 100%)',
			},
			colors: {
				'user-button-blue': 'rgba(116, 144, 196, 0.12)',
			},
		},
	},
	plugins: [],
}
