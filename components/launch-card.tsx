import Image from 'next/image'
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
		<div className="p-5 flex flex-col space-y-1 m-5 rounded shadow hover:shadow-lg max-w-sm">
			<Image
				src={image || fallback}
				width={200}
				height={200}
				alt={missionName}
				objectFit="cover"
			/>
			<p className="text-2xl">Mission: {missionName}</p>
			<p>Date: {date}</p>
			<p>Rocket: {rocketName}</p>
		</div>
	)
}

export default LaunchCard
