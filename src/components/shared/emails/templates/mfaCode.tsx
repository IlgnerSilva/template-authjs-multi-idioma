import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Row,
	Section,
	Text,
} from '@react-email/components';
import type * as React from 'react';

export function MFACode({ code = 'XXXXXX' }: { code?: string }) {
	// Separar o código em dígitos individuais para o design
	const codeDigits = code?.split('') || [];

	return (
		<Html>
			<Head />
			<Body style={styles.body}>
				<Container style={styles.container}>
					<Section style={styles.logoSection}>
						{/* <Img
              src="/api/placeholder/120/40"
              alt="Logo da Empresa"
              width="120"
              height="40"
            /> */}
					</Section>

					<Section style={styles.mainSection}>
						<Heading style={styles.heading}>Verificação de Segurança</Heading>

						<Text style={styles.paragraph}>
							Para concluir sua autenticação, utilize o código de verificação
							abaixo:
						</Text>

						<Section style={styles.codeContainer}>
							{codeDigits.map((digit, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div key={index} style={styles.codeDigit}>
									{digit}
								</div>
							))}
						</Section>

						<Text style={styles.expiry}>
							Este código expira em <strong>10 minutos</strong>.
						</Text>

						<Hr style={styles.hr} />

						<Text style={styles.disclaimer}>
							Se você não solicitou este código, por favor ignore este email ou
							entre em contato com nossa equipe de suporte imediatamente.
						</Text>
					</Section>

					<Section style={styles.footer}>
						<Text style={styles.footerText}>
							© 2025 Sua Empresa. Todos os direitos reservados.
						</Text>
						<Text style={styles.footerText}>
							Av. Paulista, 1000 - São Paulo, SP - Brasil
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const styles: Record<string, React.CSSProperties> = {
	body: {
		backgroundColor: '#f5f5f5',
		fontFamily: "'Helvetica Neue', Arial, sans-serif",
		margin: 0,
		padding: 0,
	},
	container: {
		maxWidth: '600px',
		margin: '0 auto',
		backgroundColor: '#ffffff',
		borderRadius: '8px',
		overflow: 'hidden',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
	},
	logoSection: {
		padding: '24px 0',
		textAlign: 'center',
		backgroundColor: '#f8f9fa',
	},
	mainSection: {
		padding: '40px 24px',
	},
	heading: {
		fontSize: '24px',
		fontWeight: '700',
		color: '#252525',
		margin: '0 0 24px 0',
		textAlign: 'center',
	},
	paragraph: {
		fontSize: '16px',
		lineHeight: '24px',
		color: '#4a4a4a',
		margin: '0 0 24px 0',
		textAlign: 'center',
	},
	codeContainer: {
		display: 'flex',
		justifyContent: 'center',
		margin: '32px 0',
	},
	codeDigit: {
		display: 'inline-block',
		width: '48px',
		height: '64px',
		margin: '0 6px',
		backgroundColor: '#f8f9fa',
		borderRadius: '8px',
		color: '#252525',
		fontSize: '28px',
		fontWeight: 'bold',
		lineHeight: '64px',
		textAlign: 'center',
		border: '1px solid #e0e0e0',
	},
	expiry: {
		fontSize: '14px',
		color: '#6b7280',
		margin: '16px 0 32px 0',
		textAlign: 'center',
	},
	hr: {
		borderColor: '#e5e7eb',
		margin: '32px 0',
	},
	disclaimer: {
		fontSize: '14px',
		lineHeight: '20px',
		color: '#71717a',
		textAlign: 'center',
		margin: '0',
	},
	footer: {
		padding: '24px',
		backgroundColor: '#f8f9fa',
		textAlign: 'center',
	},
	footerText: {
		fontSize: '12px',
		color: '#9ca3af',
		margin: '4px 0',
	},
};

export default MFACode;
