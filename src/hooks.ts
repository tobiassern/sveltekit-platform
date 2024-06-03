import type { Reroute } from '@sveltejs/kit';
import { PUBLIC_BASE_HOSTNAME } from '$env/static/public';

export const reroute: Reroute = ({ url }) => {
	const subdomain = url.hostname.replace(`.${PUBLIC_BASE_HOSTNAME}`, '');

	if (subdomain === 'app') {
		return '/app' + url.pathname;
	}
	return '/public' + url.pathname;
};
