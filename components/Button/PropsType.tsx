import React from 'react'

export default interface PropsType {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'medium' | 'large' | 'small'
  htmlType?: 'button' | 'submit' | 'reset'
  shape?: 'radius' | 'round' | 'circle'
  block?: boolean
  disabled?: boolean
  loading?: boolean
  outline?: boolean
  bordered?: boolean
  component?: any
  href?: string
  target?: string
  className?: string
  prefix?: string
  icon?: React.ReactNode | string
  onClick?: React.UIEventHandler<HTMLButtonElement>
}
