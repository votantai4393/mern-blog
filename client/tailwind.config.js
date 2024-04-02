/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin'
import scrollbar from 'tailwind-scrollbar'
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/lib/esm/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {}
	},
	plugins: [flowbite, scrollbar]
}
