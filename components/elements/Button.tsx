'use client'

import React, { ReactNode, CSSProperties, FC } from 'react'

type ColorsTypes = 'primary' | 'secondary'
type BtnTypes = 'ghost' | 'fill'

interface IButton {
  color?: ColorsTypes
  type?: BtnTypes
  className?: string
  children: ReactNode | [ReactNode] | string
  style?: CSSProperties
}

const styles = {
  primary: {
    ghost: {
      classNames:
        'text-red-600 border-red-600 hover:text-red-600 hover:border-red-700',
    },
    fill: {
      classNames: 'text-white bg-red-600 border-0 hover:bg-red-700',
    },
  },
  secondary: {
    ghost: {
      classNames:
        'text-primYellow border-primYellow hover:text-primYellowHover hover:border-primYellow',
    },
    fill: {
      classNames: 'text-white bg-primYellow border-0 hover:bg-primYellowHover',
    },
  },
}

const Button: FC<IButton> = (props) => {
  let inStyles = ''
  inStyles =
    styles[props.color || 'primary'][props.type || 'ghost']['classNames']
  return (
    <button
      className={`px-4 py-1 cursor-pointer  transition-all duration-500 text-sm font-medium border-2 ${inStyles} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </button>
  )
}

export default Button
