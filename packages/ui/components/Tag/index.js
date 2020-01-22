import React from 'react'
import { observer } from 'startupjs'
import Div from '../Div'
import Span from '../Span'
import Icon from '../Icon'
import propTypes from 'prop-types'
import STATUSES from './statuses'
import config from '../../config/rootConfig'
import './index.styl'

function Tag ({
  style,
  status,
  type,
  children,
  icon,
  iconProps,
  rightIcon,
  rightIconProps,
  label,
  onPress,
  ...props
}) {
  const isSingleIcon = icon && !rightIcon && !label && !children

  return pug`
    Div.root(
      style=style
      styleName=[status, type]
      onPress=onPress
    )
      if !!icon
        Div.leftIcon(styleName={single: isSingleIcon})
          Icon(icon=icon ...iconProps)
      if label
        Span.label(bold)= label
      = children
      if !!rightIcon
        Div.rightIcon
          Icon(icon=rightIcon ...iconProps)
  `
}

const iconsPropTypes = {
  height: propTypes.number,
  width: propTypes.number,
  size: propTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
  color: propTypes.string
}

Tag.propTypes = {
  iconProps: propTypes.shape(iconsPropTypes),
  rightIconProps: propTypes.shape(iconsPropTypes),
  label: propTypes.string,
  status: propTypes.oneOf(STATUSES),
  type: propTypes.oneOf(['circle', 'rounded'])
}

const defaultIconProps = {
  size: 'xs',
  color: config.colors.white
}

Tag.defaultProps = {
  status: STATUSES[0],
  type: 'circle',
  iconProps: defaultIconProps,
  rightIconProps: defaultIconProps
}

export default observer(Tag)
