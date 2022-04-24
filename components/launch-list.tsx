import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { LaunchType } from '../lib/types/launch'
import LaunchCard from './launch-card'

const QUERY = gql`
	query GetLaunches($offset: Int, $limit: Int) {
		launchesPast(offset: $offset, limit: $limit) {
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

const PAGE_SIZE = 12

const LaunchList = () => {
	const { data, loading, error, fetchMore } = useQuery<LaunchPastType>(QUERY, {
		variables: {
			offset: 0,
			limit: PAGE_SIZE,
		},
	})

	const [hasNextPage, setHasNextPage] = useState(true)

	const fetchMoreHandler = async () => {
		try {
			const res = await fetchMore({
				variables: { offset: data?.launchesPast.length },
			})
			if (res.data?.launchesPast?.length === 0) setHasNextPage(false)
		} catch (error) {
			setHasNextPage(false)
			console.error(error)
		}
	}

	const launches = data?.launchesPast
	const [infiniteScrollContainerRef] = useInfiniteScroll({
		loading: !!launches && launches?.length > 0 && loading,
		hasNextPage,
		onLoadMore: () => fetchMoreHandler(),
		disabled: !!error,
	})

	if (loading) return <>LOADING</>
	if (error) return <>ERROR</>
	if (launches?.length === 0) return <>NO LAUNCH FOUND</>
	return (
		<>
			<h1 className="text-xl lg:text-3xl p-5">Space X Launches</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 mx-auto">
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
			{hasNextPage && (
				<p ref={infiniteScrollContainerRef}>LOADING INF SCROLL</p>
			)}
		</>
	)
}

export default LaunchList
