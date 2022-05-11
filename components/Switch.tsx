import { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'

interface IPorps {
	checked: boolean
	positiveNode: ReactNode
	nagetiveNode: ReactNode
	onChange: (enabled: boolean) => void
}

const LangSwitch: FunctionComponent<IPorps> = ({ checked, positiveNode, nagetiveNode, onChange }) => {
	return (
		<Switch
			checked={checked}
			onChange={onChange}
			className={`${checked ? 'bg-teal-900' : 'bg-teal-700'}
				relative inline-flex h-[2rem] w-[4rem] shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
		>
			{/* <span className="sr-only">Use setting</span> */}
			<span
				aria-hidden="true"
				className={`${!checked ? ' translate-x-[2.2rem]' : 'translate-x-[0.2rem]'}
					pointer-events-none inline-block translate-y-[0.2rem] h-[1.6rem] w-[1.6rem] transform rounded-full bg-white dark:bg-black shadow-lg transition duration-200 ease-in-out`}
			>
				{
					// enabled ? <MoonIcon /> : <SunIcon/>
					checked ? positiveNode : nagetiveNode
				}
			</span>
		</Switch>
	)
}

export default LangSwitch