import type { NextPage } from 'next'
import ClientOnly from '../components/client-only'
import LaunchList from '../components/launch-list'

const Home: NextPage = () => {
	return (
		<div className='container mx-auto'>
			<ClientOnly>
				<LaunchList />
			</ClientOnly>
		</div>
	)
}

export default Home
