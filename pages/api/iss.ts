import type { NextApiRequest, NextApiResponse } from 'next'
import { ISSData } from '../../types'

type ErrorData = {
	message: string
}

const ISS_API = 'https://api.wheretheiss.at/v1'
const OPEN_NOTIFY_API = 'http://api.open-notify.org'
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISSData | ErrorData>
) {
	try {
		const [iss, crews] = await Promise.all([
			fetcher(`${ISS_API}/satellites/25544`),
			fetcher(`${OPEN_NOTIFY_API}/astros.json`)
		])

		res.status(200).json({ iss, crews })
	} catch(err) {
		res.status(500).json({ message: 'fail' })
	}
}
