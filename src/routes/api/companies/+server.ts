import type { RequestHandler } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import { companyRepository } from '$lib/server/company/companyRepository'

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q')

	if (!query) {
		throw error(400, 'Missing q (query) parameter')
	}

	const results = companyRepository.search(query, 20)

	return new Response(JSON.stringify(results))
}
