import { UserManager } from 'oidc-client-ts';

const cognitoAuthority = import.meta.env.VITE_COGNITO_AUTHORITY;
const cognitoClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const cognitoRedirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI;
const cognitoLogoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
const cognitoDomainUrl = import.meta.env.VITE_COGNITO_DOMAIN;

const cognitoAuthConfig = {
	authority: cognitoAuthority,
	client_id: cognitoClientId,
	redirect_uri: cognitoRedirectUri,
	response_type: 'code',
	scope: 'email openid phone'
};

// create a UserManager instance
export const userManager = new UserManager({
	...cognitoAuthConfig
});

export async function signOutRedirect() {
	const clientId = cognitoClientId;
	const logoutUri = cognitoLogoutUri;
	const cognitoDomain = cognitoDomainUrl;
	window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
}
