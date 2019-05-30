// @wordpress
import { Component } from '@wordpress/element'
import { InnerBlocks } from '@wordpress/editor'

// packages
import chroma from 'chroma-js'

// components
import { Container } from './Container'

// helpers
const mixColor = (color, opacity) => {
  return chroma(color).alpha(opacity * 0.01).hex('rgba')
}

// export
class Edit extends Component {
  constructor(props) {
    super(props)

    this.onFocal = this.onFocal.bind(this)
    this.onMedia = this.onMedia.bind(this)
    this.onScale = this.onScale.bind(this)
    this.onColor = this.onColor.bind(this)
    this.onOpacity = this.onOpacity.bind(this)
    this.onBackgroundColor = this.onBackgroundColor.bind(this)
  }

  onMedia(media) {
    this.props.setAttributes({ media: null })
    this.props.setAttributes({ media })
  }

  onScale(scale) {
    this.props.setAttributes({ scale })
  }

  onFocal(focal) {
    this.props.setAttributes({ focal })
  }

  onColor(color) {
    const { opacity } = this.props.attributes
    color = mixColor(color, opacity)

    this.props.setAttributes({
      color,
      opacity,
    })
  }

  onBackgroundColor(backgroundColor) {
    this.props.setAttributes({ backgroundColor })
  }

  onOpacity(opacity) {
    let { color } = this.props.attributes
    color = mixColor(color, opacity)

    this.props.setAttributes({
      color,
      opacity,
    })
  }

  render() {
    return (
      <Container {...this.props.attributes} {...this}>
        <InnerBlocks renderAppender={() => <InnerBlocks.ButtonBlockAppender />} />
      </Container>
    )
  }
}

export { Edit }
