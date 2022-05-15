import { Core, Crew, LaunchInfo, LaunchPad, Payload, Rocket, Ship } from "../types"

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

export const getPayloadIds = async () => {
	const res = await fetch(`${baseUrl}/payloads/query`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
		"options": {
			"select": "id",
			"pagination": false
		}})
	})
	const data: Payload[] = (await res.json()).docs
	const ids = data.map(i => (i.id))
	return ids
}

export const getOnePayload = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/payloads/${id}`)
	const data: Payload = await res.json()
	return data
}

export const queryOnePayload = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/payloads/query`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
		{
			"query":{
				"_id": id
			},
			"options":{
				"limit":1,
				"populate": [
					{
						"path": "dragon",
						"populate": {
							"path": "capsule",
							"select": {
								"status": 1,
								"serial": 1,
								"reuse_count": 1,
								"water_landings": 1,
								"land_landings": 1,
								"last_update": 1
							},
							"populate": {
								"path": "launches",
								"select": {
										"name": 1
								}
							}
						}
					},
					{
						"path": "launch",
						"select": {
							"name": 1
						}
					}
				]
			}
		})
	})
	const data: Payload[] = (await res.json()).docs
	return data[0]
}


export const queryOneLaunch = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/launches/query`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
		{
			"query":{
				"_id": id
			},
			"options":{
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
					},
					{
						"path": "crew",
						"select": {
							"name": 1
						}
					},
					{
						"path": "ships",
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

export const getNextLaunch = async () => {
	const res = await fetch(`${baseUrl}/launches/next`)
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

export const getAllCrews = async () => {
	const res = await fetch(`${baseUrl}/crew`)
	const data: Crew[] = await res.json()
	return data
}

export const getOneCrew = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/crew/${id}`)
	const data: Crew = await res.json()
	return data
}

export const queryOneCrew = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/crew/query`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
		{
			"query":{
				"_id": id
			},
			"options":{
				"limit":1,
				"populate": [
					{
						"path": "launches",
						"select": {
							"name": 1
						}
					}
				]
			}
		})
	})
	const data: Crew[] = (await res.json()).docs
	return data[0]
}

export const getAllShips = async () => {
	const res = await fetch(`${baseUrl}/ships`)
	const data: Ship[] = await res.json()
	return data
}

export const queryOneShip = async (id: string | undefined) => {
	const res = await fetch(`${baseUrl}/ships/query`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(
		{
			"query":{
				"_id": id
			},
			"options":{
				"limit":1,
				"populate": [
					{
						"path": "launches",
						"select": {
							"name": 1
						}
					}
				]
			}
		})
	})
	const data: Ship[] = (await res.json()).docs
	return data[0]
}