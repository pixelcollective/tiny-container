// @wordpress
import { __ } from '@wordpress/i18n'
import { Fragment } from '@wordpress/element'
import { PanelBody, RangeControl } from '@wordpress/components'
import { MediaUpload, ColorPalette } from '@wordpress/editor'

// components
import { FocalPointTool } from './FocalPointTool'

const BackgroundPanel = props => (
  <PanelBody title={__('Background', 'tinyblocks')}>
    <MediaUpload
      value={props.media && props.media.url}
      onSelect={props.onMedia}
      render={({open}) => (
        <Fragment>
          <button className="primary button button-primary" onClick={open}>{
            !props.media
              ? __('Upload Image', 'tinyblocks')
              : __('Change Image', 'tinyblocks')
          }</button>
        </Fragment>
      )} />

    {props.media && (
      <Fragment>
        <RangeControl
          label='Background scale'
          value={props.scale}
          onChange={props.onScale}
          min={0}
          max={200} />
        <FocalPointTool {...props} />
      </Fragment>
    )}

    <ColorPalette
      label="Background color"
      value={props.backgroundColor}
      onChange={props.onBackgroundColor} />

  </PanelBody>
)

export { BackgroundPanel }
