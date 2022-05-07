import { Core, LaunchInfo, LaunchPad, Payload, Rocket } from "../types"

const baseUrl = 'https://api.spacexdata.com/v4'

export const getOneLaunch = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/launches/${id}`)
	const data: LaunchInfo = await res.json()
	return data
}

export const getOneLaunchpad = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/launchpads/${id}`)
	const data: LaunchPad = await res.json()
	return data
}

export const getOneRocket = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/rockets/${id}`)
	const data: Rocket = await res.json()
	console.log(888, data)
	return data
}

export const getPayloads = async (ids: string[]) => {
	const respList = ids.map(async id => {
		const res = await fetch(`${baseUrl}/payloads/${id}`)
		const data: Payload = await res.json()
		return data
	})
	const dataList = await Promise.all(respList)
	return dataList
}

export const getOneCore = async (id: string | undefined): Promise<Core> => {
	const res = await fetch(`${baseUrl}/cores/${id}`)
	const data: Core = await res.json()
	return data
}