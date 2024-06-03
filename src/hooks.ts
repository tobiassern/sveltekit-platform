import type { Reroute } from '@sveltejs/kit';
import { PUBLIC_BASE_HOSTNAME } from '$env/static/public';

export const reroute: Reroute = ({ url }) => {
	if (url.hostname === `app.${PUBLIC_BASE_HOSTNAME}`) {
		return '/app' + url.pathname;
	}
	return '/public' + url.pathname;
};
