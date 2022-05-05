export type LaunchInfo = {
	id: string
	name: string
	date_utc: string
	data_local: string
	rocket: string
	payloads: string[]
	success: boolean | null
	upcoming: boolean | null
	links: LaunchLink
}

type LaunchLink = {
	patch: {
		small: string | null
		large: string | null
	},
	webcast: string
	article: string
	wikipedia: string
	flickr: {
		small: string[]
		original: string[]
	}
}