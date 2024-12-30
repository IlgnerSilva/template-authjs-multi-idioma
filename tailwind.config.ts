import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				neutral: {
					base: {
						100: '#FFFFFF', // Mais claro
						200: '#EFEFEF',
						300: '#F4F4F4',
						400: '#EFEFEF',
						500: '#6F767E', // Neutro médio
						600: '#33383F',
						700: '#272B30',
						800: '#1A1D1F',
						900: '#111315', // Mais escuro
					},
				},
				shades: {
					base: {
						200: '#9A9FA5',
						400: '#6F767E',
						600: '#6F767E',
						800: '#33383F',
					},
				},
				primary: {
					blue: '#2A85FF', // Azul principal
					green: '#83BF6E', // Verde principal
					red: '#FF6A55', // Vermelho principal
					purple: '#8E59FF', // Roxo principal
				},
				secondary: {
					orange: '#FFBC99', // Secundário laranja
					lavender: '#CABDFF',
					lightblue: '#B1E5FC',
					mint: '#B5E4CA',
					yellow: '#FFD88D',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
