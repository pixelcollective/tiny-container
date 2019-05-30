// @wordpress
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/editor'

// components
import { Edit as edit } from './components/Edit'

registerBlockType('tinyblocks/containerblock', {
  title: __('Container!', 'tinypixel'),
  category: 'common',
  attributes: {
    media: {
      type: 'object',
    },
    focal: {
      type: 'object',
    },
    color: {
      type: 'string',
    },
    opacity: {
      type: 'number',
      default: 0.8,
    },
    scale: {
      type: 'number',
      default: 120,
    },
    backgroundColor: {
      type: 'string',
    },
    align: {
      type: 'string',
    },
  },
  supports: {
    align: ['full'],
  },
  edit,
  save: () => <InnerBlocks.Content />,
})
