import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// const geistSans = localFont({
// 	src: './fonts/GeistVF.woff',
// 	variable: '--font-geist-sans',
// 	weight: '100 900',
// });
// const geistMono = localFont({
// 	src: './fonts/GeistMonoVF.woff',
// 	variable: '--font-geist-mono',
// 	weight: '100 900',
// });

// export const metadata: Metadata = {
// 	title: 'Templete',
// 	description: 'Template Multi Idioma',
// };

export default async function LocaleLayout({
	children,
}: { children: React.ReactNode }) {
	return <>{children}</>;
}
