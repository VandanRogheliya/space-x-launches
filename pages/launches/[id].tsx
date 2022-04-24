import { gql } from '@apollo/client'
import { GetServerSideProps } from 'next'
import React from 'react'
import client from '../../apollo-client'
import { LaunchDetailType } from '../../lib/types/launch'
import fallback from '../../public/images/fallback.png'

type Props = {
	launch: LaunchDetailType
}

const Launch = ({ launch }: Props) => {
	console.log(launch)
	return (
		<div className="container mx-auto">
			<div className="flex flex-col lg:flex-row p-5 space-y-5 lg:space-y-0 lg:space-x-5">
				<img
					src={launch?.links?.flickr_images?.[0] || fallback.src}
					className="h-60 object-cover lg:w-64"
				/>
				<div className="flex flex-col space-y-2">
					<h1 className="text-xl lg:text-3xl">{launch.mission_name}</h1>
					<p>{new Date(launch.launch_date_utc).toDateString()}</p>
					<p>Success: {launch.launch_success ? 'True' : 'False'}</p>
					<p>Site: {launch.launch_site.site_name_long}</p>
					<p>{launch.details}</p>
					<div className="flex flex-col">
						<h2 className="text-lg lg:text-xl">Rocket</h2>
						<p>Name: {launch?.rocket?.rocket_name}</p>
						<p>Type: {launch?.rocket?.rocket_type}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = params?.id
	let launch = null

	try {
		const { data } = await client.query({
			query: gql`
				query Launch($id: ID!) {
					launch(id: $id) {
						id
						details
						links {
							flickr_images
						}
						launch_site {
							site_name_long
							site_id
						}
						launch_success
						launch_date_utc
						rocket {
							rocket_name
							rocket_type
						}
						mission_name
					}
				}
			`,
			variables: {
				id,
			},
		})
		launch = data?.launch
	} catch (error) {
		console.error(error)
	}

	if (!launch) return { notFound: true }

	return { props: { launch } }
}

export default Launch
