import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { LaunchType } from '../lib/types/launch'
import LaunchCard from './launch-card'

const QUERY = gql`
	query GetLaunches {
		launchesPast(limit: 10) {
			id
			mission_name
			links {
				flickr_images
			}
			rocket {
				rocket_name
			}
			launch_date_utc
		}
	}
`

type LaunchPastType = {
	launchesPast: LaunchType[]
}

const LaunchList = () => {
	// TODO: Add types for data and pass it to launch card component
	const { data, loading, error } = useQuery<LaunchPastType>(QUERY)
	if (loading) return <>LOADING</>
	if (error) return <>ERROR</>

	const launches = data?.launchesPast
	if (launches?.length === 0) return <>NO LAUNCH FOUND</>
	return (
		<div>
			{launches?.map(
				({
					launch_date_utc,
					id,
					mission_name,
					rocket: { rocket_name },
					links: { flickr_images },
				}) => (
					<LaunchCard
						key={id}
						id={id}
						date={launch_date_utc}
						image={flickr_images[0]}
						missionName={mission_name}
						rocketName={rocket_name}
					/>
				)
			)}
		</div>
	)
}

export default LaunchList
