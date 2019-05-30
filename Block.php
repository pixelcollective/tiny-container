<?php

namespace TinyPixel\Blocks;

class Block
{
    public function __construct($block)
    {
        $block = (object) $block;

        $this->name = $block->handle;
        $this->editorScript = $block->entry;
        $this->bladeFile = $block->blade;
        $this->templatePath = __DIR__ .'/blade/'. $block->blade .'.blade.php';

        return $this;
    }

    public function run()
    {
        add_action('after_theme_setup', [$this, 'bootBlade']);

        add_action('init', [$this, 'register']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue']);
    }

    public function bootBlade()
    {
        if (!function_exists('\Roots\view')) {
            $this->blade = new \eftec\bladeone\BladeOne(
                $this::root('blade'),
                $this::cache($this->name),
                Blade::MODE_AUTO,
            );
        }
    }

    public function render($attributes, $content)
    {
        $block = ['block' => $this->with([
            'attr' => $attributes,
            'content' => $content,
        ])];

        return !isset($this->blade) ?
            $this->useRoots($block) :
            $this->useBladeOne($block);
    }

    public function useRoots($block)
    {
        if (file_exists($this->templatePath)) {
            return \Roots\view($this->templatePath, $block);
        }
    }

    public function useBladeOne($block)
    {
        $this->blade->run($this->bladeFile, $block);
    }

    public function with($blockData)
    {
        return $blockData;
    }

    public function register()
    {
        register_block_type($this->name, [
            'editor_script' => $this->editorScript,
            'render_callback' => [$this, 'render'],
        ]);
    }

    public function enqueue()
    {
        wp_enqueue_script(
            $this->name,
            $this::asset($this->editorScript),
            $this->dependencies('block'),
            '',
            null,
            true
        );
    }

    public function dependencies($type)
    {
        return $type=='block'
            ? ['wp-editor', 'wp-element', 'wp-blocks']
            : ['wp-editor', 'wp-element', 'wp-plugins', 'wp-dom-ready', 'wp-edit-post'];
    }

    public static function root($file = '')
    {
        return plugin_dir_url(__FILE__) .'/'. $file;
    }

    public static function asset($file = '')
    {
        return plugin_dir_url(__FILE__) .'dist/'. $file;
    }

    public static function src($file = '')
    {
        return plugin_dir_path(__FILE__) .'src/'. $file;
    }

    public static function cache($blockName)
    {
        return wp_upload_dir("tiny_cache/{$blockName}")['path'];
    }
}
