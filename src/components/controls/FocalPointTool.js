// @wordpress
import { FocalPointPicker } from '@wordpress/components'

const FocalPointTool = props => {
  const {
    media: {
      width,
      height,
      ...media
    },
  } = props

  console.log(props)

  return (
    <FocalPointPicker
      url={media.thumb ? media.thumb.src : media.url}
      value={props.focal}
      onChange={props.onFocal}
      dimensions={{ width, height }} />
  )
}

export { FocalPointTool }
