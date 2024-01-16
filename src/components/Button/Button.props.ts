import { ReactNode } from 'react'

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className: string
  children: ReactNode
  theme:
    | 'orange'
    | 'outline-orange'
    | 'outline-gray'
    | 'outline-action-gray'
    | 'outline-action-orange'
}
