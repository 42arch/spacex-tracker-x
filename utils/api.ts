import { Core, LaunchInfo, LaunchPad, Payload, Rocket } from "../types"

const baseUrl = 'https://api.spacexdata.com/v4'

export const getLaunchIds = async () => {
	const res = await fetch(`${baseUrl}/launches/query`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
		"options": {
			"select": "id",
			"pagination": false
		}}) 
	})
	const data: LaunchInfo[] = (await res.json()).docs
	const ids = data.map(i => (i.id))
	return ids
}

export const queryOneLaunch = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/launches/query`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
		{
			"query":{
				"id": id
			},
			"options":{
				"select": "id, name, date_utc, upcoming, success, links",
				"limit":1,
				"populate": [
					{
						"path": "payloads",
						"select": {
							"name": 1
						}
					},
					{
						"path": "launchpad",
						"select": {
							"name": 1
						}
					},
					{
						"path": "rocket",
						"select": {
							"name": 1
						}
					}
				]
			}
		})
	})
	const data: LaunchInfo[] = (await res.json()).docs
	return data[0]
}

export const getOneLaunch = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/launches/${id}`)
	const data: LaunchInfo = await res.json()
	return data
}

export const getLaunchpads = async (): Promise<LaunchPad[]> => {
	const res = await fetch(`${baseUrl}/launchpads`)
	const data: LaunchPad[] = await res.json()
	return data
}

export const getOneLaunchpad = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/launchpads/${id}`)
	const data: LaunchPad = await res.json()
	return data
}

export const getRockets = async (): Promise<Rocket[]> => {
	const res = await fetch(`${baseUrl}/rockets`)
	const data: Rocket[] = await res.json()
	return data
}

export const getOneRocket = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/rockets/${id}`)
	const data: Rocket = await res.json()
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