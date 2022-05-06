export type LaunchInfo = {
	id: string
	name: string
	date_utc: string
	data_local: string
	window: number
	launchpad: string
	rocket: string
	flight_number: number
	success: boolean | null
	failures: string[]
	upcoming: boolean | null
	fairings: {
		reused: boolean
		recovery_attempt: boolean
		recovered: boolean
	}
	ships: string[]
	crew: string[]
	payloads: string[]
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

export type Rocket = {
	id: string
	description: string
	company: string
	name: string
	type: string
	active: boolean
	stages: number
	boosters: number
	cost_per_launch: number
	success_rate_pct: number
	first_flight: string
	wikipedia: string
	country: string
	flickr_images: string[]
	payload_weights: PayloadWeight[]
	height: {
		meters: number
		feet: number
	}
	diameter: {
		meters: number
		feet: number
	}
	mass: {
		kg: number
		lb: number
	}
	landing_legs: {
		number: number
		material: string
	}
	engines: Engine
}

type PayloadWeight = {
	id: string
	name: string
	kg: number
	lb: number
}

type Engine = {
	type: string
	number: string
	version: string
	layout: string
	engine_loss_max: number
	propellant_1: string
	propellant_2: string
	thrust_to_weight: number
	isp: {
		sea_level: number
		vacuum: number
	}
	thrust_sea_level: {
		kN: number
		lbf: number
	}
	thrust_vacuum: {
		kN: number
		lbf: number
	}
}

export type LaunchPad = {
	id: string
	name: string
	status: string
	detail: string
	full_name: string
	locality: string
	region: string
	latitude: number
	longitude: number
	launch_attempts: number
	launch_successes: number
	rockets: string[]
	launches: string[]
	images: {
		large: string[]
	}
}