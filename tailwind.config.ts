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
    					'100': '#FFFFFF',
    					'200': '#EFEFEF',
    					'300': '#F4F4F4',
    					'400': '#EFEFEF',
    					'500': '#6F767E',
    					'600': '#33383F',
    					'700': '#272B30',
    					'800': '#1A1D1F',
    					'900': '#111315'
    				}
    			},
    			shades: {
    				base: {
    					'200': '#9A9FA5',
    					'400': '#6F767E',
    					'600': '#6F767E',
    					'800': '#33383F'
    				}
    			},
    			primary: {
    				blue: '#2A85FF',
    				green: '#83BF6E',
    				red: '#FF6A55',
    				purple: '#8E59FF'
    			},
    			secondary: {
    				orange: '#FFBC99',
    				lavender: '#CABDFF',
    				lightblue: '#B1E5FC',
    				mint: '#B5E4CA',
    				yellow: '#FFD88D'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require('tailwindcss-animate')],
};
export default config;
