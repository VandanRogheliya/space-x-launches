import { ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				launchesPast: {
					// Don't cache separate results based on
					// any of this field's arguments.
					keyArgs: false,

					// Concatenate the incoming list items with
					// the existing list items.
					merge(existing = [], incoming) {
						return [...existing, ...incoming]
					},
				},
			},
		},
	},
})

const client = new ApolloClient({
	uri: 'https://api.spacex.land/graphql/',
	cache,
})

export default client
