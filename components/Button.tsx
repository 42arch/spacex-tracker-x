import React, { FunctionComponent } from 'react'
import styles from './Button.module.css'

interface IPorps {
	children: any,
	onClick: () => void
}

const Button: FunctionComponent<IPorps> = ({ children, onClick }) => {

	return (
		<a className={ styles.btn }
		 onClick={ () => { onClick() } }
		>
			<div className={ styles.hover }>
			</div>
			<span className={ styles.text }>
				{
					children
				}
			</span>
		</a>
	)
}

export default Button