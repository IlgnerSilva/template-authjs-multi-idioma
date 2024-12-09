export function EmailTemplate(type: 'code' | 'message', data: string) {
	if (type === 'code') {
		return (
			<div>
				<h1>Código de verificação</h1>
				<p>Seu código de verificação é:</p>
				<p>{data}</p>
			</div>
		)
	}

	if (type === 'message') {
		return (
			<div>
				<h1>Mensagem</h1>
				<p>Seu link de verificação é:</p>
				<p>{data}</p>
			</div>
		)
	}
}
