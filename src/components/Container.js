// @wordpress
import { Component, Fragment } from '@wordpress/element'
import { InspectorControls } from '@wordpress/editor'

// components
import { BackgroundPanel } from './controls/BackgroundPanel'
import { OverlayPanel } from './controls/OverlayPanel'

// packages
import tw from 'tailwind.macro'

// helpers
const ContainerBlock = tw.div`w-full relative overflow-hidden`

// exports
class Container extends Component {
  backdropStyle() {
    return (
      this.props.backgroundColor && ({
        backgroundColor: this.props.backgroundColor,
      })
    )
  }

  backgroundStyle() {
    return (
      tw`w-100 h-100 mx-auto rounded-t shadow`,
      this.props.media && this.props.media.type == 'image' && ({
        backgroundImage:
          `url(${this.props.media ? this.props.media.url : null})`,

        backgroundPosition: `
          ${this.props.focal ? this.props.focal.x * 100 : 50}%
          ${this.props.focal ? this.props.focal.y * 100 : 50}%`,

        backgroundSize:
          `${this.props.scale ? this.props.scale : 100}%`,
      })
    )
  }

  videoStyle() {
    return (tw`absolute z-10 top-0 left-0 bottom-0 right-0`, {
      position: 'absolute',
      transform: `scale(${this.props.scale ? this.props.scale / 100 : 1})
                  translate(${this.props.focal ? -(this.props.focal.x * 100) + 50 : 0}%,
                            ${this.props.focal ? -(this.props.focal.y * 100) + 50 : 0}%)`,
    })
  }

  overlayStyle() {
    return (tw`relative w-100 h-100 z-20`, {
      position: 'relative',
      width: '100%',
      height: '100%',
      zIndex: '20',
      backgroundColor: this.props.color ? this.props.color : null,
    })
  }

  videoElement() {
    return this.props.media && this.props.media.type == 'video' ? (
      <video
        css={this.videoStyle()}
        autoPlay
        muted
        loop
        src={this.props.media.url} />
    ) : null
  }

  render() {
    return (
      <Fragment>
        <InspectorControls>
          <BackgroundPanel {...this.props} />
          <OverlayPanel {...this.props} />
        </InspectorControls>

        <ContainerBlock>
          <div css={this.backdropStyle()}>
            <div css={this.backgroundStyle()}>

              {this.videoElement()}

              <div css={this.overlayStyle()}>
                <div css={tw`pt-4 px-8`}>
                    {this.props.children}
                </div>
              </div>

            </div>
          </div>
        </ContainerBlock>
      </Fragment>
    )
  }
}

export { Container }
