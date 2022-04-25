import type { NextPage } from 'next'
import ClientOnly from '../components/client-only'
import LaunchList from '../components/launch-list'
import Spinner from '../components/spinner'

const Home: NextPage = () => {
	return (
		<div className="container mx-auto">
			<h1 className="text-xl lg:text-3xl p-5">Space X Launches</h1>
			<ClientOnly>
				<LaunchList />
			</ClientOnly>
		</div>
	)
}

export default Home
