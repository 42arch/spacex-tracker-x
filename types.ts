export type LaunchInfo = {
	id: string
	name: string
	details: string
	date_utc: string
	data_local: string
	window: number
	launchpad: {
		id: string
		name: string
	}
	rocket: {
		id: string
		name: string
	}
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
	payloads: {
		id: string
		name: string
	}[]
	links: LaunchLink
	cores: LaunchCore[]
}

type LaunchCore = {
	core: string
	flight: number
	gridfins: boolean
	legs: boolean
	reused: boolean
	landing_attempt: boolean
	landing_success: boolean
	landing_type: string
	landpad: string
}

export type Core = {
	block: number,
	reuse_count: number,
	rtls_attempts: number,
	rtls_landings: number,
	asds_attempts: number,
	asds_landings: number,
	last_update: string,
	launches: string[],
	serial: string,
	status: string,
	id: string
}

type LaunchLink = {
	patch: {
		small: string | null
		large: string | null
	},
	presskit: string
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
	details: string
	full_name: string
	locality: string
	timezone: string
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

export type Payload = {
	id: string
	name: string
	type: string
	reused: boolean
	launch: string
	customers: string[]
	dragon: Dragon
	norad_ids: string[]
	nationalities: string[]
	manufacturers: string[]
	mass_kg: number | null
	mass_lbs: number | null
	orbit: string
	reference_system: string
	regime: string
	longitude: number | null
	semi_major_axis_km:  number | null,
	eccentricity: number | null,
	periapsis_km: number | null,
	apoapsis_km: number | null,
	inclination_deg: number | null,
	period_min: number | null,
	lifespan_years: number | null,
	epoch: number | null,
	mean_motion: number | null,
	raan: number | null,
	arg_of_pericenter: number | null,
	mean_anomaly: number | null,
}

type Dragon = {
	capsule: null,
	mass_returned_kg: null,
	mass_returned_lbs: null,
	flight_time_sec: null,
	manifest: null,
	water_landing: null,
	land_landing: null
}