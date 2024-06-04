// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { tenants_table } from '$lib/schemas';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: import('$lib/server/db').DB;
			lucia: import('lucia').Lucia;
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
			tenant?: typeof tenants_table.$inferSelect;
			isTenantMember?: boolean | null;
		}
		interface PageData {
			tenant?: typeof tenants_table.$inferSelect;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
