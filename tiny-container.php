<?php
/**
 * Plugin Name: Tiny Container
 * Description: A nice block to put blocks in
 */

namespace TinyPixel\Blocks;

require(__DIR__ .'/vendor/autoload.php');

use \TinyPixel\Blocks\Block;

(new Block([
    'handle' => 'tinyblocks/containerblock',
    'entry' => 'index.js',
    'blade'  => 'render',
]))->run();
