import type { NextPage } from 'next'
import ClientOnly from '../components/client-only'
import LaunchList from '../components/launch-list'

const Home: NextPage = () => {
	return (
		<ClientOnly>
			<LaunchList />
		</ClientOnly>
	)
}

export default Home
