import { useRouter } from 'next/router'
import React from 'react'

const Footer = () => {
	const router = useRouter()
	const handleLocaleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    event.stopPropagation()
		const value = event.currentTarget.value
    router.push(router.route, router.asPath, {
      locale: value,
    })
  }

	return (
		<footer className='h-20 bg-slate-500 w-full text-center'>
			<select onChange={ handleLocaleChange } value={router.locale}>
				<option value="en">us English</option>
				<option value="zh-CN">cn 中文</option>
			</select>
		</footer>
	)
}

export default Footer
