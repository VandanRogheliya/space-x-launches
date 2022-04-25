import Link from 'next/link'
import React from 'react'
import fallback from '../public/images/fallback.png'
type Props = {
	id: string
	missionName: string
	image: string
	rocketName: string
	date: string
}

const LaunchCard = ({ date, id, image, missionName, rocketName }: Props) => {
	return (
		<Link href={`/launches/${id}`}>
			<a className="w-full md:w-1/2 lg:w-1/3 p-5 flex flex-col space-y-1 rounded shadow hover:shadow-lg max-w-sm duration-200 border border-gray-300">
				<img
					src={image || fallback.src}
					alt={missionName}
					className="h-48 object-cover"
					loading="lazy"
				/>
				<p className="text-2xl">Mission: {missionName}</p>
				<p>Date: {new Date(date).toDateString()}</p>
				<p>Rocket: {rocketName}</p>
			</a>
		</Link>
	)
}

export default LaunchCard
