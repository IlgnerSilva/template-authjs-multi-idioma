import { Button } from '@/components/shared/button';
import { GitHub, Google } from '@/components/shared/icons';
import env from '@/env/client';
import { loginGithub, loginGoogle } from '../(actions)/login';

type ProviderType = 'google' | 'github';

interface ProviderConfig {
	login: () => Promise<void>; // Função de login
	icon: React.FC; // Componente do ícone
	text: string; // Texto do botão
}

// Mapeia provedores para ações e ícones
const PROVIDERS: Record<ProviderType, ProviderConfig> = {
	google: {
		login: loginGoogle,
		icon: Google,
		text: 'Google',
	},
	github: {
		login: loginGithub,
		icon: GitHub, // Substitua pelo componente de ícone do GitHub
		text: 'GitHub',
	},
};

// Propriedades do componente AuthProviders
interface AuthProvidersProps {
	textOverrides?: Partial<Record<ProviderType, string>>; // Substituições opcionais de texto
}

export function AuthProviders({ textOverrides }: AuthProvidersProps) {
	// Obtém provedores habilitados a partir do ambiente
	const enabledProviders = (process.env.NEXT_PUBLIC_ENABLED_PROVIDERS || '')
		.split(',')
		.filter((provider): provider is ProviderType => provider in PROVIDERS);

	return (
		<div className="w-full flex gap-2 mb-6">
			{enabledProviders.map((provider) => {
				const providerConfig = PROVIDERS[provider];
				const { login, icon: Icon, text } = providerConfig;

				// Substitui texto se houver override
				const buttonText = textOverrides?.[provider] || text;

				return (
					<form
						key={provider}
						className="w-full"
						onSubmit={async (e) => {
							e.preventDefault();
							await login();
						}}
					>
						<Button
							type="submit"
							className="bg-neutral-base-100 ring-2 ring-neutral-base-200"
						>
							<Button.Icon>
								<Icon />
							</Button.Icon>
							<Button.Title className="font-bold text-sm">
								{buttonText}
							</Button.Title>
						</Button>
					</form>
				);
			})}
		</div>
	);
}
