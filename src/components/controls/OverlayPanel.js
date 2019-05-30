// @wordpress
import { __ } from '@wordpress/i18n'
import { PanelBody, RangeControl } from '@wordpress/components'
import { ColorPalette } from '@wordpress/editor'

const OverlayPanel = props => (
  <PanelBody title={__('Overlay', 'tinypixel')}>
    <ColorPalette
      value={props.color}
      onChange={props.onColor} />
    {props.color && (
      <RangeControl
        label='Opacity'
        value={props.opacity}
        onChange={props.onOpacity}
        min={0}
        max={100} />
    )}
  </PanelBody>
)

export { OverlayPanel }
