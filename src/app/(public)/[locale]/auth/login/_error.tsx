'use client';

export default function Errors({
	error,
}: {
	error: Error & { digest?: string };
}) {
	console.log(error);
	return <div>{error.message}</div>;
}
