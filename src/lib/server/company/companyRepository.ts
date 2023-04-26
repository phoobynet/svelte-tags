import Fuse from 'fuse.js'
import companies from './companies.json'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Companies {
	fields: string[]
	data: unknown[][]
}

export interface Company {
	cik: number
	name: string
	ticker: string
	exchange: string
}

const fuse = new Fuse<Company>(
	companies.data.map((x) => ({
		cik: x[0] as number,
		name: x[1] as string,
		ticker: x[2] as string,
		exchange: x[3] as string
	})),
	{
		keys: ['name', 'ticker']
	}
)

const search = (query: string, limit = 20): Company[] => {
	if (!query) {
		return []
	}
	return fuse
		.search(query, {
			limit
		})
		.flatMap((x) => x.item)
}

export const companyRepository = {
	search
}
