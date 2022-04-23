export type LaunchType = {
	id: string
	mission_name: string
	links: {
		flickr_images: string[]
	}
	rocket: {
		rocket_name: string
	}
	launch_date_utc: string
}
