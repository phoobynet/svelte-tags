<script lang="ts">
	import Tags from '$lib/components/Tags.svelte'

	let options = new Map<string, string>()
	let tags: string[] = []

	const placeholder = 'Search for a company'

	const onQuery = async (e: CustomEvent<string>) => {
		if (!e.detail) {
			options = new Map<string, string>()
			return
		}

		const results = await fetch('/api/companies?q=' + e.detail).then((res) => res.json())

		const newOptions = new Map<string, string>()

		results.forEach((result) => {
			newOptions.set(result.ticker, `${result.ticker} ${result.name}`)
		})

		options = newOptions
	}

	const onSelected = (e: CustomEvent<string>) => {
		tags = [...tags, e.detail]
		options = new Map<string, string>()
	}

	const onDeleted = (e: CustomEvent<string>) => {
		tags = tags.filter((tag) => tag !== e.detail)
	}
</script>

<main>
	<header>
		<h1>Tag Example</h1>
	</header>

	<div class="demo">
		<Tags
			{options}
			{tags}
			{placeholder}
			on:query={onQuery}
			on:selected={onSelected}
			on:deleted={onDeleted}
		/>
	</div>
</main>

<style lang="scss">
	main {
		margin: 1rem 2rem;
	}
</style>
