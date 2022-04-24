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

export type LaunchDetailType = {
	id: string
	details: string
	mission_name: string
	launch_success: true
	launch_date_utc: string
	links: {
		flickr_images: string[]
	}
	launch_site: {
		site_name_long: string
		site_id: string
	}
	rocket: {
		rocket_name: string
		rocket_type: string
	}
}
